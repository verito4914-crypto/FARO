<?php
header("Content-Type: application/json; charset=utf-8");
mysqli_report(MYSQLI_REPORT_OFF);
require("conexion.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["ok" => false, "mensaje" => "Método no permitido"]);
    exit;
}

$nombre_completo = trim($_POST['nombre_completo'] ?? '');
$correo          = trim($_POST['correo'] ?? '');
$contrasena      = $_POST['contrasena'] ?? '';
$foto_perfil     = $_POST['foto_perfil'] ?? null;

if ($nombre_completo === '' || $correo === '' || $contrasena === '') {
    echo json_encode(["ok" => false, "mensaje" => "Faltan datos obligatorios"]);
    exit;
}

// Encriptar la contraseña antes de guardarla
$hash = password_hash($contrasena, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO usuario (nombre_completo, correo, contrasena, foto_perfil) VALUES (?, ?, ?, ?)"
);
$stmt->bind_param("ssss", $nombre_completo, $correo, $hash, $foto_perfil);

if ($stmt->execute()) {
    echo json_encode(["ok" => true, "mensaje" => "Usuario registrado correctamente.", "id" => $stmt->insert_id]);
} elseif ($conn->errno == 1062) {
    echo json_encode(["ok" => false, "mensaje" => "Ese correo ya está registrado."]);
} else {
    echo json_encode(["ok" => false, "mensaje" => "Error: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>
