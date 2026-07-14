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
            $stmt = $pdo->prepare("SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC");
            $stmt->execute([$user_id]);
            $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $notes]);
            
        } elseif ($action === 'get' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM notes WHERE id = ? AND user_id = ?");
            $stmt->execute([$_GET['id'], $user_id]);
            $note = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($note) {
                echo json_encode(['success' => true, 'data' => $note]);
            } else {
                echo json_encode(['success' => false, 'message' => 'الملاحظة غير موجودة']);
            }
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if ($action === 'create') {
            $stmt = $pdo->prepare("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)");
            $stmt->execute([$user_id, $input['title'], $input['content']]);
            echo json_encode(['success' => true, 'message' => 'تم إضافة الملاحظة بنجاح']);
            
        } elseif ($action === 'update' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$input['title'], $input['content'], $_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم تحديث الملاحظة بنجاح']);
        }
        break;
        
    case 'DELETE':
        if ($action === 'delete' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM notes WHERE id = ? AND user_id = ?");
            $stmt->execute([$_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم حذف الملاحظة بنجاح']);
        }
        break;
}
?>