<?php

$username = 'root';
$password = '';
$hostname = 'localhost';
$database = 'student_info';

header('Content-type: application/json');
$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$conn = mysqli_connect($hostname, $username, $password, $database) or die("Can't Connect");

$rollno = $decode['rollno'];
$name = $decode['name'];
$course = $decode['course'];
$semester = $decode['semester'];

$sql = "Insert into students values('$rollno', '$name', '$course', '$semester')";
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(array("insert" => 'success'));
} else {
    echo json_encode(array("insert" => 'error'));
}
