
const comprobar = document.querySelector(`#btncomprobar`);
const texto = document.querySelector(`#txttexto`);
const intentos = document.querySelector(`#divIntentos`);
const cont = document.querySelector(`#divContador`);
const btnReiniciar = `<button>Reiniciar</button>`;
let contador = 0;
let min = 1;
let max = 20;
let numeroRandom = Math.round(Math.random() * (max - min) + min);
console.log(numeroRandom);

comprobar.addEventListener(`click`, comrpobacion);

function comrpobacion() {
    let NUMERO = document.querySelector(`#numero`).value;
    NUMERO = parseInt(NUMERO);
    console.log(NUMERO);
    if(contador===5){
        texto.innerHTML = `<p>Maximo de intentos permitidos</p>  ${btnReiniciar}`; 
    }else if (NUMERO < min || NUMERO > max) {
        texto.innerHTML = `<p>Ingresa un número entre ${min} y ${max}</p>`;
    } else if (NUMERO < numeroRandom) {
        texto.innerHTML = `<p>El número es mayor que ${NUMERO}</p>`;
        min = NUMERO +1;
        contador++;
        cont.innerHTML = `<p>Intento ${contador} </p>`;
    } else if (NUMERO > numeroRandom) {
        texto.innerHTML = `<p>El número es menor que ${NUMERO}</p>`;
        max = NUMERO -1;
        contador++;
        cont.innerHTML = `<p>Intento ${contador} </p>`;
    } else if (NUMERO === numeroRandom) {
        texto.innerHTML = `<p>¡Felicidades! Has adivinado el número.</p> ${btnReiniciar}`;
        
    }
        intentos.innerHTML += `<div id="estilo">${NUMERO}</div>`;
}

btnReiniciar.addEventListener('click', function() {
    location.reload();
});