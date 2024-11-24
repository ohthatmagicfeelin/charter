# How to Setup a New Project

Copy template directory into new project directory
```
rsync -avz  --exclude '**/node_modules' --exclude '**/node_modules/**' --exclude '.DS_Store' --exclude '**/package-lock.json' --exclude '.git' "./templates/payment_template_2024/" "./listen/"
```
<br>

## Update Configs
open project in VS Code, then:
- CMD + SHIFT + F
- search for the following and replace with new app name:
  - payment_template 
  - App Name Here
  - your logo
  - payment_db
  - PORT
  - PG_DATABASE
  - 5010

places to look:
- server/.env
- client/.env
- index.html
- client/public/manifest.json
- deploy/config/deploy-config.sh
- deploy/local/manual-db-backup.sh
- deploy/config/backup-credentials.conf



<br>

# Development 
<br>

### Database setup
---
enter psql:
```
psql -U postgres 
```

create db:
```
CREATE DATABASE charter_db;
ALTER DATABASE charter_db OWNER TO oh;
GRANT ALL PRIVILEGES ON DATABASE charter_db TO oh;
```
<br>

### Dev Env Setup
---
install dependencies in project root:
```
npm run install-all
```

in server, run prisma migrations:
```
cd server
npx prisma migrate dev
```
<br>

### Check that all is working
---
```
npm run dev
```


<br>


# Prod
<br>


### Reverse Proxy Setup
---
open `nginx-config` directory:
```
cd /Users/oh/Library/CloudStorage/OneDrive-Personal/code/webdev/nginx-config
code .
```

add the following to `./nginx-config/.env`:
```
CHARTER_ROOT=/var/www/charter/client/build
CHARTER_PORT=5005
```

add the following to `./nginx-config/sites-available/includes/apps/charter.conf.template`:
```
location /charter {
    alias ${CHARTER_ROOT};
    try_files $uri $uri/ /charter/index.html;

    location ~ ^/charter/(api|other_routes) {
        proxy_pass http://localhost:${CHARTER_PORT}; # Pick new port number
        include /etc/nginx/sites-available/includes/common/proxy_settings.conf;
        include /etc/nginx/sites-available/includes/common/cookie_settings.conf;
        include /etc/nginx/sites-available/includes/common/security_settings.conf;
    }

    location /charter/api/health {
        proxy_pass http://localhost:${CHARTER_PORT}/health;
        include /etc/nginx/sites-available/includes/common/health_check.conf;
    }
}
```

add the following to `./nginx-config/generated-config.sh`:
```
# charter
envsubst '${CHARTER_ROOT} ${CHARTER_PORT}' \
    < sites-available/includes/apps/charter.conf.template \
    > sites-available/includes/apps/charter.conf
```

run the sync script:
```
./sync.sh
```

<br>

### Create Database
---
On the VPS, enter psql:
```
sudo su - postgres
psql
```

Create a db:
```
CREATE DATABASE charter_db;
GRANT ALL PRIVILEGES ON DATABASE charter_db TO oh;
```

### Deploy to VPS
Locally, run:
```
./deploy.sh -bime
```

