const preguntas = [     ///generadas con chatGPT
    "¿Qué devuelve la función document.querySelector()?",
    "¿Qué es la especificidad en CSS y por qué es importante?",
    "¿Qué significa la sigla CSS?",
    "¿Qué diferencia hay entre relative, absolute y fixed en la propiedad position?",
    "¿Cuál es la diferencia entre div y span?",
    "¿Qué diferencia hay entre == y ===?",
    "¿Cómo se inserta una imagen en una página web?",
    "¿Qué significa la sigla HTML?",
    "¿Qué hace la propiedad display: flex;?",
    "¿Qué atributo de un enlace a indica la dirección a la que lleva?",
    "¿Qué es un array en JavaScript?",
    "¿Qué sucede si intentas acceder a una variable que no ha sido declarada?",
    "¿Cuál es la diferencia entre id y class en CSS?",
    "¿Qué significa que JavaScript sea un lenguaje interpretado?",
    "¿Qué propiedad se usa para cambiar el color de fondo?",
    "¿Cuál es la diferencia entre var, let y const?",
    "¿Qué diferencia hay entre ol y ul?",
    "¿Qué es una función de callback?",
    "¿Para qué sirve la etiqueta head?",
    "¿Qué selector se usa para dar estilo a todos los párrafos p dentro de un div con clase 'container'?",

  ];
  

///declaracion de variables


let posicionJugador = 0; // Posición inicial

const botonDado = document.getElementById("btn-dado");
const panelDado = document.getElementById("panel-dado");
const textoPregunta = document.getElementById("texto-pregunta");
const textoFin = document.getElementById("texto-fin");
const textoPosicion = document.getElementById("texto-posicion");

botonDado.addEventListener("click", function() {
    let valorDado = Math.floor(Math.random() * 6 + 1);
    console.log("Dado lanzado: " + valorDado);

    if (posicionJugador >= 20) {
        textoPosicion.innerHTML = `Posición actual: 20`;
        textoPregunta.innerHTML = `Pregunta: ${preguntas[19]}`;
        panelDado.innerHTML = `<p>?</p>`;
        posicionJugador = 0;
        textoPosicion.innerHTML = `Posición actual: 0`;
        textoPregunta.innerHTML = `Pregunta:`;
        botonDado.innerHTML = `Lanzar Dado`;
        botonDado.classList.remove("rojo");
        botonDado.classList.remove("btn-lanzar");
        botonDado.classList.add("btn-lanzar");
        textoFin.innerHTML = "";
    } else {
        panelDado.innerHTML = `<p>${valorDado}</p>`;
        textoPosicion.innerHTML = `Posición actual: ${posicionJugador}`;
        textoPregunta.innerHTML = `Pregunta: ${preguntas[posicionJugador]}`;
        posicionJugador += valorDado;
        textoPosicion.innerHTML = `Posición actual: ${posicionJugador}`;
        textoPregunta.innerHTML = `Pregunta: ${preguntas[posicionJugador]}`;
        if (posicionJugador >= 20) {
            textoPosicion.innerHTML = `Posición actual: 20`;
            textoPregunta.innerHTML = `Pregunta: ${preguntas[19]}`;
            botonDado.innerHTML = `Reiniciar`;
            botonDado.classList.remove("btn-lanzar");
            botonDado.classList.add("rojo");
            textoFin.innerHTML = `¡HAS LLEGADO AL FINAL!`;
        }
    }
});