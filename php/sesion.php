<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo              = $_POST['titulo'];
    $descripcion         = $_POST['descripcion'];
    $fecha               = $_POST['fecha'];
    $hora_inicio         = $_POST['hora_inicio'];
    $hora_fin            = $_POST['hora_fin'];
    $enlace_videollamada = $_POST['enlace_videollamada'];
    $visibilidad         = $_POST['visibilidad'];
    $estado              = $_POST['estado'];
    $id_categoria        = $_POST['id_categoria'];
    $id_creador          = $_POST['id_creador'];

    $sql = "INSERT INTO sesion (titulo, descripcion, fecha, hora_inicio, hora_fin,
                                enlace_videollamada, visibilidad, estado, id_categoria, id_creador)
            VALUES ('$titulo', '$descripcion', '$fecha', '$hora_inicio', '$hora_fin',
                    '$enlace_videollamada', '$visibilidad', '$estado', $id_categoria, $id_creador)";

    if ($conn->query($sql) === TRUE) {
        echo "Sesión registrada correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>