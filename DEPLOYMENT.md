# Guide de Déploiement Izymail (GitHub -> VPS)

Ce guide vous explique comment déployer votre projet **Izymail** sur un serveur Linux (Ubuntu 22.04 recommandé) avec Nginx, PHP 8.2+ et MySQL.

## 1. Préparation du Serveur

Assurez-vous d'avoir installé les dépendances nécessaires :

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx mysql-server php8.2-fpm php8.2-mysql php8.2-curl php8.2-xml php8.2-zip php8.2-mbstring php8.2-gd curl git unzip
```

Installez **Composer** et **Node.js** :

```bash
# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Node.js (via NVM de préférence)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
```

## 2. Clonage et Installation

Clonez votre projet dans `/var/www/` :

```bash
cd /var/www
git clone https://github.com/nelson-siebi/izymail.git
cd izymail
```

### Installation Backend (Laravel)

```bash
composer install --optimize-autoloader --no-dev
cp .env.example .env
php artisan key:generate
```

Éditez le fichier `.env` pour configurer votre base de données et `APP_URL=https://izymail.nelsius.com`.

### Installation Frontend (React)

```bash
npm install
npm run build
```

## 3. Configuration de la Base de Données

Créez la base de données dans MySQL :

```sql
CREATE DATABASE izymail;
CREATE USER 'izy_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON izymail.* TO 'izy_user'@'localhost';
FLUSH PRIVILEGES;
```

Lancez les migrations :

```bash
php artisan migrate --force
php artisan db:seed --class=SettingSeeder --force
```

## 4. Permissions et Nginx

Donnez les permissions au serveur web :

```bash
sudo chown -R www-data:www-data /var/www/izymail
sudo chmod -R 775 /var/www/izymail/storage
sudo chmod -R 775 /var/www/izymail/bootstrap/cache
```

### Fichier de configuration Nginx

Créez `/etc/nginx/sites-available/izymail` :

```nginx
server {
    listen 80;
    server_name izymail.nelsius.com;
    root /var/www/izymail/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Activez le site :

```bash
sudo ln -s /etc/nginx/sites-available/izymail /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 5. SSL (HTTPS)

Utilisez Certbot :

```bash
sudo apt install python3-certbot-nginx
sudo certbot --nginx -d izymail.nelsius.com
```

## 6. Worker pour les Emails (File d'attente)

Pour que les emails continuent de s'envoyer en arrière-plan, utilisez **Supervisor** :

```bash
sudo apt install supervisor
```

Créez `/etc/supervisor/conf.d/izymail-worker.conf` :

```ini
[program:izymail-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/izymail/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/izymail/storage/logs/worker.log
```

Activez le worker :

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start izymail-worker:*
```
