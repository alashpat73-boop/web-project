// إدارة الثيم (الوضع الليلي والنهاري)
class ThemeManager {
    constructor() {
        this.init();
    }
    
    init() {
        // جلب الثيم المحفوظ أو استخدام الافتراضي
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        // ربط زر تغيير الثيم
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        this.updateThemeIcon();
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateThemeIcon();
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }
}

// تشغيل مدير الثيم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});