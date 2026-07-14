<?php
require_once '../config/database.php';
requireLogin();

header('Content-Type: application/json');

$pdo = getConnection();
$user_id = $_SESSION['user_id'];
$action = $_GET['action'] ?? 'list';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if ($action === 'list') {
            $stmt = $pdo->prepare("SELECT * FROM lectures WHERE user_id = ? ORDER BY lecture_date DESC, created_at DESC");
            $stmt->execute([$user_id]);
            $lectures = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $lectures]);
            
        } elseif ($action === 'get' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM lectures WHERE id = ? AND user_id = ?");
            $stmt->execute([$_GET['id'], $user_id]);
            $lecture = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($lecture) {
                echo json_encode(['success' => true, 'data' => $lecture]);
            } else {
                echo json_encode(['success' => false, 'message' => 'المحاضرة غير موجودة']);
            }
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if ($action === 'create') {
            $stmt = $pdo->prepare("INSERT INTO lectures (user_id, title, description, lecture_date) VALUES (?, ?, ?, ?)");
            $stmt->execute([$user_id, $input['title'], $input['description'] ?? null, $input['lecture_date'] ?: null]);
            echo json_encode(['success' => true, 'message' => 'تم إضافة المحاضرة بنجاح']);
            
        } elseif ($action === 'update' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("UPDATE lectures SET title = ?, description = ?, lecture_date = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$input['title'], $input['description'] ?? null, $input['lecture_date'] ?: null, $_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم تحديث المحاضرة بنجاح']);
        }
        break;
        
    case 'DELETE':
        if ($action === 'delete' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM lectures WHERE id = ? AND user_id = ?");
            $stmt->execute([$_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم حذف المحاضرة بنجاح']);
        }
        break;
}
?>