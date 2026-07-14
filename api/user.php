<?php
require_once '../config/database.php';
requireLogin();

header('Content-Type: application/json');

$user = getCurrentUser();

if ($user) {
    echo json_encode([
        'success' => true,
        'user' => $user
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'لم يتم العثور على المستخدم'
    ]);
}
?>