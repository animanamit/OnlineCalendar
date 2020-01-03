<?php

require 'database.php';
ini_set("session.cookie_httponly", 1);
session_start();
header('content-type:application/json');

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$eventid = addslashes($json_obj['eventid']);

$stmt = $mysqli->prepare('DELETE from events WHERE eventid=?');
$stmt->bind_param('i',$eventid);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true
));

exit;

?>