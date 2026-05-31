<h1>Projet CESIZEN</h1>

<h2>Guide d’installation</h2>

<h3>Prérequis pour l’importation du projet</h3>

● Node.js (version 20.xx recommandée)
● PHP (>= 8.5.3)
● Composer
● XAMPP
● Git

<h3>Récupération du repository</h3>

A partir de cette partie, les commandes données seront à exécuter dans le terminal en
partant du dossier d’installation.
● git clone https://github.com/arnaudvlb/cesizen.git
● cd ./cesizen/

<h3>Installation des dépendances</h3>

A la suite des commandes précédentes:

<h4>Back-end:</h4>

● cd .\cesizen-api\
● composer install
● php bin/console doctrine:database:create
● php bin/console doctrine:database:create --env=test
● php bin/console doctrine:migrations:migrate
● php bin/console doctrine:migrations:migrate --env=test
● php bin/console doctrine:fixtures:load
● php bin/console doctrine:fixtures:load --env=test
● php bin/console lexik:jwt:generate-keypair

<h4>Front-end:</h4>

● cd ..\cesizen-frontweb\
● npm install

<h4>Front-end mobile:</h4>

● cd ..\cesizen-frontmobile\
● npm install
● Aller dans “expo.config.ts” et changer dans API_URL, changer l’ip par la vôtre.

<h3>Lancements des modules</h3>

<h4>Back-end:</h4>

Dans le terminal du dossier cesizen-api:

● symfony serve --allow-all-ip
Puis cliquez sur l’url présenté par le terminal et assurez vous que votre XAMPP est démarré
avec le module Apache et MySQL démarrés.

<h4>Front-end:</h4>

Dans le terminal du dossier cesizen-frontweb:

● npm run dev
Puis cliquez sur l’url présenté par le terminal

<h4>Front-end mobile:</h4>

Dans le terminal du dossier cesizen-frontmobile:

● npx expo start
Installez l’application Expo Go sur votre téléphone et scannez le QR code présenté par le
terminal.


