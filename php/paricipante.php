<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_usuario   = $_POST['id_usuario'];
    $id_sesion    = $_POST['id_sesion'];
    $rol          = $_POST['rol'];
    $hora_entrada = $_POST['hora_entrada'];
    $hora_salida  = $_POST['hora_salida'];
    $estado       = $_POST['estado'];

    $sql = "INSERT INTO participantes (id_usuario, id_sesion, rol, hora_entrada, hora_salida, estado)
            VALUES ('$id_usuario', '$id_sesion', '$rol', '$hora_entrada', '$hora_salida', '$estado')";

    if ($conn->query($sql) === TRUE) {
        echo "Participante registrado correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>