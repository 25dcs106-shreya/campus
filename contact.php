<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_method('POST');$data=request_json();require_csrf();
$name=trim((string)($data['name']??''));$email=strtolower(trim((string)($data['email']??'')));$message=trim((string)($data['message']??''));
if(mb_strlen($name)<2||!filter_var($email,FILTER_VALIDATE_EMAIL)||mb_strlen($message)<10||mb_strlen($message)>5000)json_response(['error'=>'Enter a valid name, email and message (10–5000 characters).'],422);
$s=$pdo->prepare('INSERT INTO contact_messages(name,email,message) VALUES(?,?,?)');$s->execute([$name,$email,$message]);json_response(['message'=>'Your message has been received.'],201);
