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

# Remote dump script to be executed on VPS
cat << 'EOF' > /tmp/remote_dump.sh
#!/bin/bash

# Load environment variables
source $1

# Create backup directory
BACKUP_DIR=$2
mkdir -p "$BACKUP_DIR"

# Function to dump a single table
dump_table() {
    local table=$1
    echo "Dumping table: $table"
    PGPASSWORD="$PG_PASSWORD" pg_dump -h "$PG_HOST" -p "${PG_PORT:-5432}" -U "$PG_USER" -d "$PG_DATABASE" \
        --table="$table" --no-owner --no-acl \
        --format=custom -f "$BACKUP_DIR/${table}.dump"
}

# Dump each table
for table in $3; do
    dump_table "$table"
done
EOF

# Make remote script executable
chmod +x /tmp/remote_dump.sh

echo "Starting remote dump process..."

# Copy dump script and env file to remote and execute
ssh $REMOTE_ALIAS "mkdir -p /tmp/$BACKUP_DIR"
scp /tmp/remote_dump.sh "$REMOTE_ENV_FILE" $REMOTE_ALIAS:/tmp/
ssh $REMOTE_ALIAS "bash /tmp/remote_dump.sh /tmp/.env.prod /tmp/$BACKUP_DIR \"$TABLES\""

echo "Copying dumps back to local machine..."
rsync -avz $REMOTE_ALIAS:/tmp/$BACKUP_DIR/ "$LOCAL_BACKUP_DIR/$BACKUP_DIR/"

# Clean up remote files
ssh $REMOTE_ALIAS "rm -rf /tmp/$BACKUP_DIR /tmp/remote_dump.sh /tmp/.env.prod"

# Function to restore a single table
restore_table() {
    local table=$1
    echo "Restoring table: $table"
    
    # Drop existing table in dev
    psql -h "$PG_HOST" -p "${PG_PORT:-5432}" \
        -U "$PG_USER" -d "$PG_DATABASE" \
        -c "DROP TABLE IF EXISTS $table CASCADE;"
    
    # Restore table from dump
    pg_restore -h "$PG_HOST" -p "${PG_PORT:-5432}" \
        -U "$PG_USER" -d "$PG_DATABASE" \
        --no-owner --no-acl \
        "$LOCAL_BACKUP_DIR/$BACKUP_DIR/${table}.dump"
}

echo "Dumps retrieved successfully to $LOCAL_BACKUP_DIR/$BACKUP_DIR"

read -p "Do you want to proceed with restoration to dev database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Starting restoration process..."
    
    for table in $TABLES; do
        restore_table "$table"
    done
    
    echo "Restoration completed successfully!"
else
    echo "Restoration skipped. Dumps are available in $LOCAL_BACKUP_DIR/$BACKUP_DIR"
fi