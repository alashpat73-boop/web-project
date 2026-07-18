# System Architecture

## Overview

The Task Manager application is deployed using a containerized architecture based on Docker Compose. Each service is isolated inside its own container while communicating through a dedicated bridge network.

This architecture improves portability, maintainability, scalability, and security.

---

# Architecture Diagram

```
                        +----------------------+
                        |      Web Browser     |
                        +----------+-----------+
                                   |
                                   |
                          http://localhost:8080
                                   |
                                   ▼
                     +---------------------------+
                     |     Apache + PHP 8.2      |
                     |      Web Container         |
                     +-------------+-------------+
                                   |
                                   |
                         Docker Bridge Network
                                   |
         +-------------------------+-------------------------+
         |                         |                         |
         ▼                         ▼                         ▼
 +----------------+      +----------------+      +------------------+
 |    MySQL 8     |      |   phpMyAdmin   |      |    SonarQube     |
 | Application DB |      | Database GUI   |      | Code Analysis    |
 +----------------+      +----------------+      +---------+--------+
                                                              |
                                                              |
                                                     +--------▼--------+
                                                     | PostgreSQL 16   |
                                                     | Sonar Database  |
                                                     +-----------------+

                    +----------------------------------------+
                    | Security Analysis Tools                |
                    |                                        |
                    | Semgrep (SAST)                         |
                    | OWASP ZAP (DAST)                       |
                    +----------------------------------------+

```

---

# Components

## Web Container

The Web container is responsible for:

- Executing PHP scripts
- Serving HTML pages
- Processing user requests
- Communicating with the MySQL database

Software:

- Apache 2.4
- PHP 8.2

---

## MySQL

Stores all application data including:

- Users
- Tasks
- Authentication information

Persistent storage is achieved using Docker Volumes.

---

## phpMyAdmin

Provides a web interface for managing the MySQL database.

Available at:

```

http://localhost:8081

```

---

## SonarQube

Performs Static Code Quality Analysis.

Features:

- Bugs Detection
- Vulnerability Detection
- Code Smells
- Security Hotspots

Runs independently inside its own Docker container.

---

## PostgreSQL

Used exclusively by SonarQube.

Stores:

- Analysis history
- Users
- Rules
- Quality Profiles
- Dashboards

---

## Semgrep

Static Application Security Testing (SAST).

Used to detect:

- Security vulnerabilities
- Dangerous coding patterns
- OWASP Top 10 issues

Semgrep is executed through Docker and GitHub Actions.

---

## OWASP ZAP

Dynamic Application Security Testing (DAST).

Used to scan the running application for:

- Missing Security Headers
- Information Disclosure
- CSP Misconfiguration
- Clickjacking Protection
- Other runtime vulnerabilities

---

# Docker Network

All containers communicate using a custom bridge network.

Network Name

```

task_manager_network

```

Benefits:

- Isolated communication
- Automatic DNS resolution
- Improved security
- Easier service discovery

---

# Docker Volumes

Persistent volumes are used to prevent data loss.

Volumes include:

- mysql_data
- sonarqube_db
- sonarqube_data
- sonarqube_logs
- sonarqube_extensions

---

# Security Architecture

Security is implemented using multiple layers.

Layer 1

Docker container isolation.

Layer 2

Apache security headers.

Layer 3

Static Application Security Testing (Semgrep).

Layer 4

Code Quality Analysis (SonarQube).

Layer 5

Dynamic Application Security Testing (OWASP ZAP).

---

# Summary

The project adopts a modern containerized architecture where each component performs a dedicated role. Security analysis is integrated throughout the software lifecycle using both static and dynamic analysis tools, resulting in a secure and maintainable development environment.