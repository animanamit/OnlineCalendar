<?php

require 'database.php';

header('content-type:application/json');

session_start();

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$userid = $_SESSION['userid'];

// here, let's say the month is March, which will be 2, but in the Database the month March is seen as 3
$month = $json_obj['month'];

$stmt = $mysqli->prepare('select eventid, title, date, time from events where userid=? and month=? ORDER BY date');

$stmt->bind_param('ii', $userid, $month);
$stmt->execute();
$stmt->bind_result($eventid, $title, $date, $time);

$events = array();
$counter = 0;

while ($stmt->fetch()) {
   $event = array(
       "eventid" => $eventid,
       "title" => $title,
       "date" => $date,
       "time" => $time
   );
   array_push($events, $event);
}

$stmt->close();

$final = json_encode(array(
    "success" => true,
    "events" => $events
));

echo $final;
exit;
 

?>

