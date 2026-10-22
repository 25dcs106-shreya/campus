<?php
declare(strict_types=1);
if (session_status() !== PHP_SESSION_ACTIVE) {
    ini_set('session.use_strict_mode', '1');
    session_set_cookie_params([
        'httponly' => true,
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'samesite' => 'Lax',
    ]);
    session_start();
}
require_once __DIR__ . '/database.php';
function json_response(array $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function request_json(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    return is_array($data) ? $data : [];
}
function require_method(string $method): void {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== $method) json_response(['error' => 'Method not allowed'], 405);
}
function current_user(): ?array {
    if (empty($_SESSION['user'])) return null;
    if (!empty($_SESSION['last_activity']) && time() - (int)$_SESSION['last_activity'] > 1800) {
        $_SESSION = [];
        session_destroy();
        return null;
    }
    $_SESSION['last_activity'] = time();
    return $_SESSION['user'];
}
function require_login(): array {
    $user = current_user();
    if (!$user) json_response(['error' => 'Authentication required'], 401);
    return $user;
}
function require_admin(): array {
    $user = require_login();
    if (($user['role'] ?? 'student') !== 'admin') json_response(['error' => 'Administrator access required'], 403);
    return $user;
}
function require_csrf(): void {
    $data = request_json();
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? ($data['_csrf'] ?? '');
    if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], (string)$token)) {
        json_response(['error' => 'Invalid security token. Refresh and try again.'], 419);
    }
}
function csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf_token'];
}
