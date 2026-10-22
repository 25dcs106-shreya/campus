<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_method('POST');
$data=request_json(); require_csrf();
$identifier=strtolower(trim((string)($data['identifier'] ?? '')));
$password=(string)($data['password'] ?? '');
$stmt=$pdo->prepare('SELECT id,enrollment,name,email,password_hash,role FROM students WHERE LOWER(email)=? OR LOWER(enrollment)=? LIMIT 1');
$stmt->execute([$identifier,$identifier]); $row=$stmt->fetch();
if (!$row || !password_verify($password,$row['password_hash'])) json_response(['error'=>'Invalid enrollment/email or password.'],401);
session_regenerate_id(true);
$_SESSION['user']=['id'=>(int)$row['id'],'enrollment'=>$row['enrollment'],'name'=>$row['name'],'email'=>$row['email'],'role'=>$row['role']];
$_SESSION['last_activity']=time();
json_response(['message'=>'Login successful.','user'=>$_SESSION['user'],'csrfToken'=>csrf_token()]);
