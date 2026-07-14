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
            $stmt = $pdo->prepare("SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC");
            $stmt->execute([$user_id]);
            $todos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // تحويل القيم المنطقية
            foreach ($todos as &$todo) {
                $todo['completed'] = (bool) $todo['completed'];
            }
            
            echo json_encode(['success' => true, 'data' => $todos]);
        } elseif ($action === 'get' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM todos WHERE id = ? AND user_id = ?");
            $stmt->execute([$_GET['id'], $user_id]);
            $todo = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($todo) {
                $todo['completed'] = (bool) $todo['completed'];
                echo json_encode(['success' => true, 'data' => $todo]);
            } else {
                echo json_encode(['success' => false, 'message' => 'المهمة غير موجودة']);
            }
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if ($action === 'create') {
            $stmt = $pdo->prepare("INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)");
            $stmt->execute([$user_id, $input['title'], $input['description'] ?? null]);
            echo json_encode(['success' => true, 'message' => 'تم إضافة المهمة بنجاح']);
            
        } elseif ($action === 'update' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("UPDATE todos SET title = ?, description = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$input['title'], $input['description'] ?? null, $_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم تحديث المهمة بنجاح']);
            
        } elseif ($action === 'toggle' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$input['completed'] ? 1 : 0, $_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم تحديث حالة المهمة']);
        }
        break;
        
    case 'DELETE':
        if ($action === 'delete' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM todos WHERE id = ? AND user_id = ?");
            $stmt->execute([$_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم حذف المهمة بنجاح']);
        }
        break;
}
?>