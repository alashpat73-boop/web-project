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
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC");
            $stmt->execute([$user_id]);
            $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $projects]);
            
        } elseif ($action === 'get' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ? AND user_id = ?");
            $stmt->execute([$_GET['id'], $user_id]);
            $project = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($project) {
                echo json_encode(['success' => true, 'data' => $project]);
            } else {
                echo json_encode(['success' => false, 'message' => 'المشروع غير موجود']);
            }
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if ($action === 'create') {
            $stmt = $pdo->prepare("INSERT INTO projects (user_id, title, description, status) VALUES (?, ?, ?, ?)");
            $stmt->execute([$user_id, $input['title'], $input['description'] ?? null, $input['status'] ?? 'pending']);
            echo json_encode(['success' => true, 'message' => 'تم إضافة المشروع بنجاح']);
            
        } elseif ($action === 'update' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("UPDATE projects SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$input['title'], $input['description'] ?? null, $input['status'], $_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم تحديث المشروع بنجاح']);
        }
        break;
        
    case 'DELETE':
        if ($action === 'delete' && isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ? AND user_id = ?");
            $stmt->execute([$_GET['id'], $user_id]);
            echo json_encode(['success' => true, 'message' => 'تم حذف المشروع بنجاح']);
        }
        break;
}
?>