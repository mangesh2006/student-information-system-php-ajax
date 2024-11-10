<?php

$username = 'root';
$password = '';
$hostname = 'localhost';
$database = 'student_info';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$conn = mysqli_connect($hostname, $username, $password, $database);

$rollno = $decode['rollno'];
$name = $decode['name'];
$course = $decode['course'];
$semester = $decode['semester'];

$sql = "Update students set rollno = '$rollno', name = '$name', course = '$course', semester = '$semester' where rollno = '$rollno'";
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(array("update" => 'success'));
} else {
    echo json_encode(array("update" => 'error'));
}
