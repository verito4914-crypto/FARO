CREATE DATABASE IF NOT EXISTS el_faro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE el_faro;

CREATE TABLE IF NOT EXISTS usuario (
 id_usuario INT AUTO_INCREMENT PRIMARY KEY,
 nombre_completo VARCHAR(100) NOT NULL,
 correo VARCHAR(150) NOT NULL UNIQUE,
 contrasena VARCHAR(255) NOT NULL,
 foto_perfil VARCHAR(255) DEFAULT NULL,
 fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 estado ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categorias (
 id_categoria INT AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL UNIQUE,
 descripcion VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sesion (
 id_sesion INT AUTO_INCREMENT PRIMARY KEY,
 titulo VARCHAR(150) NOT NULL,
 descripcion TEXT,
 fecha DATE NOT NULL,
 hora_inicio TIME NOT NULL,
 hora_fin TIME NOT NULL,
 enlace_videollamada VARCHAR(500),
 visibilidad ENUM('Publica','Privada') NOT NULL DEFAULT 'Publica',
 estado ENUM('Programada','En curso','Finalizada','Cancelada') NOT NULL DEFAULT 'Programada',
 id_categoria INT NOT NULL,
 id_creador INT NOT NULL,
 CONSTRAINT fk_sesion_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
 CONSTRAINT fk_sesion_creador FOREIGN KEY (id_creador) REFERENCES usuario(id_usuario)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS participantes (
 id_participante INT AUTO_INCREMENT PRIMARY KEY,
 id_usuario INT NOT NULL,
 id_sesion INT NOT NULL,
 rol ENUM('Anfitrion','Participante','Moderador') NOT NULL DEFAULT 'Participante',
 hora_entrada DATETIME DEFAULT NULL,
 hora_salida DATETIME DEFAULT NULL,
 estado ENUM('Invitado','Confirmado','Conectado','Desconectado') NOT NULL DEFAULT 'Invitado',
 UNIQUE KEY uq_usuario_sesion (id_usuario,id_sesion),
 CONSTRAINT fk_participante_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
 CONSTRAINT fk_participante_sesion FOREIGN KEY (id_sesion) REFERENCES sesion(id_sesion) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT IGNORE INTO categorias (nombre, descripcion) VALUES
('Amor','Relaciones y bienestar emocional'),
('Familia','Relaciones familiares'),
('Duelo','Acompañamiento ante pérdidas'),
('Academico','Apoyo en temas académicos'),
('Adicciones','Conversaciones sobre adicciones y apoyo');
