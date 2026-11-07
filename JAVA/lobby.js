// ===== ELEMENTOS =====
const modal = document.getElementById("modalCrear");
const btnAbrir = document.getElementById("btnAbrirFormulario");
const btnCerrar = document.getElementById("btnCerrarFormulario");
const form = document.getElementById("formCrear");
const inputLink = document.getElementById("link");
const btnGenerar = document.getElementById("btnGenerarLink");
const mensajeError = document.getElementById("mensajeError");
const grid = document.querySelector(".cards-grid");

const CLAVE_STORAGE = "elFaroSalas";
const CLAVE_SESION = "sesionElFaro";

// ===== USUARIO QUE INICIÓ SESIÓN =====
function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_SESION));
    } catch {
        return null;
    }
}

const sesion = obtenerSesion();

// Si nadie ha iniciado sesión, se devuelve al login
if (!sesion || !sesion.nombre) {
    window.location.href = "index.html";
} else {
    document.getElementById("nombreUsuario").textContent = sesion.nombre;
}

// ===== FILTRO POR CATEGORÍAS =====
const enlacesCategoria = document.querySelectorAll(".category-list a[data-categoria]");
const sinResultados = document.getElementById("sinResultados");
let categoriaActual = "Todo";

function aplicarFiltro() {
    let visibles = 0;
    grid.querySelectorAll(".card-link").forEach((tarjeta) => {
        const coincide = categoriaActual === "Todo" || tarjeta.dataset.categoria === categoriaActual;
        tarjeta.hidden = !coincide;
        if (coincide) visibles++;
    });
    sinResultados.hidden = visibles > 0;
}

enlacesCategoria.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
        e.preventDefault();
        categoriaActual = enlace.dataset.categoria;

        // Marcar la categoría activa en el menú
        enlacesCategoria.forEach((a) => a.parentElement.classList.remove("active"));
        enlace.parentElement.classList.add("active");

        aplicarFiltro();
    });
});


function abrirModal() {
    modal.classList.add("activo");
    // Rellena el nombre con el usuario que inició sesión
    if (sesion && sesion.nombre) document.getElementById("nombre").value = sesion.nombre;
}

function cerrarModal() {
    modal.classList.remove("activo");
    form.reset();
    mensajeError.textContent = "";
}

btnAbrir.addEventListener("click", abrirModal);
btnCerrar.addEventListener("click", cerrarModal);

// Cerrar si se hace clic fuera del formulario
modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});

// Cerrar con la tecla Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("activo")) cerrarModal();
});

// ===== GENERAR LINK AUTOMÁTICO =====
// Usa Jitsi Meet: cualquier link https://meet.jit.si/<sala> crea la sala al entrar.
function generarLink() {
    const tema = document.getElementById("tema").value.trim();

    // Convierte el tema en texto apto para URL (sin tildes, espacios ni símbolos)
    const base = (tema || "sala")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "")
        .slice(0, 20);

    // Código aleatorio para que la sala sea única
    const codigo = Math.random().toString(36).substring(2, 8);

    return `https://meet.jit.si/ElFaro-${base}-${codigo}`;
}

btnGenerar.addEventListener("click", () => {
    inputLink.value = generarLink();
});

// ===== FORMATEAR HORA (14:30 -> 2:30 pm) =====
function formatearHora(hora) {
    const [h, m] = hora.split(":").map(Number);
    const sufijo = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${sufijo}`;
}

// ===== CREAR TARJETA =====
function crearTarjeta(sala) {
    const enlace = document.createElement("a");
    enlace.href = sala.link;
    enlace.target = "_blank";
    enlace.rel = "noopener";
    enlace.className = "card-link";
    enlace.dataset.categoria = sala.categoria;

    const card = document.createElement("div");
    card.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const datos = [
        ["Nombre:", sala.nombre],
        ["Hora:", `${formatearHora(sala.horaInicio)} - ${formatearHora(sala.horaFin)}`],
        ["Estado:", sala.estado],
        ["Categoría:", sala.categoria === "Academico" ? "Académico" : sala.categoria],
    ];

    datos.forEach(([etiqueta, valor]) => {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = etiqueta;
        p.appendChild(strong);
        p.append(" " + valor); // textContent evita inyección de HTML
        inner.appendChild(p);
    });

    const tema = document.createElement("span");
    tema.className = "card-theme";
    tema.textContent = "Tema: " + sala.tema;

    card.appendChild(inner);
    card.appendChild(tema);
    enlace.appendChild(card);

    // La nueva sala aparece de primera
    grid.prepend(enlace);
    aplicarFiltro();
}

// ===== GUARDAR EN EL NAVEGADOR (localStorage) =====
function obtenerSalas() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];
    } catch {
        return [];
    }
}

function guardarSala(sala) {
    const salas = obtenerSalas();
    salas.push(sala);
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(salas));
}

// ===== ENVIAR FORMULARIO =====
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const sala = {
        nombre: document.getElementById("nombre").value.trim(),
        tema: document.getElementById("tema").value.trim(),
        categoria: document.getElementById("categoria").value,
        horaInicio: document.getElementById("horaInicio").value,
        horaFin: document.getElementById("horaFin").value,
        estado: document.getElementById("estado").value,
        link: inputLink.value.trim(),
    };

    if (sala.horaFin <= sala.horaInicio) {
        mensajeError.textContent = "La hora de fin debe ser mayor que la hora de inicio.";
        return;
    }

    if (!/^https?:\/\//i.test(sala.link)) {
        mensajeError.textContent = "El link debe empezar por http:// o https://";
        return;
    }

    guardarSala(sala);
    crearTarjeta(sala);
    cerrarModal();
});

// ===== CARGAR SALAS GUARDADAS AL ABRIR LA PÁGINA =====
obtenerSalas().forEach(crearTarjeta);
