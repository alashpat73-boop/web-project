# Docker Documentation

## Overview

The Task Manager project is fully containerized using Docker and Docker Compose.

Containerization ensures that the application runs consistently across different environments by packaging all dependencies, services, and configurations into isolated containers.

Instead of installing PHP, Apache, MySQL, and other software directly on the host operating system, each component runs independently inside its own container.

---

# Why Docker?

Docker was selected for several reasons.

## Advantages

- Platform-independent deployment
- Consistent development environment
- Easy installation
- Fast deployment
- Container isolation
- Better dependency management
- Simple scalability
- Easy backup and migration

---

# Docker Architecture

```
                    Docker Engine
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼

   Web Container      MySQL Container   phpMyAdmin

        │
        │
        ▼

Docker Bridge Network

        │
        ▼

Security Stack

    SonarQube
    PostgreSQL
    Semgrep
    OWASP ZAP
```

---

# Project Containers

The project consists of multiple isolated containers.

| Container | Purpose |
|-----------|---------|
| task_manager_web | PHP Application |
| task_manager_mysql | Database |
| task_manager_phpmyadmin | Database Management |
| task_manager_sonarqube | Code Quality Analysis |
| task_manager_sonarqube_postgres | SonarQube Database |
| task_manager-semgrep | Static Security Analysis |
| task_manager-zap | Dynamic Security Analysis |

---

# Web Container

Image

```
php:8.2-apache
```

Responsibilities

- Executes PHP scripts
- Serves HTML pages
- Processes HTTP requests
- Connects to MySQL

Enabled Apache Modules

- rewrite
- headers
- expires

Working Directory

```
/var/www/html
```

---

# MySQL Container

Image

```
mysql:8.0
```

Responsibilities

- Stores application data
- Handles SQL queries
- Manages authentication records
- Persists user tasks

Character Set

```
utf8mb4
```

Collation

```
utf8mb4_unicode_ci
```

---

# phpMyAdmin

Image

```
phpmyadmin/phpmyadmin
```

Purpose

Provides a graphical interface for managing the MySQL database.

Accessible via

```
http://localhost:8081
```

---

# SonarQube

Image

```
sonarqube:lts-community
```

Responsibilities

- Static code analysis
- Code quality metrics
- Bug detection
- Security hotspot detection
- Technical debt analysis

Accessible via

```
http://localhost:9000
```

---

# PostgreSQL

Image

```
postgres:16
```

Purpose

Acts as the dedicated database for SonarQube.

Stores

- Projects
- Users
- Dashboards
- Rules
- Analysis history

---

# Semgrep

Image

```
returntocorp/semgrep
```

Purpose

Static Application Security Testing (SAST).

Detects

- SQL Injection
- XSS
- Command Injection
- Weak coding practices
- OWASP Top 10 issues

---

# OWASP ZAP

Image

```
ghcr.io/zaproxy/zaproxy
```

Purpose

Dynamic Application Security Testing (DAST).

Scans the running application for

- Missing HTTP headers
- Information disclosure
- CSP issues
- Clickjacking
- Cookie security
- Cache problems

---

# Docker Compose

Docker Compose manages all project services using YAML configuration files.

Main compose file

```
docker-compose.yml
```

Security compose file

```
docker-compose.security.yml
```

Advantages

- Single command deployment
- Automatic networking
- Persistent storage
- Health checks
- Service dependencies

---

# Docker Volumes

Persistent volumes prevent data loss after containers are removed.

Volumes used

| Volume | Purpose |
|---------|---------|
| mysql_data | MySQL Database |
| sonarqube_db | PostgreSQL Data |
| sonarqube_data | SonarQube Data |
| sonarqube_logs | Sonar Logs |
| sonarqube_extensions | Plugins |

---

# Docker Networks

All services communicate through a dedicated bridge network.

Network

```
task_manager_network
```

Benefits

- Service isolation
- Automatic DNS resolution
- Secure communication
- Easy container discovery

---

# Health Checks

Health checks continuously verify container availability.

Implemented for

- Web
- MySQL
- PostgreSQL
- SonarQube

Benefits

- Automatic monitoring
- Reliable startup order
- Better fault detection

---

# Environment Variables

Sensitive configuration is stored inside the `.env` file.

Examples

- Database credentials
- SonarQube credentials
- Application settings

Advantages

- Improved security
- Easy configuration
- Cleaner Docker Compose files

---

# Docker Best Practices Applied

The project follows several Docker best practices.

✔ Multi-service architecture

✔ Dedicated network

✔ Named volumes

✔ Health checks

✔ Restart policies

✔ Environment variables

✔ Container isolation

✔ Modular compose files

✔ Security tool separation

✔ Lightweight images

---

# Deployment Workflow

```
Git Clone
      │
      ▼

Docker Compose Build

      │
      ▼

Containers Created

      │
      ▼

Application Running

      │
      ▼

Security Analysis

 ├── SonarQube
 ├── Semgrep
 └── OWASP ZAP
```

---

# Summary

Docker provides a consistent, portable, and isolated runtime environment for the Task Manager application.

By separating application services into independent containers, the project becomes easier to maintain, deploy, test, and secure. Additional security containers such as SonarQube, Semgrep, and OWASP ZAP extend the development environment with automated code quality and security analysis while keeping the application architecture clean and modular.