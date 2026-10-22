<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_method('POST');
$data = request_json();
require_csrf();
$name = trim((string)($data['name'] ?? ''));
$email = strtolower(trim((string)($data['email'] ?? '')));
$enrollment = strtoupper(trim((string)($data['enrollment'] ?? '')));
$password = (string)($data['password'] ?? '');
if (mb_strlen($name) < 2 || mb_strlen($name) > 100) json_response(['error'=>'Name must be 2–100 characters.'], 422);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) json_response(['error'=>'Enter a valid email address.'], 422);
if (!preg_match('/^[A-Z0-9-]{4,30}$/', $enrollment)) json_response(['error'=>'Enrollment must be 4–30 letters, numbers or hyphens.'], 422);
if (strlen($password) < 8) json_response(['error'=>'Password must contain at least 8 characters.'], 422);
try {
  $stmt=$pdo->prepare('INSERT INTO students (enrollment,name,email,password_hash,role) VALUES (?,?,?,?,?)');
  $stmt->execute([$enrollment,$name,$email,password_hash($password,PASSWORD_DEFAULT),'student']);
} catch (PDOException $e) {
  if ($e->getCode()==='23000') json_response(['error'=>'Email or enrollment number is already registered.'],409);
  json_response(['error'=>'Could not create account.'],500);
}
json_response(['message'=>'Account created. You can now log in.'],201);
