
const formulario = document.getElementById("registroForm");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const mensaje = document.getElementById("mensaje");


function mostrarMensaje(texto, tipo) {

    mensaje.textContent = texto;

    if (tipo === "error") {
        mensaje.style.color = "#e74c3c";
    }

    if (tipo === "correcto") {
        mensaje.style.color = "#2ecc71";
    }
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
  title: "Oops...",
  text: "Escribe tu nombre completo",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});

        nombre.focus();
        return;
    }


    

    if (!correoValido(correoUsuario)) {

        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Ingrese su correo electronico valido",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});

        correo.focus();
        return;
    }



    if (contraseña.length < 8) {

       Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "La contraseña debe tener minimo 8 caracteres",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});

        password.focus();
        return;
    }


    
    if (!/[0-9]/.test(contraseña)) {

        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Debe tener al menos un número",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});

        password.focus();
        return;
    }


    
    if (!/[a-zA-Z]/.test(contraseña)) {

        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Debe tener al menos una letra",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});

        password.focus();
        return;
    }


    

    if (contraseña !== confirmar) {

        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Las contraseñas no coinciden",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});

        confirmarPassword.focus();
        return;
    }


    

    const usuario = {
        nombre: nombreUsuario,
        correo: correoUsuario
    };


    
    localStorage.setItem(
        "usuarioElFaro",
        JSON.stringify(usuario)
    );


    Swal.fire({
  icon: "success",
  title: "Great!",
  text: "Cuenta creada correctamente, ¡ Bienvenido al FARO!",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});


    
    setTimeout(function() {

        formulario.reset();

    }, 1000);

});