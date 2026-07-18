# Installation Guide

## Overview

This guide explains how to install, configure, and run the Task Manager application using Docker Compose.

The project is fully containerized and requires only Docker Desktop to run.

---

# System Requirements

Before running the project, ensure the following software is installed.

| Software | Recommended Version |
|----------|---------------------|
| Docker Desktop | Latest |
| Docker Compose | v2+ |
| Git | Latest |
| Web Browser | Chrome / Edge / Firefox |

---

# Clone the Repository

Clone the project from GitHub.

```bash
git clone https://github.com/YOUR_USERNAME/project.git
```

Enter the project directory.

```bash
cd project
```

---

# Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
APP_NAME=Task Manager

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=task_manager

SONAR_DB=sonarqube
SONAR_USER=sonar
SONAR_PASSWORD=sonar

SONAR_TOKEN=
```

---

# Build the Docker Images

Build all required images.

```bash
docker compose up -d --build
```

Docker will automatically create:

- Web Container
- MySQL
- phpMyAdmin

---

# Start Security Services

To start SonarQube and PostgreSQL.

```bash
docker compose \
-f docker-compose.yml \
-f docker-compose.security.yml \
up -d
```

---

# Verify Running Containers

List all running containers.

```bash
docker ps
```

Expected output:

| Container |
|-----------|
| task_manager_web |
| task_manager_mysql |
| task_manager_phpmyadmin |
| task_manager_sonarqube |
| task_manager_sonarqube_postgres |

---

# Access the Application

Application

```
http://localhost:8080
```

phpMyAdmin

```
http://localhost:8081
```

SonarQube

```
http://localhost:9000
```

---

# Run SonarQube Analysis

Execute the Sonar Scanner.

```bash
docker compose \
-f docker-compose.yml \
-f docker-compose.security.yml \
--profile tools run --rm sonar-scanner
```

---

# Run Semgrep

Execute a static security analysis.

```bash
docker compose \
-f docker-compose.yml \
-f docker-compose.security.yml \
--profile tools run --rm semgrep
```

Reports are generated inside the configured reports directory or can be viewed through GitHub Actions if CI is enabled.

---

# Run OWASP ZAP

Execute the baseline security scan.

Windows

```powershell
.\scripts\run-zap.ps1
```

Linux

```bash
chmod +x scripts/run-zap.sh

./scripts/run-zap.sh
```

Generated reports include:

- HTML
- JSON
- XML
- Markdown

Reports are stored in:

```
reports/zap/
```

---

# Stop the Project

Stop all running containers.

```bash
docker compose down
```

---

# Remove Containers

Stop and remove all containers.

```bash
docker compose down --remove-orphans
```

---

# Remove Containers and Volumes

Warning:

This command permanently deletes the databases.

```bash
docker compose down -v
```

---

# Rebuild Images

If Dockerfile or configuration files are modified.

```bash
docker compose up -d --build
```

---

# Useful Docker Commands

View running containers.

```bash
docker ps
```

View all containers.

```bash
docker ps -a
```

View logs.

```bash
docker compose logs
```

View logs of a specific service.

```bash
docker compose logs web
```

Restart a service.

```bash
docker compose restart web
```

Open a shell inside the Web container.

```bash
docker exec -it task_manager_web bash
```

---

# Troubleshooting

## Port Already in Use

If a port is already occupied, stop the conflicting application or change the port mapping in `docker-compose.yml`.

---

## Docker Images Not Updated

Rebuild the images.

```bash
docker compose up -d --build
```

---

## SonarQube Not Starting

Wait 1–2 minutes for initialization.

Check the logs.

```bash
docker logs task_manager_sonarqube
```

---

## Database Connection Failed

Verify:

- MySQL container is running.
- Environment variables are correct.
- Database credentials match the application configuration.

---

# Summary

The project can be fully deployed with a few Docker Compose commands. Security analysis tools such as SonarQube, Semgrep, and OWASP ZAP are integrated into the development workflow to support secure software development and continuous code quality assessment.