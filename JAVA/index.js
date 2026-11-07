function ValidarDatos(event) {
    // Evita que el formulario se envíe antes de validar
    if (event) event.preventDefault();
    
    var correo = document.getElementById("Correo electronico").value.trim();
    var contrasena = document.getElementById("Contraseña").value;

    
    if (correo === "" || contrasena === "") {
        console.log("Los campos están vacíos");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Los campos no pueden estar vacíos.",
            footer: '<a href="#">¿Por qué tengo problemas?</a>'
        });
        return; 
    }

    
    if (!/\S+@\S+\.\S+/.test(correo)) {
        console.log("El gmail debe tener el arroba");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El correo debe incluir una arroba (@) y un dominio válido.",
            footer: '<a href="#">¿Por qué tengo problemas?</a>'
        });
        return;
    }

    
    if (contrasena.length < 8) {
        console.log("La contraseña es muy corta");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La contraseña debe tener al menos 8 caracteres!",
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
        });
        return;
    }

    
    console.log("Contraseña y correo válidos");

    // Busca el nombre del usuario registrado con ese correo
    var nombre = correo.split("@")[0];
    try {
        var registrado = JSON.parse(localStorage.getItem("usuarioElFaro"));
        if (registrado && registrado.correo && registrado.correo.toLowerCase() === correo.toLowerCase()) {
            nombre = registrado.nombre;
        }
    } catch (e) { }

    // Guarda la sesión para que el lobby sepa quién entró
    localStorage.setItem("sesionElFaro", JSON.stringify({ nombre: nombre, correo: correo }));

    Swal.fire({
        icon: "success",
        title: "¡Bienvenido, " + nombre + "!",
        text: "Datos validados correctamente.",
        timer: 1200,
        showConfirmButton: false
    }).then(function () {
        window.location.href = "lobby.html";
    });
}


document.getElementById("btnGuardar").onclick = ValidarDatos;