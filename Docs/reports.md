# Security Reports

## Overview

Security reports were generated using multiple analysis tools.

The generated reports help identify vulnerabilities, code quality issues, and configuration weaknesses.

---

# SonarQube Reports

Generated Information

- Dashboard
- Bugs
- Vulnerabilities
- Code Smells
- Security Hotspots
- Duplications
- Reliability
- Maintainability

Location

```
http://localhost:9000
```

---

# Semgrep Reports

Generated Reports

- Console Output
- SARIF Report
- GitHub Code Scanning

Languages

- PHP
- JavaScript
- HTML
- YAML
- Dockerfile

---

# OWASP ZAP Reports

Generated Formats

- HTML
- Markdown
- JSON
- XML

Report Location

```
reports/zap/
```

---

# Scan Summary

| Tool | Purpose |
|------|---------|
| SonarQube | Code Quality |
| Semgrep | Static Security |
| OWASP ZAP | Runtime Security |

---

# Security Improvements

The reports were used to improve:

- HTTP Security Headers
- Apache Configuration
- CSP
- Clickjacking Protection
- Browser Security
- Server Configuration

---

# Summary

All generated reports are stored inside the project and provide evidence of the security analysis performed during development.