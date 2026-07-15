FROM php:8.2-apache

# تحديث النظام وتثبيت بعض الأدوات المفيدة
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# تثبيت إضافات PHP
RUN docker-php-ext-install mysqli pdo pdo_mysql

# تفعيل وحدات Apache
RUN a2enmod rewrite headers expires

# نسخ إعدادات Apache
COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf

# تحديد مجلد العمل
WORKDIR /var/www/html