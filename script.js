/* =====================================================
   VARIABLES GENERALES
===================================================== */

let pantallaActual = 1;


/* =====================================================
   CAMBIAR DE VENTANA
===================================================== */

function siguiente(numero) {

    document
        .querySelectorAll(".pantalla")
        .forEach(pantalla => {
            pantalla.classList.remove("activa");
        });

    const siguientePantalla =
        document.getElementById("pantalla" + numero);

    if (siguientePantalla) {

        siguientePantalla.classList.add("activa");

        pantallaActual = numero;

        window.scrollTo(0, 0);
    }
}


/* =====================================================
   MÚSICA
===================================================== */

const musica =
    document.getElementById("musica");

const btnMusica =
    document.getElementById("btnMusica");

let reproduciendo = false;

btnMusica.addEventListener("click", () => {

    if (!reproduciendo) {

        musica.play()
            .then(() => {

                reproduciendo = true;

                btnMusica.innerHTML = "🔊";

            })
            .catch(() => {

                alert(
                    "No se pudo reproducir la música. " +
                    "Verifica que musica.mp3 esté dentro de la carpeta."
                );

            });

    } else {

        musica.pause();

        reproduciendo = false;

        btnMusica.innerHTML = "🎵";

    }

});


/* =====================================================
   PÉTALOS
===================================================== */

const contenedorPetalos =
    document.getElementById("petalos");

function crearPetalo() {

    const petalo =
        document.createElement("div");

    petalo.className =
        "petalo";

    const elementos = [
        "🌹",
        "💜",
        "🌸"
    ];

    petalo.innerText =
        elementos[
            Math.floor(
                Math.random() *
                elementos.length
            )
        ];

    petalo.style.left =
        Math.random() * 100 + "%";

    petalo.style.fontSize =
        Math.random() * 15 + 14 + "px";

    const duracion =
        Math.random() * 5 + 5;

    petalo.style.animationDuration =
        duracion + "s";

    contenedorPetalos.appendChild(petalo);

    setTimeout(() => {

        petalo.remove();

    }, duracion * 1000);

}

setInterval(crearPetalo, 700);


/* =====================================================
   02 - ROSAS
===================================================== */

const frasesRosas = [

    "Eres una de las cosas más bonitas que me ha pasado. 💜",

    "Mi amorcita, gracias por existir. 🌹",

    "Si pudiera regalarte una rosa por cada vez que pienso en ti, tendría un jardín infinito.",

    "Me encanta poder llamarte mi reina. 👑💜",

    "Nunca olvides lo especial que eres para mí.",

    "Te elegiría una y otra vez, Anghelita. ❤️"

];

let rosasTocadas = [];

function tocarRosa(numero) {

    if (!rosasTocadas.includes(numero)) {

        rosasTocadas.push(numero);

    }

    const frase =
        document.getElementById("fraseRosa");

    frase.innerText =
        frasesRosas[numero];

    const rosas =
        document.querySelectorAll(".rosa3d");

    rosas[numero].classList.remove("tocada");

    void rosas[numero].offsetWidth;

    rosas[numero].classList.add("tocada");


    if (rosasTocadas.length === 6) {

        document.getElementById("siguiente2")
            .style.display = "block";

    }

}


/* =====================================================
   03 - FRASES
===================================================== */

const frases = [

    "Mi lugar favorito siempre será donde estés tú. 💜",

    "No necesito un día especial para decirte que te amo.",

    "Anghelita, eres una persona demasiado importante para mí. 🌹",

    "Gracias por cada sonrisa que has provocado en mí.",

    "Si pudiera escoger nuevamente, volvería a escogerte a ti.",

    "Mi amorcita, espero poder seguir creando recuerdos contigo.",

    "Eres mi reina y siempre tendrás un lugar especial en mi corazón. 👑",

    "Quizá esto sea solamente una página, pero todo lo que dice viene de mi corazón.",

    "Te quiero muchísimo más de lo que algunas veces sé explicar.",

    "Anghelita + Franz ❤️"

];

let frasesUsadas = [];

function nuevaFrase() {

    if (frasesUsadas.length >= frases.length) {

        return;

    }

    let numero;

    do {

        numero =
            Math.floor(
                Math.random() *
                frases.length
            );

    } while (
        frasesUsadas.includes(numero)
    );

    frasesUsadas.push(numero);

    const caja =
        document.getElementById("mensajeFrase");

    caja.innerText =
        frases[numero];

    document.getElementById(
        "frasesEncontradas"
    ).innerText =
        frasesUsadas.length;


    if (frasesUsadas.length === frases.length) {

        document.getElementById("siguiente3")
            .style.display = "block";

        caja.innerHTML +=
            "<br><br>💜 Descubriste todos mis mensajes.";

    }

}


/* =====================================================
   04 - ATRAPA ROSAS
===================================================== */

let puntos = 0;
let juegoActivo = false;

let inicioTiempo = 0;
let intervaloTiempo = null;

const CLAVE_SECRETA =
    "Amorcito";


function iniciarJuego() {

    puntos = 0;

    juegoActivo = true;

    inicioTiempo =
        performance.now();

    document.getElementById("puntos")
        .innerText = "0";

    document.getElementById("premioJuego")
        .innerText = "";

    document.getElementById("passwordJuego")
        .style.display = "none";

    document.getElementById("siguiente4")
        .style.display = "none";

    document.getElementById("btnJuego")
        .style.display = "none";


    intervaloTiempo =
        setInterval(() => {

            if (!juegoActivo) return;

            const tiempo =
                (
                    performance.now()
                    - inicioTiempo
                ) / 1000;

            document.getElementById("tiempo")
                .innerText =
                tiempo.toFixed(1);

        }, 50);


    crearRosaRapida();
}


function crearRosaRapida() {

    if (!juegoActivo) return;

    const zona =
        document.getElementById("zonaJuego");

    zona.innerHTML = "";

    const rosa =
        document.createElement("button");

    rosa.className =
        "rosa-juego";

    rosa.innerText =
        "🌹";


    const maxX =
        zona.clientWidth - 60;

    const maxY =
        zona.clientHeight - 60;


    rosa.style.left =
        Math.random() * maxX + "px";

    rosa.style.top =
        Math.random() * maxY + "px";


    rosa.onclick = () => {

        puntos++;

        document.getElementById("puntos")
            .innerText = puntos;


        if (puntos >= 10) {

            terminarJuego();

            return;

        }

        crearRosaRapida();

    };


    zona.appendChild(rosa);

}


function terminarJuego() {

    juegoActivo = false;

    clearInterval(intervaloTiempo);

    const tiempo =
        (
            performance.now()
            - inicioTiempo
        ) / 1000;


    document.getElementById("zonaJuego")
        .innerHTML = "";


    document.getElementById("premioJuego")
        .innerHTML =
        "🌹 ¡Lo lograste, amorcita!<br>" +
        "Tardaste <strong>" +
        tiempo.toFixed(2) +
        " segundos</strong>.";


    document.getElementById("claveGenerada")
        .innerText =
        CLAVE_SECRETA;


    document.getElementById("passwordJuego")
        .style.display =
        "block";


    document.getElementById("siguiente4")
        .style.display =
        "block";


    document.getElementById("btnJuego")
        .style.display =
        "inline-block";

}


/* =====================================================
   05 - GUSANITO: MÁXIMO 3 INTENTOS
===================================================== */

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const tamaño = 20;
const cantidad = 17;

canvas.width = cantidad * tamaño;
canvas.height = cantidad * tamaño;

let snake = [];
let comida = {};

let direccion = { x: 1, y: 0 };
let siguienteDireccion = { x: 1, y: 0 };

let snakeActivo = false;
let snakeIntervalo = null;
let rosasComidas = 0;

const MAX_INTENTOS_SNAKE = 3;
const VELOCIDAD_SNAKE = 180;

let intentosSnake = 0;
let snakeComenzado = false;


/* =====================================================
   BOTÓN ME RINDO
===================================================== */

function prepararBotonRendirse() {
    let boton = document.getElementById("btnRendirse");

    if (!boton) {
        boton = document.createElement("button");
        boton.id = "btnRendirse";
        boton.className = "boton siguiente";
        boton.textContent = "😭 Me rindo";
        boton.style.display = "none";
        boton.onclick = rendirseSnake;

        const btnSnake = document.getElementById("btnSnake");

        if (btnSnake && btnSnake.parentNode) {
            btnSnake.parentNode.insertBefore(
                boton,
                btnSnake.nextSibling
            );
        }
    }

    return boton;
}


/* =====================================================
   DIBUJAR EL GUSANITO
===================================================== */

function dibujarSnake() {
    ctx.fillStyle = "#08020f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cuadrícula
    ctx.strokeStyle = "rgba(180, 80, 220, 0.08)";

    for (let x = 0; x < canvas.width; x += tamaño) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += tamaño) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Rosa
    if (comida && Number.isFinite(comida.x)) {
        ctx.font = "20px Arial";
        ctx.fillText(
            "🌹",
            comida.x * tamaño,
            comida.y * tamaño + 19
        );
    }

    // Cuerpo del gusanito
    snake.forEach((parte, indice) => {
        ctx.fillStyle = indice === 0 ? "#e7a1ff" : "#9c3dcc";

        ctx.beginPath();
        ctx.roundRect(
            parte.x * tamaño + 1,
            parte.y * tamaño + 1,
            tamaño - 2,
            tamaño - 2,
            5
        );
        ctx.fill();
    });
}


/* =====================================================
   CREAR ROSA
===================================================== */

function crearComida() {
    let posicionValida = false;

    while (!posicionValida) {
        comida = {
            x: Math.floor(Math.random() * cantidad),
            y: Math.floor(Math.random() * cantidad)
        };

        posicionValida = !snake.some(parte =>
            parte.x === comida.x &&
            parte.y === comida.y
        );
    }
}


/* =====================================================
   INICIAR O REINTENTAR
===================================================== */

function iniciarSnake() {
    if (intentosSnake >= MAX_INTENTOS_SNAKE) {
        return;
    }

    clearInterval(snakeIntervalo);

    if (!snakeComenzado) {
        intentosSnake = 0;
        snakeComenzado = true;
    }

    snake = [
        { x: 8, y: 8 },
        { x: 7, y: 8 },
        { x: 6, y: 8 }
    ];

    direccion = { x: 1, y: 0 };
    siguienteDireccion = { x: 1, y: 0 };

    rosasComidas = 0;

    document.getElementById("rosasSnake").textContent = "0";

    document.getElementById("mensajeSnake").innerHTML =
        "🌹 ¡Come las rosas, amorcita!" +
        "<br><br>Intento " +
        (intentosSnake + 1) +
        " de " +
        MAX_INTENTOS_SNAKE;

    document.getElementById("siguiente5").style.display = "none";

    const btnSnake = document.getElementById("btnSnake");

    if (btnSnake) {
        btnSnake.style.display = "inline-block";
        btnSnake.textContent = "🐍 Jugando...";
        btnSnake.disabled = true;
    }

    const btnRendirse = prepararBotonRendirse();

    if (btnRendirse) {
        btnRendirse.style.display = "inline-block";
    }

    crearComida();
    snakeActivo = true;
    dibujarSnake();

    // Más lento para facilitar el control
    snakeIntervalo = setInterval(
        moverSnake,
        VELOCIDAD_SNAKE
    );
}


/* =====================================================
   MOVER EL GUSANITO
===================================================== */

function moverSnake() {
    if (!snakeActivo) return;

    direccion = { ...siguienteDireccion };

    const cabeza = {
        x: snake[0].x + direccion.x,
        y: snake[0].y + direccion.y
    };

    // Choque contra las paredes
    if (
        cabeza.x < 0 ||
        cabeza.x >= cantidad ||
        cabeza.y < 0 ||
        cabeza.y >= cantidad
    ) {
        perderSnake("💥 ¡Chocaste con la pared!");
        return;
    }

    // Comprobar si comerá una rosa
    const comeraRosa =
        cabeza.x === comida.x &&
        cabeza.y === comida.y;

    // Si no come, la cola se mueve y esa casilla queda libre
    const cuerpoParaComprobar = comeraRosa
        ? snake
        : snake.slice(0, -1);

    const choca = cuerpoParaComprobar.some(parte =>
        parte.x === cabeza.x &&
        parte.y === cabeza.y
    );

    if (choca) {
        perderSnake("💥 ¡Te chocaste contigo mismo!");
        return;
    }

    snake.unshift(cabeza);

    if (comeraRosa) {
        rosasComidas++;

        document.getElementById("rosasSnake").textContent =
            rosasComidas;

        crearComida();
    } else {
        snake.pop();
    }

    dibujarSnake();
}


/* =====================================================
   PERDER UN INTENTO
===================================================== */

function perderSnake(mensaje) {
    if (!snakeActivo) return;

    snakeActivo = false;
    clearInterval(snakeIntervalo);

    intentosSnake++;

    dibujarSnake();

    const mensajeSnake = document.getElementById("mensajeSnake");
    const btnSnake = document.getElementById("btnSnake");
    const btnRendirse = prepararBotonRendirse();
    const btnSiguiente = document.getElementById("siguiente5");

    if (intentosSnake < MAX_INTENTOS_SNAKE) {
        mensajeSnake.innerHTML =
            mensaje +
            "<br><br>💜 Has perdido el intento " +
            intentosSnake +
            " de " +
            MAX_INTENTOS_SNAKE +
            "." +
            "<br><br>¡No te rindas, amorcita!";

        if (btnSnake) {
            btnSnake.textContent = "🔄 Intentar otra vez";
            btnSnake.disabled = false;
            btnSnake.style.display = "inline-block";
        }

        if (btnRendirse) {
            btnRendirse.style.display = "inline-block";
        }

        btnSiguiente.style.display = "none";

    } else {
        // Se acabaron los tres intentos
        mensajeSnake.innerHTML =
            mensaje +
            "<br><br>😭 Has perdido tus 3 intentos." +
            "<br><br>💜 No te preocupes, amorcita." +
            "<br>¡Puedes continuar con nuestra historia!";

        if (btnSnake) {
            btnSnake.style.display = "none";
        }

        if (btnRendirse) {
            btnRendirse.style.display = "none";
        }

        // Aparece el botón para continuar
        btnSiguiente.textContent = "➡️ Siguiente";
        btnSiguiente.style.display = "inline-block";
    }
}


/* =====================================================
   BOTÓN ME RINDO
===================================================== */

function rendirseSnake() {
    snakeActivo = false;
    clearInterval(snakeIntervalo);

    document.getElementById("mensajeSnake").innerHTML =
        "🥹 Está bien, amorcita..." +
        "<br><br>Te dejaré pasar esta vez. 💜";

    const btnSnake = document.getElementById("btnSnake");
    const btnRendirse = document.getElementById("btnRendirse");
    const btnSiguiente = document.getElementById("siguiente5");

    if (btnSnake) {
        btnSnake.style.display = "none";
    }

    if (btnRendirse) {
        btnRendirse.style.display = "none";
    }

    btnSiguiente.textContent = "➡️ Siguiente";
    btnSiguiente.style.display = "inline-block";
}


/* =====================================================
   CONTROLES DEL GUSANITO
===================================================== */

function direccionSnake(nueva) {
    if (!snakeActivo) return;

    if (nueva === "up" && direccion.y !== 1) {
        siguienteDireccion = { x: 0, y: -1 };
    }

    if (nueva === "down" && direccion.y !== -1) {
        siguienteDireccion = { x: 0, y: 1 };
    }

    if (nueva === "left" && direccion.x !== 1) {
        siguienteDireccion = { x: -1, y: 0 };
    }

    if (nueva === "right" && direccion.x !== -1) {
        siguienteDireccion = { x: 1, y: 0 };
    }
}


/* =====================================================
   CONTROLES DEL TECLADO
===================================================== */

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
        event.preventDefault();
        direccionSnake("up");
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();
        direccionSnake("down");
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        direccionSnake("left");
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        direccionSnake("right");
    }
});


/* =====================================================
   PREPARAR EL JUEGO
===================================================== */

prepararBotonRendirse();

document.getElementById("btnRendirse").style.display = "none";

dibujarSnake();


/* =====================================================
   06 / 07 - CONTRASEÑA
===================================================== */

function verificarPassword() {

    const input =
        document.getElementById(
            "inputPassword"
        );

    const error =
        document.getElementById(
            "errorPassword"
        );


    const valor =
        input.value.trim().toUpperCase();


    if (
        valor ===
        CLAVE_SECRETA.toUpperCase()
    ) {

        document.getElementById(
            "bloquePassword"
        ).style.display =
            "none";


        document.getElementById(
            "cartaContenido"
        ).style.display =
            "block";
        const carta = document.getElementById("cartaContenido");
carta.classList.add("carta-magica");
lanzarPetalosCarta();

        error.innerText = "";

    } else {

        error.innerText =
            "💜 Esa no es la contraseña, amorcita. Vuelve al juego y revisa la clave.";

    }

}


/* =====================================================
   INICIAR CANVAS
===================================================== */

/* =========================================
   PÉTALOS MÁGICOS DE LA CARTA
========================================= */

function lanzarPetalosCarta() {
    const simbolos = ["🌹", "💜", "🌸", "✨"];
    const cantidadPetalos = 32;

    for (let i = 0; i < cantidadPetalos; i++) {
        const petalo = document.createElement("div");

        petalo.className = "petalo-carta";
        petalo.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        petalo.style.left = Math.random() * 100 + "vw";
        petalo.style.fontSize = (16 + Math.random() * 18) + "px";

        const duracion = 4 + Math.random() * 5;
        petalo.style.animationDuration = duracion + "s";
        petalo.style.animationDelay = (Math.random() * 2) + "s";

        document.body.appendChild(petalo);

        setTimeout(() => {
            petalo.remove();
        }, (duracion + 2) * 1000);
    }
}

dibujarSnake();