<?php
// إعدادات قاعدة البيانات
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'task_manager');

// إنشاء اتصال قاعدة البيانات
function getConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch(PDOException $e) {
        die("فشل في الاتصال بقاعدة البيانات: " . $e->getMessage());
    }
}

// بدء الجلسة
session_start();

// فحص إذا كان المستخدم مسجل الدخول
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// الحصول على معلومات المستخدم الحالي
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    
    $pdo = getConnection();
    $stmt = $pdo->prepare("SELECT id, username, email FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// حماية الصفحات - توجيه إلى صفحة تسجيل الدخول إذا لم يكن مسجل
function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: index.html');
        exit();
    }
}
?>