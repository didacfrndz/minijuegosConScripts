//exportamos los patrones prediseñados
import { glider, blinker, toad, exploder } from './patrones.js';


//funcion para dibujar el universo
function dibuixaUnivers(columnes, files) {
    //agarramos el div univers
    const univers = document.querySelector('.univers');
    //inicializamos una variable html vacia
    let html = '';
    //bucle para crear las filas y las columnas
    for (let i = 0; i < files; i++) {
        html += '<div class="fila">';
        for (let j = 0; j < columnes; j++) {
            //cada celula tiene un id con su posicion tanto "i" para filas como "j" para columnas
            html += `<div class="celula" data-id="${i}-${j}">${i}-${j}</div>`;
        }
        //cerramos la fila
        html += '</div>';
    }
    //insertamos el html en el div univers
    univers.innerHTML = html;
}
//esto crea un universo
// dibuixaUnivers(9,9);

//funcion para dar un booleano aleatorio 
function aleatoriPercentatge(percentatge) {
    return Math.random() * 100 < percentatge;    
}
//test para ver si la funcion funciona correctamente
let contador = 0;
for (let i = 0; i < 10000; i++) {
    if (aleatoriPercentatge(30)) {
        contador++;
    }
}
console.log("Numero de veces que a sido true: " + contador);

// función que devuelve true o false aleatoriamente (50% de probabilidad)
function aleatorio() {
    return Math.random() < 0.5;
}

// función para crear matriz con valores booleanos aleatorios
function creaMatriu(columnes, files) {
    const matriu = [];
    for (let i = 0; i < files; i++) {
        const fila = [];
        for (let j = 0; j < columnes; j++) {
            fila.push(aleatorio()); // true (vivo) o false (muerto)
        }
        matriu.push(fila);
    }
    return matriu;
}
//test para ver si la funcion funciona correctamente
const matriu = creaMatriu(50, 50);
console.log(matriu);

//funcion para imprimir la matriz en el html
function dibuixaUniversAmbEstat(matriu) {
    const divmatriu = document.querySelector('.matriu');
    let html = '';
    for (let i = 0; i < matriu.length; i++) {
        html += '<div class="fila">';
        for (let j = 0; j < matriu[i].length; j++) {
            const estado = matriu[i][j] ? 'viva' : 'muerta';
            html += `<div class="celula celula-matriu ${estado}" data-id="${i}-${j}"></div>`;
        }
        html += '</div>';
    }
    divmatriu.innerHTML = html;
}   
//test para ver si la funcion funciona correctamente
dibuixaUniversAmbEstat(matriu);


//funcion para contar las celulas vivas alrededor de una celula dada
function comptarVeinsVius(matriu, x, y) {
    //contador de cuantos vecinos vivos hay
    let contador = 0;
    //bucle para recorrer las 8 posiciones alrededor de la celula dada
    // i y j van de -1 a 1 para cubrir todas las posiciones alrededor de la celula central
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue; // saltar de celula ya que es la celula central
            }
            // calcular las nuevas coordenadas
            const nuevaX = x + i;
            const nuevaY = y + j;
            // comprobar que las coordenadas estan dentro de los limites de la matriz
            if (nuevaX >= 0 && nuevaX < matriu.length && nuevaY >= 0 && nuevaY < matriu[0].length) {
                if (matriu[nuevaX][nuevaY]) {
                    // si la celula en la nueva posicion es viva, incrementar el contador
                    contador++;
                }
            }
        }
    }
    //devolver el numero de vecinos vivos
    return contador;
}
//test para ver si la funcion funciona correctamente
console.log("Vecinos vivos alrededor de (1,1): " + comptarVeinsVius(matriu, 1, 1));
console.log("Vecinos vivos alrededor de (0,0): " + comptarVeinsVius(matriu, 0, 0));
console.log("Vecinos vivos alrededor de (4,4): " + comptarVeinsVius(matriu, 4, 4));


//funcion para evolucionar las celulas vivas segun las reglas del juego de la vida
function evolucionar(matriu, x,y) {
    const vecinosVivos = comptarVeinsVius(matriu, x, y);
    if (matriu[x][y]) {
        // Regla de solitud, si una celula viva tiene menos de 2 vecinos vivos, muere
        if (vecinosVivos < 2) {
            return false;
        }
        //Regla viva, si una celula viva tiene 2 o 3 vecinos vivos, sigue viva
        if (vecinosVivos === 2 || vecinosVivos === 3) {
            return true;
        }
        //Regla de sobrepoblacion, si una celula viva tiene mas de 3 vecinos vivos, muere
        if (vecinosVivos > 3) {
            return false;
        }
    } else {
        //Regla de reproduccion, si una celula muerta tiene exactamente 3 vecinos vivos, nace
        if (vecinosVivos === 3) {
            return true;
        }

    }
    //si no se cumple ninguna regla, la celula muere o sigue muerta
    return false;
}
//test para ver si la funcion funciona correctamente
console.log("Evolucion de la celula (1,1): " + evolucionar(matriu, 1, 1));
console.log("Evolucion de la celula (0,0): " + evolucionar(matriu, 0, 0));
console.log("Evolucion de la celula (4,4): " + evolucionar(matriu, 4, 4));

//funcion para crear una nueva matriz evolucionada a partir de la matriz actual
function crearMatriuEvolucionada(matriu) {
    const novaMatriu = [];
    for (let i = 0; i < matriu.length; i++) {
        const novaFila = [];
        for (let j = 0; j < matriu[i].length; j++) {
            novaFila.push(evolucionar(matriu, i, j));
        }
        novaMatriu.push(novaFila);
    }
    return novaMatriu;
}
//test para ver si la funcion funciona correctamente
const novaMatriu = crearMatriuEvolucionada(matriu);
console.log("Matriz original:");
console.log(matriu);
console.log("Nueva matriz evolucionada:");
console.log(novaMatriu);
dibuixaUniversAmbEstat(novaMatriu);

//funcion para copiar la matriz que copie la matriz original y la matriz que se va a modificar sean independientes
function copiaMatriu(matriu, novaMatriu) {
    for (let i = 0; i < matriu.length; i++) {
        for (let j = 0; j < matriu[i].length; j++) {
            matriu[i][j] = novaMatriu[i][j];
        }
    }
}
//test para ver si la funcion funciona correctamente
copiaMatriu(matriu, novaMatriu);
console.log("Matriz original despues de copiar la nueva matriz:");
console.log(matriu);

//implementacion completa del juego 

//inicializamos la matriz
let matriuActual = creaMatriu(100, 100);
//dibujamos la matriz inicial
dibuixaUniversAmbEstat(matriuActual);

//evolucion de la matriz
crearMatriuEvolucionada(matriuActual);
//dibujamos la nueva matriz
dibuixaUniversAmbEstat(matriuActual);

//animacuion del juego
setInterval(() => {
    const novaMatriu = crearMatriuEvolucionada(matriuActual);
    copiaMatriu(matriuActual, novaMatriu);
    dibuixaUniversAmbEstat(matriuActual);
}, 500);

