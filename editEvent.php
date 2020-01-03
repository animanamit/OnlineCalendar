<?php

require 'database.php';

session_start();

$json_str = file_get_contents('php://input');

$json_obj = json_decode($json_str, true);

$title = addslashes($json_obj['title']);
$date = addslashes($json_obj['date']);
$time = addslashes($json_obj['time']);
$category = addslashes($json_obj['category']);
$eventid = $json_obj['eventid'];

// add token here
// $token = addslashes($json_obj['token']);

// if (!($token == $_SESSION['token'])) {
//     echo json_encode(array(
//         "success" => false,
//         "message" => "wrong token"
//     ));
//     exit;
// }

$stmt = $mysqli->prepare("UPDATE events SET title=?, date=?, time=?, category=?  WHERE eventid=?");

$stmt->bind_param('ssssi', $title, $date, $time, $category, $eventid);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true,
));
exit;


?>