<?php

ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

header('content-type: application/json');

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str, true);

// correctly escaping javascript input
$username = addslashes($json_obj['username']);
$password = addslashes($json_obj['password']);

$hashpassword = password_hash($password, PASSWORD_BCRYPT);

$stmt = $mysqli->prepare("insert into users (username, hashpassword) values ( ? , ? )");

$stmt->bind_param('ss', $username, $hashpassword);
$stmt->execute();
$stmt->close();

// now, set up a new statement to get the userid and set it as a session variable
$stmt = $mysqli->prepare("SELECT userid FROM users WHERE username=?");

$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($user_id);
$stmt->fetch();

// need to get USERID from database to set as session variable....


$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 
$_SESSION['userid'] = $user_id;

echo json_encode(array(
    "success" => true

));
exit;

?>