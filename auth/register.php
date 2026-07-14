<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'طريقة طلب غير مسموحة']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username']) || !isset($input['email']) || !isset($input['password']) || !isset($input['confirm_password'])) {
    echo json_encode(['success' => false, 'message' => 'يرجى إدخال جميع البيانات المطلوبة']);
    exit();
}

$username = trim($input['username']);
$email = trim($input['email']);
$password = $input['password'];
$confirm_password = $input['confirm_password'];

// التحقق من صحة البيانات
if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'يرجى إدخال جميع البيانات المطلوبة']);
    exit();
}

if (strlen($username) < 3) {
    echo json_encode(['success' => false, 'message' => 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'البريد الإلكتروني غير صحيح']);
    exit();
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'كلمة المرور يجب أن تكون 6 أحرف على الأقل']);
    exit();
}

if ($password !== $confirm_password) {
    echo json_encode(['success' => false, 'message' => 'كلمة المرور وتأكيد كلمة المرور غير متطابقتان']);
    exit();
}

try {
    $pdo = getConnection();
    
    // فحص إذا كان اسم المستخدم أو البريد الإلكتروني موجود مسبقاً
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'اسم المستخدم أو البريد الإلكتروني موجود مسبقاً']);
        exit();
    }
    
    // تشفير كلمة المرور
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // إدخال المستخدم الجديد
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $hashed_password]);
    
    echo json_encode(['success' => true, 'message' => 'تم إنشاء الحساب بنجاح']);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'حدث خطأ في الخادم']);
}
?>