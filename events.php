<?php
require_once __DIR__ . '/../config/bootstrap.php';
$method=$_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method==='GET') { $q=trim((string)($_GET['q']??''));$s=$pdo->prepare('SELECT id,title,category,event_date,location,description,poster_path,created_at FROM events WHERE title LIKE ? OR category LIKE ? OR location LIKE ? ORDER BY event_date ASC');$like='%'.$q.'%';$s->execute([$like,$like,$like]);json_response(['events'=>$s->fetchAll()]); }
$user=require_admin();
if($method==='POST') {
  require_csrf(); $title=trim((string)($_POST['title']??''));$category=trim((string)($_POST['category']??''));$date=(string)($_POST['event_date']??'');$location=trim((string)($_POST['location']??''));$description=trim((string)($_POST['description']??''));
  if($title===''||$category===''||$location===''||!preg_match('/^\d{4}-\d{2}-\d{2}$/',$date))json_response(['error'=>'Title, category, valid date and location are required.'],422);
  $poster=null;
  if(isset($_FILES['poster'])&&$_FILES['poster']['error']!==UPLOAD_ERR_NO_FILE){$f=$_FILES['poster'];if($f['error']!==UPLOAD_ERR_OK||$f['size']>2*1024*1024)json_response(['error'=>'Poster must be under 2 MB.'],422);$mime=(new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);$allowed=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'];if(!isset($allowed[$mime]))json_response(['error'=>'Poster must be JPG, PNG or WEBP.'],422);$dir=__DIR__.'/../uploads/events';if(!is_dir($dir))mkdir($dir,0755,true);$filename=bin2hex(random_bytes(16)).'.'.$allowed[$mime];if(!move_uploaded_file($f['tmp_name'],$dir.'/'.$filename))json_response(['error'=>'Could not save poster.'],500);$poster='uploads/events/'.$filename;}
  $s=$pdo->prepare('INSERT INTO events(title,category,event_date,location,description,poster_path,created_by) VALUES(?,?,?,?,?,?,?)');$s->execute([$title,$category,$date,$location,$description,$poster,$user['id']]);json_response(['message'=>'Event created.','id'=>(int)$pdo->lastInsertId()],201);
}
$data=request_json();require_csrf();
if($method==='PUT'){$id=(int)($data['id']??0);$s=$pdo->prepare('UPDATE events SET title=?,category=?,event_date=?,location=?,description=? WHERE id=?');$s->execute([trim((string)($data['title']??'')),trim((string)($data['category']??'')),(string)($data['event_date']??''),trim((string)($data['location']??'')),trim((string)($data['description']??'')),$id]);json_response(['message'=>'Event updated.']);}
if($method==='DELETE'){$id=(int)($data['id']??0);$s=$pdo->prepare('DELETE FROM events WHERE id=?');$s->execute([$id]);json_response(['message'=>$s->rowCount()?'Event deleted.':'Event not found.']);}
json_response(['error'=>'Method not allowed'],405);
