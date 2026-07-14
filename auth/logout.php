<?php
require_once '../config/database.php';

// تدمير الجلسة
session_destroy();

// توجيه إلى صفحة تسجيل الدخول
header('Location: ../index.html');
exit();
?>