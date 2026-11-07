<?php
$servername = "localhost";  //servidor
$username   = "root";       //Usuario de MySQL
$password   = "";           //contraseña (cámbiala si tu MySQL tiene una)
$dbname     = "el_faro";    //nombre de la base de datos (igual que en SQL/el_faro.sql)

//crear conexion
$conn = new mysqli($servername, $username, $password, $dbname);

//verificar conexion
if ($conn->connect_error) {
    die("conexion fallida: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
