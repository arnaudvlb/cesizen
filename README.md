# Projet CESIZEN

CESIZEN est une application de bien-être permettant notamment le suivi émotionnel des utilisateurs et la consultation de ressources.

Le projet est composé de trois modules :

* **API** : Symfony / API Platform
* **Front Web** : Next.js / TypeScript
* **Application mobile** : React Native / Expo

## Architecture du projet

```text
cesizen/
├── cesizen-api/          # API Symfony / API Platform
├── cesizen-frontweb/     # Application Web Next.js
├── cesizen-frontmobile/  # Application mobile Expo
├── .github/workflows/    # Pipelines GitHub Actions
├── compose.yaml          # Orchestration Docker
└── .env.docker           # Configuration Docker Compose
```

---

# Installation avec Docker

L'utilisation de Docker est la méthode recommandée pour lancer l'API et le Front Web.

L'application mobile n'est pas intégrée à la stack Docker et doit être lancée séparément avec Expo.

## Prérequis

* Git
* Docker
* Docker Compose

## Récupération du projet

```bash
git clone https://github.com/arnaudvlb/cesizen.git
cd cesizen
```

## Configuration

La stack Docker utilise les fichiers d'environnement suivants :

```text
.env.docker
cesizen-api/.env.docker
cesizen-frontweb/.env.docker
```

Ils contiennent les paramètres nécessaires au fonctionnement de l'environnement Docker local.

Aucun secret de production ne doit être stocké dans ces fichiers.

## Construction et démarrage

Depuis la racine du projet :

```bash
docker compose --env-file .env.docker up -d --build
```

Docker construit et démarre les services suivants :

| Service    | Description                | Port |
| ---------- | -------------------------- | ---: |
| `database` | MySQL 8.4                  | 3306 |
| `api`      | API Symfony / API Platform | 8000 |
| `frontweb` | Application Next.js        | 3000 |

L'état des conteneurs peut être vérifié avec :

```bash
docker compose --env-file .env.docker ps
```

## Initialisation de la base de données

Lors de la première installation, les migrations doivent être exécutées :

```bash
docker compose --env-file .env.docker exec api php bin/console doctrine:migrations:migrate --no-interaction
```

Les fixtures doivent ensuite être chargées :

```bash
docker compose --env-file .env.docker exec api php bin/console doctrine:fixtures:load --no-interaction
```

Les fixtures sont nécessaires à l'initialisation de l'application. Elles permettent notamment de créer les rôles utilisateurs indispensables à la création et à la gestion des comptes.

## Accès aux applications

Front Web :

```text
http://localhost:3000
```

API :

```text
http://localhost:8000
```

## Arrêt de l'application

Pour arrêter les conteneurs :

```bash
docker compose --env-file .env.docker down
```

Pour arrêter les conteneurs et supprimer les volumes :

```bash
docker compose --env-file .env.docker down -v
```

> Attention : l'option `-v` supprime également les données stockées dans le volume de la base de données.

## Consultation des logs

Tous les services :

```bash
docker compose --env-file .env.docker logs
```

API :

```bash
docker compose --env-file .env.docker logs api
```

Front Web :

```bash
docker compose --env-file .env.docker logs frontweb
```

Base de données :

```bash
docker compose --env-file .env.docker logs database
```

---

# Installation manuelle

L'installation manuelle peut être utilisée pour le développement sans Docker.

## Prérequis

* Node.js
* PHP >= 8.5
* Composer
* MySQL
* Symfony CLI
* Git

Une installation locale telle que XAMPP peut être utilisée pour fournir MySQL.

## Back-end

Depuis la racine du projet :

```bash
cd cesizen-api
composer install
```

Créer les bases de données :

```bash
php bin/console doctrine:database:create
php bin/console doctrine:database:create --env=test
```

Exécuter les migrations :

```bash
php bin/console doctrine:migrations:migrate
php bin/console doctrine:migrations:migrate --env=test
```

Charger les données :

```bash
php bin/console doctrine:fixtures:load
php bin/console doctrine:fixtures:load --env=test
```

Générer les clés JWT :

```bash
php bin/console lexik:jwt:generate-keypair
```

Lancer l'API :

```bash
symfony serve --allow-all-ip
```

## Front Web

Depuis la racine du projet :

```bash
cd cesizen-frontweb
npm install
npm run dev
```

Le Front Web est accessible par défaut sur :

```text
http://localhost:3000
```

## Application mobile

Depuis la racine du projet :

```bash
cd cesizen-frontmobile
npm install
npx expo start
```

Configurer l'URL de l'API utilisée par l'application mobile afin qu'elle corresponde à l'adresse IP de la machine hébergeant l'API.

L'application peut ensuite être lancée avec Expo Go en scannant le QR code affiché dans le terminal.

---

# Tests

## Tests API

Depuis `cesizen-api` :

```bash
php bin/phpunit
```

Les tests utilisent l'environnement `test` et une base de données dédiée.

## Build Front Web

Depuis `cesizen-frontweb` :

```bash
npm run build
```

---

# Intégration continue et qualité

Le projet utilise GitHub Actions afin d'automatiser les contrôles réalisés sur le code.

La chaîne mise en place comprend notamment :

* l'installation des dépendances ;
* l'exécution des migrations et fixtures de l'environnement de test ;
* l'exécution des tests PHPUnit ;
* la validation du build Next.js ;
* un smoke test de la stack Docker ;
* l'analyse de la qualité du code avec SonarQube Cloud ;
* le contrôle des dépendances ;
* une analyse de sécurité dynamique avec OWASP ZAP.

Le smoke test Docker vérifie notamment que les images peuvent être construites, que les différents services démarrent correctement et que l'API et le Front Web sont accessibles.

Les branches principales sont protégées afin que les modifications soient intégrées par Pull Request et validées par les contrôles configurés.

---

# Gestion des corrections et évolutions

Le suivi des anomalies et des évolutions du projet est réalisé avec GitHub Issues.

Les tickets peuvent être classifiés selon plusieurs dimensions :

* leur **type** : bug, évolution ou documentation ;
* leur **périmètre** : API, Front Web, Mobile ou DevOps ;
* leur **priorité** : haute, moyenne ou faible.

La chaîne CI est également reliée au système de ticketing. Une anomalie détectée par les workflows surveillés peut générer automatiquement un ticket correctif contenant les informations nécessaires à son analyse.

Les échecs ultérieurs du même workflow sur la même branche sont regroupés dans le même ticket afin d'éviter la création de doublons. Lorsque le workflow concerné repasse au vert sur cette branche, le ticket peut être automatiquement clôturé.

---

# Technologies principales

| Domaine                | Technologies                    |
| ---------------------- | ------------------------------- |
| API                    | Symfony, API Platform, Doctrine |
| Web                    | Next.js, React, TypeScript      |
| Mobile                 | React Native, Expo              |
| Base de données        | MySQL                           |
| Conteneurisation       | Docker, Docker Compose          |
| CI                     | GitHub Actions                  |
| Tests                  | PHPUnit                         |
| Qualité                | SonarQube Cloud                 |
| Sécurité               | OWASP ZAP                       |
| Versioning / Ticketing | GitHub                          |
