#!/bin/bash

# List of tables to dump (space-separated)
TABLES="sensor_data"

LOCAL_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../../../.." && pwd )"

# Local configuration
LOCAL_BACKUP_DIR="$LOCAL_ROOT/db_backups"
DEV_ENV_FILE="$LOCAL_ROOT/server/.env"
REMOTE_ENV_FILE="$LOCAL_ROOT/server/.env.prod"
REMOTE_ALIAS="vps"

# Create a timestamp for the backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="pg_dumps_${TIMESTAMP}"

# Load dev environment variables
if [ -f "$DEV_ENV_FILE" ]; then
    source "$DEV_ENV_FILE"
else
    echo "Dev environment file not found: $DEV_ENV_FILE"
    exit 1
fi

# Create local backup directory
mkdir -p "$LOCAL_BACKUP_DIR/$BACKUP_DIR"

# Function to dump a single table locally
dump_table() {
    local table=$1
    echo "Dumping table: $table"
    PGPASSWORD="$PG_PASSWORD" pg_dump -h "$PG_HOST" -p "${PG_PORT:-5432}" -U "$PG_USER" -d "$PG_DATABASE" \
        --table="$table" --no-owner --no-acl \
        --format=custom -f "$LOCAL_BACKUP_DIR/$BACKUP_DIR/${table}.dump"
}

# Dump each table locally
for table in $TABLES; do
    dump_table "$table"
done

echo "Local dumps created successfully in $LOCAL_BACKUP_DIR/$BACKUP_DIR"

# Add warning message
echo -e "\n\033[1;31m⚠️  WARNING! DANGER! ⚠️\033[0m"
echo -e "\033[1;31mThis script will OVERWRITE DATA in the PRODUCTION DATABASE!\033[0m"
echo -e "\033[1;31mThis action cannot be undone!\033[0m"
echo -e "\033[1;31mMake sure you have a backup of the production database before proceeding.\033[0m\n"

read -p "Type 'I understand' to continue: " confirmation
if [[ "$confirmation" != "I understand" ]]; then
    echo "Aborting operation. No changes were made to production database."
    exit 1
fi

read -p "Are you ABSOLUTELY SURE you want to proceed with restoration to production database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Starting production restoration process..."
    
    # Copy dumps and scripts to remote
    ssh $REMOTE_ALIAS "mkdir -p /tmp/$BACKUP_DIR"
    scp -r "$LOCAL_BACKUP_DIR/$BACKUP_DIR/"* $REMOTE_ALIAS:/tmp/$BACKUP_DIR/
    scp /tmp/remote_restore.sh "$REMOTE_ENV_FILE" $REMOTE_ALIAS:/tmp/
    
    # Execute restore on remote
    ssh $REMOTE_ALIAS "bash /tmp/remote_restore.sh /tmp/.env.prod /tmp/$BACKUP_DIR \"$TABLES\""
    
    # Clean up remote files
    ssh $REMOTE_ALIAS "rm -rf /tmp/$BACKUP_DIR /tmp/remote_restore.sh /tmp/.env.prod"
    
    echo "Production restoration completed successfully!"
else
    echo "Production restoration skipped. Local dumps are available in $LOCAL_BACKUP_DIR/$BACKUP_DIR"
fi
