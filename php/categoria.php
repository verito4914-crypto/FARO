<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre      = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];

    $sql = "INSERT INTO categorias (nombre, descripcion)
            VALUES ('$nombre', '$descripcion')";

    if ($conn->query($sql) === TRUE) {
        echo "Categoría registrada correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>