FROM php:8.5-cli AS runner

WORKDIR /app

# Dépendances système + extension MySQL nécessaire à l'application
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    && docker-php-ext-install \
    pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copie séparée des fichiers Composer pour profiter du cache Docker
COPY composer.json composer.lock symfony.lock ./

# Copie du fichier d'environnement pour Docker
COPY .env.docker .env

# Installation des dépendances PHP de production
RUN composer install \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --no-dev \
    --no-scripts \
    --optimize-autoloader

# Installation de Symfony CLI
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash \
    && apt-get update \
    && apt-get install -y symfony-cli \
    && rm -rf /var/lib/apt/lists/*

# Copie du code de l'application
COPY bin ./bin
COPY config ./config
COPY migrations ./migrations
COPY public ./public
COPY src ./src
COPY templates ./templates

# Création des dossiers utilisés par Symfony
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /app

# Environnement d'exécution
ENV HOME=/app
ENV APP_ENV=prod

# Utilisateur non-root
USER www-data

# Port de l'API
EXPOSE 8000

# Vérifie que l'application ET ses dépendances critiques sont opérationnelles
# LiipMonitorBundle renvoie un statut HTTP d'erreur si un check échoue
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl --fail --silent http://localhost:8000/health/http_status_checks > /dev/null || exit 1

# Démarrage de l'API
CMD ["symfony", "server:start", "--allow-http", "--no-tls", "--listen-ip=0.0.0.0"]