<?php

$username = 'root';
$password = '';
$hostname = 'localhost';
$database = 'student_info';
$rollno = $_GET['srollno'];

$conn = mysqli_connect($hostname, $username, $password, $database);

$sql = "Select * from students where concat(name, rollno, course) like '%{$rollno}%'";
$result = mysqli_query($conn, $sql);

$output = [];

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $output[] = $row;
        }
    } else {
        $output['error'] = 'error';
    }
}
echo json_encode($output);
