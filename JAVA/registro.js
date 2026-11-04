const formulario = document.getElementById("registroForm");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, tipo) {
    if (!mensaje) return;
    mensaje.textContent = texto;
    mensaje.style.color = (tipo === "error") ? "#e74c3c" : "#2ecc71";
}

function correoValido(email) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreUsuario = nombre.value.trim();
    const correoUsuario = correo.value.trim();
    const contraseña = password.value;
    const confirmar = confirmarPassword.value;

    if (nombreUsuario.length < 3) {
        Swal.fire({
            icon: "error",
            title: "Campo incompleto",
            text: "Escribe tu nombre completo (mínimo 3 caracteres)",
            confirmButtonColor: "#eb9e78"
        });
        nombre.focus();
        return;
    }

    if (!correoValido(correoUsuario)) {
        Swal.fire({
            icon: "error",
            title: "Correo inválido",
            text: "Ingresa un correo electrónico válido",
            confirmButtonColor: "#eb9e78"
        });
        correo.focus();
        return;
    }

    if (contraseña.length < 8) {
        Swal.fire({
            icon: "error",
            title: "Contraseña muy corta",
            text: "La contraseña debe tener mínimo 8 caracteres",
            confirmButtonColor: "#eb9e78"
        });
        password.focus();
        return;
    }

    if (!/[0-9]/.test(contraseña)) {
        Swal.fire({
            icon: "error",
            title: "Contraseña débil",
            text: "La contraseña debe contener al menos un número",
            confirmButtonColor: "#eb9e78"
        });
        password.focus();
        return;
    }

    if (!/[a-zA-Z]/.test(contraseña)) {
        Swal.fire({
            icon: "error",
            title: "Contraseña débil",
            text: "La contraseña debe contener al menos una letra",
            confirmButtonColor: "#eb9e78"
        });
        password.focus();
        return;
    }

    if (contraseña !== confirmar) {
        Swal.fire({
            icon: "error",
            title: "Las contraseñas no coinciden",
            text: "Verifica que ambas contraseñas sean idénticas",
            confirmButtonColor: "#eb9e78"
        });
        confirmarPassword.focus();
        return;
    }

    const usuario = {
        nombre: nombreUsuario,
        correo: correoUsuario
    };

    localStorage.setItem("usuarioElFaro", JSON.stringify(usuario));

    Swal.fire({
        icon: "success",
        title: "¡Bienvenido a El Faro!",
        text: "Tu cuenta ha sido creada exitosamente.",
        confirmButtonColor: "#eb9e78"
    });

    setTimeout(function() {
        formulario.reset();
    }, 1000);
});