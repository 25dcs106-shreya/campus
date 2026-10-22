<?php
require_once __DIR__ . '/../config/bootstrap.php';
$user=require_admin();
$method=$_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method==='GET') {
  $q=trim((string)($_GET['q'] ?? ''));
  $stmt=$pdo->prepare("SELECT id,enrollment,name,email,branch,semester,role,created_at FROM students WHERE name LIKE ? OR email LIKE ? OR enrollment LIKE ? ORDER BY id DESC");
  $like='%'.$q.'%'; $stmt->execute([$like,$like,$like]);
  json_response(['students'=>$stmt->fetchAll()]);
}
$data=request_json(); require_csrf();
if ($method==='POST') {
  $name=trim((string)($data['name']??'')); $email=strtolower(trim((string)($data['email']??'')));
  $enrollment=strtoupper(trim((string)($data['enrollment']??''))); $branch=trim((string)($data['branch']??''));
  $semester=max(1,min(12,(int)($data['semester']??1)));
  if (mb_strlen($name)<2 || !filter_var($email,FILTER_VALIDATE_EMAIL) || !preg_match('/^[A-Z0-9-]{4,30}$/',$enrollment)) json_response(['error'=>'Please provide valid name, email and enrollment.'],422);
  $password=(string)($data['password']??''); if(strlen($password)<8) json_response(['error'=>'Temporary password must be at least 8 characters.'],422);
  try {$s=$pdo->prepare('INSERT INTO students(enrollment,name,email,password_hash,branch,semester,role) VALUES(?,?,?,?,?,?,?)');$s->execute([$enrollment,$name,$email,password_hash($password,PASSWORD_DEFAULT),$branch,$semester,($data['role']??'student')==='admin'?'admin':'student']);}
  catch(PDOException $e){if($e->getCode()==='23000')json_response(['error'=>'Email or enrollment already exists.'],409);throw $e;}
  json_response(['message'=>'Student created.','id'=>(int)$pdo->lastInsertId()],201);
}
if ($method==='PUT') {
  $id=(int)($data['id']??0); if($id<1)json_response(['error'=>'Valid student id is required.'],422);
  $s=$pdo->prepare('UPDATE students SET name=?,email=?,branch=?,semester=?,role=? WHERE id=?');
  $s->execute([trim((string)($data['name']??'')),strtolower(trim((string)($data['email']??''))),trim((string)($data['branch']??'')),max(1,min(12,(int)($data['semester']??1))),($data['role']??'student')==='admin'?'admin':'student',$id]);
  json_response(['message'=>$s->rowCount()?'Student updated.':'No changes made.']);
}
if ($method==='DELETE') {
  $id=(int)($data['id']??0); if($id<1)json_response(['error'=>'Valid student id is required.'],422);
  if($id===$user['id'])json_response(['error'=>'You cannot delete your own account.'],422);
  $s=$pdo->prepare('DELETE FROM students WHERE id=?');$s->execute([$id]);json_response(['message'=>$s->rowCount()?'Student deleted.':'Student not found.']);
}
json_response(['error'=>'Method not allowed'],405);
