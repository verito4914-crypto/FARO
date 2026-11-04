<?php
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_completo = $_POST['nombre_completo'];
    $correo          = $_POST['correo'];
    $contrasena      = $_POST['contrasena'];
    $foto_perfil     = $_POST['foto_perfil'];

    // Encriptar la contraseña antes de guardarla
    $contrasena = password_hash($contrasena, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuario (nombre_completo, correo, contrasena, foto_perfil)
            VALUES ('$nombre_completo', '$correo', '$contrasena', '$foto_perfil')";

    if ($conn->query($sql) === TRUE) {
        echo "Usuario registrado correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>