<?php
$servername = "localhost";  //servidor
$username   = "root";       //Usuario de MySQL
$password   = "";           //contaseña
$dbname     = "El Faro";  //nombre de la base de datos

//crear conexion
$conn = new mysqli($servename,$username,$password,$dbname);

//verificar conexion
if ($conn-> connect_error) {
    die("conexion fallida:" . $conn -> connect_error);

}
?>