function ValidarDatos() {
    
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
    Swal.fire({
        icon: "success",
        title: "¡Excelente!",
        text: "Datos validados correctamente."
    });
}


document.getElementById("btnGuardar").onclick = ValidarDatos;