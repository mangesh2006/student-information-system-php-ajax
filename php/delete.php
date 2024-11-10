<?php

$username = 'root';
$password = '';
$hostname = 'localhost';
$database = 'student_info';
$delete = $_GET['del'];

$conn = mysqli_connect($hostname, $username, $password, $database);
$sql = "Delete from students where rollno = '$delete'";
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(array('delete' => 'success'));
} else {
    echo json_encode(array('delete' => 'error'));
}
