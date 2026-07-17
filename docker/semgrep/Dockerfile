# ==========================================
# Semgrep Docker Image
# ==========================================

# استخدام الصورة الرسمية لـ Semgrep
FROM returntocorp/semgrep:latest

# مجلد العمل داخل الحاوية
# سيتم ربط المشروع بهذا المجلد من Docker Compose
WORKDIR /src

# الأمر الافتراضي عند تشغيل الحاوية
ENTRYPOINT ["semgrep"]