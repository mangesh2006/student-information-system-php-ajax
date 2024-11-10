<?php

$username = 'root';
$password = '';
$hostname = 'localhost';
$database = 'student_info';

$conn = mysqli_connect($hostname, $username, $password, $database);

$sql = "Select * from students";
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
mysqli_close($conn);
echo json_encode($output);
