// Array de preguntas i respostes
const preguntesMatematica = [
  {
    pregunta: "Quin és el resultat de 2 + 3?",
    respostes: ["4", "5", "6"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 5 - 2?",
    respostes: ["1", "2", "3"],
    correcta: 2,
  },
  {
    pregunta: "Quin és el resultat de 3 x 4?",
    respostes: ["10", "12", "14"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 6 ÷ 3?",
    respostes: ["1", "2", "3"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 9 + 7?",
    respostes: ["16", "17", "18"],
    correcta: 0,
  },
  {
    pregunta: "Quin és el resultat de 8 - 4?",
    respostes: ["2", "3", "4"],
    correcta: 2,
  },
  {
    pregunta: "Quin és el resultat de 12 ÷ 4?",
    respostes: ["2", "3", "4"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 5 x 5?",
    respostes: ["20", "25", "30"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 15 ÷ 3?",
    respostes: ["4", "5", "6"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 7 x 6?",
    respostes: ["42", "48", "36"],
    correcta: 0,
  },
  {
    pregunta: "Quin és el resultat de 10 x 9?",
    respostes: ["80", "90", "100"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 20 ÷ 5?",
    respostes: ["2", "4", "6"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 12 + 18?",
    respostes: ["28", "30", "32"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 36 ÷ 6?",
    respostes: ["5", "6", "7"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 14 x 3?",
    respostes: ["38", "42", "45"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 17 + 9?",
    respostes: ["24", "25", "26"],
    correcta: 0,
  },
  {
    pregunta: "Quin és el resultat de 25 ÷ 5?",
    respostes: ["3", "5", "7"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 48 ÷ 8?",
    respostes: ["6", "7", "8"],
    correcta: 0,
  },
  {
    pregunta: "Quin és el resultat de 81 ÷ 9?",
    respostes: ["8", "9", "10"],
    correcta: 1,
  },
  {
    pregunta: "Quin és el resultat de 17 x 6?",
    respostes: ["98", "102", "106"],
    correcta: 1,
  },
];

//Variables
let posicionPregunta = 0;
const preguntaCard = document.querySelector('.question-title');
const respuestasContainer = document.querySelector('.mb-4');
const dadoSpan = document.querySelector('.dice-number');
const botonDado = document.querySelector('.btn-outline-primary.btn-sm');
const progresoTexto = document.querySelector('.d-flex.justify-content-between.text-muted.mb-2 span:last-child');
const progresoBarra = document.querySelector('.progress-fill');

// NUEVO: Variable para controlar si ya se ha respondido la pregunta
let preguntaRespondida = false;

// Variables para la posición del jugador
let posicionJugador = 1; // Puedes inicializar según tu lógica de tablero

// Elementos para mostrar la posición del jugador
const jugadorPosicion = document.querySelectorAll('.player-position')[0];
const jugadorCasilla = document.querySelectorAll('.badge-outline')[0];
const turnoBadge = document.querySelector('.badge-primary');

// Actualiza visualmente la posición del jugador
function actualizarPosiciones() {
    jugadorPosicion.querySelector('span').textContent = posicionJugador;
    jugadorCasilla.textContent = `Casilla ${posicionJugador}`;
    // Cambia el color de jugador activo
    jugadorPosicion.classList.add('player-active');
    jugadorPosicion.classList.remove('player-inactive');
    turnoBadge.textContent = 'Turno: Jugador';
    turnoBadge.classList.add('badge-primary');
    turnoBadge.classList.remove('badge-secondary');
}

// Funció per mostrar la pregunta i les seves respostes
function mostrarPregunta(pos) {
    const preguntaObj = preguntesMatematica[pos];
    if (!preguntaObj) return;
    preguntaCard.textContent = preguntaObj.pregunta;
    respuestasContainer.innerHTML = '';
    preguntaRespondida = false; // Permetre respondre la nova pregunta

    // Mostrar respostes
    preguntaObj.respostes.forEach((respuesta, idx) => {
        const letra = ['A', 'B', 'C'][idx];
        const btn = document.createElement('button');
        btn.className = 'btn answer-btn w-100';
        btn.innerHTML = `<span class="answer-letter">${letra})</span> ${respuesta}`;
        btn.disabled = false;
        // Evento para seleccionar respuesta
        btn.addEventListener('click', function () {
            if (preguntaRespondida) return;
            preguntaRespondida = true;
            // Deshabilitar todos los botones
            Array.from(respuestasContainer.children).forEach(b => b.disabled = true);
            // Marcar correcta/incorrecta
            let acierto = false;
            if (idx === preguntaObj.correcta) {
            btn.classList.add('btn-success');
            acierto = true;
            } else {
            btn.classList.add('btn-danger');
            // Resaltar la correcta
            respuestasContainer.children[preguntaObj.correcta].classList.add('btn-success');
            }
            
            moverJugador(acierto);
            actualizarPosiciones();
        });
        respuestasContainer.appendChild(btn);
    });

    // Actualizar progreso
    const porcentaje = Math.round(((pos + 1) / preguntesMatematica.length) * 100);
    if (progresoTexto) progresoTexto.textContent = `${porcentaje}%`;
    if (progresoBarra) progresoBarra.style.width = `${porcentaje}%`;
}

// Mueve al jugador según si acierta o falla
function moverJugador(acierto) {
    if (acierto) {
        posicionJugador += 5;
    } else {
        posicionJugador = Math.max(1, posicionJugador - 1);
    }
    if (posicionJugador >= 20) {
        reiniciarJuego();
    }
}

// Mostrar la primera pregunta al cargar
mostrarPregunta(posicionPregunta);
actualizarPosiciones();

function reiniciarJuego() {
    if (posicionJugador >= 20) {
        botonDado.textContent = 'Reiniciar';
        botonDado.classList.remove("btn-outline-primary");
        botonDado.classList.add("rojo");
    }

}

//Lógica del dado y avance
botonDado.addEventListener("click", function() {
    if (posicionPregunta >= preguntesMatematica.length - 1) {
        posicionPregunta = 0;
        mostrarPregunta(posicionPregunta);
        dadoSpan.textContent = '?';
        botonDado.textContent = '🎲 Tirar dado';
        botonDado.classList.remove("rojo");
        botonDado.classList.add("btn-outline-primary");
        return;
    }

    let valorDado = Math.floor(Math.random() * 6 + 1);
    dadoSpan.textContent = valorDado;

    posicionPregunta += valorDado;
    if (posicionPregunta >= preguntesMatematica.length) {
        posicionPregunta = preguntesMatematica.length - 1;
    }

    mostrarPregunta(posicionPregunta);

    if (posicionPregunta >= preguntesMatematica.length - 1) {
        botonDado.textContent = 'Reiniciar';
        botonDado.classList.remove("btn-outline-primary");
        botonDado.classList.add("rojo");
    }
});