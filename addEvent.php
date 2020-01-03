<?php

require 'database.php';

header('content-type:application/json');

session_start();

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$title = addslashes($json_obj['title']);
$date = addslashes($json_obj['date']);
$time = addslashes($json_obj['time']);
$category = addslashes($json_obj['category']);
$userid = $_SESSION['userid'];
$month = $json_obj['month'];
$year = $json_obj['year'];

$stmt = $mysqli->prepare('insert into events (title, date, time, category, userid, month, year) values (?, ?, ?, ?, ?, ?, ?)');
$stmt->bind_param('ssssiii', $title, $date, $time, $category, $userid, $month, $year);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true
));
exit;



?>
