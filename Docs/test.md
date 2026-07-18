# Testing Documentation

## Overview

Testing is an essential part of the software development lifecycle (SDLC). This project combines functional testing, static application security testing (SAST), dynamic application security testing (DAST), and manual validation to improve software quality and security.

---

# Testing Strategy

The testing process consists of four main stages.

```
                Testing Strategy

                      │

      ┌───────────────┼───────────────┐

      ▼               ▼               ▼

 Functional       Static         Dynamic

 Testing          Analysis       Analysis

      │               │               │

      ▼               ▼               ▼

 Manual         SonarQube       OWASP ZAP

 Validation      Semgrep
```

---

# Functional Testing

The application was manually tested to verify that all core features operate correctly.

## Tested Functions

✔ User Registration

✔ User Login

✔ Logout

✔ Create Task

✔ Edit Task

✔ Delete Task

✔ Database Connection

✔ Session Handling

✔ Navigation

---

# Static Application Security Testing (SAST)

Two SAST tools were integrated.

## SonarQube

Purpose

- Code Quality
- Security Hotspots
- Bugs
- Code Smells

Execution

```
docker compose \
-f docker-compose.yml \
-f docker-compose.security.yml \
--profile tools run --rm sonar-scanner
```

---

## Semgrep

Purpose

Detect insecure coding patterns.

Execution

```
docker compose \
-f docker-compose.yml \
-f docker-compose.security.yml \
--profile tools run --rm semgrep
```

---

# Dynamic Application Security Testing (DAST)

OWASP ZAP scans the running application.

Execution

```
.\scripts\run-zap.ps1
```

Generated Reports

- HTML
- JSON
- XML
- Markdown

---

# Manual Testing

The application was manually inspected using modern browsers.

Browsers

- Google Chrome
- Microsoft Edge

The following items were verified.

- Layout
- Navigation
- Forms
- Authentication
- Error Messages
- Database Operations

---

# Security Testing

Security testing focused on identifying common web vulnerabilities.

Items checked

- HTTP Headers
- CSP
- Clickjacking
- MIME Sniffing
- Information Disclosure
- Browser Security
- Server Configuration

---

# Testing Results

| Test | Status |
|------|--------|
| Functional Testing | Passed |
| Docker Deployment | Passed |
| Database Connection | Passed |
| SonarQube Analysis | Passed |
| Semgrep Analysis | Passed |
| OWASP ZAP Scan | Passed |

---

# Summary

Multiple testing methodologies were combined to ensure both functionality and security. Static analysis tools were used during development, while OWASP ZAP validated the security of the running application.