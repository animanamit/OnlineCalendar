<?php

require 'database.php';
//session_start();

header("Content-Type: application/json"); 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username = addslashes($json_obj['username']);
$password = addslashes($json_obj['password']);




$stmt = $mysqli->prepare("SELECT userid, hashpassword FROM users WHERE username=?");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => "failed"
	));
	exit;
}

$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($userid, $dbhashpassword);
$stmt->fetch();
$stmt->close();





if (password_verify($password, $dbhashpassword)) {
		ini_set("session.cookie_httponly", 1);
		session_start(); 
		$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 
		$_SESSION['userid'] = $userid;
		echo json_encode(array(
			"success" => true,
		));
		exit;
} else {
	echo json_encode(array(
		"success" => false,
		"message" => "incorrect username or password"
		
	));
	exit;
}


?>