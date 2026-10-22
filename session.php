<?php
require_once __DIR__ . '/../config/bootstrap.php';
header('Cache-Control: no-store');
$user = current_user();
json_response(['authenticated' => (bool)$user, 'user' => $user, 'csrfToken' => csrf_token()]);
