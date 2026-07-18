# 🚀 Task Manager

> A secure PHP Task Manager application containerized with Docker and integrated with modern security analysis tools including **SonarQube**, **Semgrep**, **OWASP ZAP**, and **GitHub Actions**.

---

## 📖 Overview

Task Manager is a lightweight web application developed using **PHP**, **MySQL**, **HTML**, **CSS**, and **JavaScript**.

The project demonstrates how to build a secure web application using Docker while integrating Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), and Continuous Integration (CI).

---

# ✨ Features

- ✅ User Authentication
- ✅ Task Management
- ✅ Responsive User Interface
- ✅ Dockerized Development Environment
- ✅ MySQL Database
- ✅ phpMyAdmin Integration
- ✅ SonarQube Code Quality Analysis
- ✅ Semgrep Static Security Analysis
- ✅ OWASP ZAP Dynamic Security Testing
- ✅ GitHub Actions CI Workflow

---

# 🏗️ System Architecture

```
                     +--------------------+
                     |    GitHub Actions  |
                     |    (Semgrep CI)    |
                     +----------+---------+
                                |
                                |
+------------------------------------------------------------+
|                      Docker Environment                    |
|                                                            |
|  +-----------+      +-----------+      +---------------+   |
|  | Apache    | ---> | PHP 8.2   | ---> | MySQL 8.0     |   |
|  +-----------+      +-----------+      +---------------+   |
|          |                                    |            |
|          |                                    |            |
|          v                                    v            |
|     phpMyAdmin                          Application DB     |
|                                                            |
|  +-----------------------------------------------+         |
|  | SonarQube + PostgreSQL                        |         |
|  +-----------------------------------------------+         |
|                                                            |
|  +-----------------------------------------------+         |
|  | OWASP ZAP                                     |         |
|  +-----------------------------------------------+         |
|                                                            |
+------------------------------------------------------------+
```

---

# 🛠️ Technologies Used

| Technology | Version |
|------------|---------|
| PHP | 8.2 |
| Apache | 2.4 |
| MySQL | 8.0 |
| Docker | Latest |
| Docker Compose | Latest |
| phpMyAdmin | Latest |
| SonarQube Community | LTS |
| PostgreSQL | 16 |
| Semgrep | Latest |
| OWASP ZAP | Stable |
| GitHub Actions | CI/CD |

---

# 📂 Project Structure

```
project/

├── api/
├── auth/
├── config/
├── css/
├── database/
├── docker/
│   ├── apache/
|            └── vhost.conf
│   ├── php/
│   └── zap/
│
├── docs/
│   ├── images/
│   ├── reports/
│   └── user-guide/
│
├── reports/
│   ├── semgrep/
│   ├── sonarqube/
│   └── zap/
│
├── scripts/
│
├── docker-compose.yml
├── docker-compose.security.yml
├── Dockerfile
├── sonar-project.properties
└── README.md
```
project/
│
├── 📂 api/                       # ملفات الـ API الخلفية (Backend) للتعامل مع البيانات بصيغة JSON
│   ├── lectures.php             # إدارة المحاضرات
│   ├── notes.php                # إدارة الملاحظات
│   ├── projects.php             # إدارة المشاريع
│   ├── todos.php                # إدارة المهام (To-Do List)
│   └── user.php                 # إدارة بيانات المستخدم الحالي
│
├── 📂 auth/                      # نظام المصادقة والتحقق من الهوية (Authentication)
│   ├── login.php                # تسجيل الدخول
│   ├── logout.php               # تسجيل الخروج
│   └── register.php             # إنشاء حساب جديد
│
├── 📂 config/                    # ملفات الإعدادات والاتصال
│   └── database.php             # إعدادات الاتصال بقاعدة بيانات MySQL
│
├── 📂 css/                       # ملفات التنسيق والتصميم
│   └── styles.css               # ملف التنسيق الرئيسي للواجهات
│
├── 📂 database/                  # قاعدة البيانات
│   └── task_manager.sql         # ملف الـ SQL لإنشاء الجداول والبيانات الافتراضية عند تشغيل الحاوية لأول مرة
│
├── 📂 docker/                    # ملفات إعداد بيئات العمل والحاويات (Dockerfiles)
│   ├── 📂 apache/
│   │   └── vhost.conf           # إعدادات خادم Apache الافتراضي
│   ├── 📂 php/
│   │   └── Dockerfile           # ملف بناء حاوية PHP 8.2 مع الإضافات المطلوبة
│   ├── 📂 semgrep/
│   │   └── Dockerfile           # ملف بناء حاوية أداة الفحص الأمني Semgrep
│   └── 📂 sonar-scanner/
│       └── Dockerfile           # ملف بناء حاوية أداة فحص جودة الكود SonarQube Scanner
│
├── 📂 Docs/                      # التوثيق الشامل للمشروع (ملفات Markdown تفصيلية)
│   ├── architecture.md          # بنية النظام وهيكلية الاتصال
│   ├── conclusion.md            # الخاتمة والدروس المستفادة
│   ├── docker.md                # توثيق بيئة Docker وكيفية عملها
│   ├── installation.md          # دليل التثبيت والتشغيل خطوة بخطوة
│   ├── Reports.md               # توثيق التقارير الأمنية المستخرجة
│   ├── Screenshots.md           # لقطات شاشة لواجهات التطبيق والأدوات الأمنية
│   ├── Security.md              # توثيق الإجراءات الأمنية المتبعة وفحوصات OWASP
│   └── Test.md                  # توثيق عمليات الفحص والاختبار
│
├── 📂 js/                        # ملفات الـ JavaScript التفاعلية للواجهة الأمامية
│   ├── auth.js                  # منطق عمليات تسجيل الدخول والتسجيل
│   ├── dashboard.js             # منطق لوحة التحكم وإدارة المهام والملاحظات
│   └── theme.js                 # التحكم في المظهر (الوضع الداكن/الفاتح)
│
├── reports/
│   ├── semgrep/
│   ├── sonarqube/
│   └── zap/
|
├── 📂 scripts/                   # سكربتات PowerShell لأتمتة الفحوصات الأمنية
│   ├── run-all.ps1              # تشغيل جميع الفحوصات الأمنية دفعة واحدة (Semgrep, SonarQube, ZAP)
│   ├── run-semgrep.ps1          # تشغيل فحص Semgrep وتصدير التقارير
│   └── run-zap.ps1              # تشغيل فحص OWASP ZAP وتصدير التقارير
│
├── 📂 security/                  # إعدادات الحماية والأدوات الأمنية
│   └── semgrep/config/
│       └── .semgrep.yml         # قواعد الفحص المخصصة لأداة Semgrep
│
├── 📂 .github/workflows/         # أتمتة العمليات (CI/CD)
│   └── semgrep.yml              # سير عمل GitHub Actions لتشغيل فحص Semgrep تلقائياً عند الـ Push
│
├── 📄 الواجهات الأمامية الرئيسية (Root HTML & JS Files):
│   ├── index.html               # صفحة الهبوط الرئيسية (Landing Page) / تسجيل الدخول
│   ├── register.html            # صفحة إنشاء حساب جديد
│   ├── dashboard.html           # لوحة التحكم الرئيسية للمستخدم لإدارة المهام
│   ├── main.js                  # ملف جافا سكريبت عام
│   ├── counter.js               # ملف جافا سكريبت فرعي
│   └── style.css                # ملف تنسيق إضافي
│
└── 📄 ملفات الإعدادات العامة في جذر المشروع:
    ├── .dockerignore            # الملفات المستثناة من الإرسال إلى بيئة Docker
    ├── .gitignore               # الملفات المستثناة من الرفع إلى مستودع Git (مثل ملف .env والتقارير)
    ├── .env.example             # نموذج لملف متغيرات البيئة (يجب نسخه إلى .env وتعديله)
    ├── docker-compose.yml       # ملف تشغيل الخدمات الأساسية (Web, MySQL, phpMyAdmin)
    ├── docker-compose.security.yml # ملف تشغيل أدوات الأمن (SonarQube, Postgres, Semgrep, ZAP)
    ├── sonar-project.properties # إعدادات مشروع SonarQube لفحص الكود
    ├── zap.yaml                 # إعدادات أداة فحص الثغرات الديناميكية OWASP ZAP
    └── README.md                # ملف الشرح الرئيسي للمشروع

---

# 🚀 Running the Project

Clone the repository

```bash
git clone https://github.com/alashpat73-boop/web-project.git

cd web-project
```

Start Docker

```bash
docker compose up -d --build
```

Open the application

```
http://localhost:8080
```

---

# 🐳 Docker Services

| Service | Port |
|----------|------|
| Web | 8080 |
| MySQL | 3306 |
| phpMyAdmin | 8081 |
| SonarQube | 9000 |
| PostgreSQL | Internal |

---

# 🔐 Security Tools

## SonarQube

Static code quality analysis.

Features

- Code Smells
- Bugs
- Security Hotspots
- Maintainability
- Reliability

Run Scanner

```powershell
.\scripts\run-sonar-scanner.ps1
```

---

## Semgrep

Static Application Security Testing (SAST).

Run

```powershell
.\scripts\run-semgrep.ps1
```

GitHub Actions automatically executes Semgrep on every push to the `main` branch.

---

## OWASP ZAP

Dynamic Application Security Testing (DAST).

Run

```powershell
.\scripts\run-zap.ps1
```

Generated Reports

- HTML
- JSON
- XML
- Markdown

---

# 📊 Security Results

## SonarQube

✔ Static Code Analysis

- Code Smells
- Bugs
- Security Hotspots

---

## Semgrep

✔ Static Security Analysis

- Security Rules
- Best Practices
- OWASP Checks

---

## OWASP ZAP

Latest Scan Summary

| Severity | Count |
|----------|------:|
| High | 0 |
| Medium | 3 |
| Low | 2 |
| Informational | 3 |

Major Improvements

- Security Headers
- CSP
- X-Frame-Options
- X-Content-Type-Options
- Permissions Policy

---

# ⚙️ GitHub Actions

The project automatically runs:

- Semgrep SAST Scan

on every

- Push
- Pull Request

Results are uploaded to GitHub Code Scanning.

---

# 📸 Screenshots

## Application

```
docs/images/application.png
```

---

## Docker Desktop

```
docs/images/docker-dashboard.png
```

---

## SonarQube

```
docs/images/sonarqube-dashboard.png
```

---

## SonarQube Issues

```
docs/images/sonarqube-issues.png
```

---

## OWASP ZAP Report

```
docs/images/zap-report.png
```

---

## GitHub Actions

```
docs/images/github-actions.png
```

---

# 📈 Future Improvements

- HTTPS Support
- JWT Authentication
- Role-Based Access Control (RBAC)
- Unit Testing
- Integration Testing
- Automatic Deployment
- Kubernetes Support
- Dependency Scanning

---

# 👨‍💻 Author

**Mohamed Alashpat**

Cybersecurity Student

---

# 📄 License

This project is intended for educational purposes.