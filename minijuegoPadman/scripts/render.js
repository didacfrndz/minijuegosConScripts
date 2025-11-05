// Importo el array de enemigos
import { enemigos } from './enemy.js';
import { player } from './player.js';

// Esta es la matriz inicial (tablero de juego)
const matriz = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Coloca los enemigos en la matriz
enemigos.forEach(enemigo => {
    if (enemigo.vivo) {
        matriz[enemigo.f][enemigo.c] = 'E';
    }
});

// Coloca a Pacman en la matriz (posición inicial) si está vivo
if (player.vivo) {
    matriz[player.f][player.c] = '😊';
}

// Función para imprimir la matriz en el HTML
function imprimirMatriz(matriz) {
    const divmatriz = document.getElementById('gameContainer');
    if (!divmatriz) {
        console.error('No se encontró #gameContainer en el DOM.');
        return;
    }

    let matrizHTML = '';

    for (let fila = 0; fila < matriz.length; fila++) {
        matrizHTML += '<div class="fila-matriz">';
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            const celda = matriz[fila][columna];
            if (celda === 'E') {
                matrizHTML += `<div class="box-matriz enemigo">🛸</div>`;
            } else if (celda === '😊') {
                matrizHTML += `<div class="box-matriz player">😊</div>`;
            } else {
                // celdas vacías: no mostrar el 0, dejar vacío
                matrizHTML += `<div class="box-matriz"></div>`;
            }
        }
        matrizHTML += '</div>';
    }

    divmatriz.innerHTML = matrizHTML;
}

// Imprime la matriz inicial con la posición de Pacman
imprimirMatriz(matriz);

// Controlador de movimiento de Pacman con las flechas del teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Limpia la posición actual de Pacman (solo si estaba representada como '😊')
    if (matriz[player.f][player.c] === '😊') {
        matriz[player.f][player.c] = 0;
    }

    if (key === 'ArrowUp' && player.f > 0) {
        player.f--;
    } else if (key === 'ArrowDown' && player.f < matriz.length - 1) {
        player.f++;
    } else if (key === 'ArrowLeft' && player.c > 0) {
        player.c--;
    } else if (key === 'ArrowRight' && player.c < matriz[0].length - 1) {
        player.c++;
    }

    // Actualiza la posición de Pacman en la matriz
    matriz[player.f][player.c] = '😊';

    // Reimprime la matriz
    imprimirMatriz(matriz);
});





