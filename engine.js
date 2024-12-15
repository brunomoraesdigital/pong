/* dados dos elementos */
const tabuleiroElemento = document.getElementById('tabuleiro');
const raqueteEsqElemento = document.getElementById('raqueteEsquerda');
const raqueteDirElemento = document.getElementById('raqueteDireita');
const bolaElemento = document.getElementById('bola');
const pontuacaoEsquerdaElemento = document.getElementById('pontuacaoEsquerda');
const pontuacaoDireitaElemento = document.getElementById('pontuacaoDireita');

/* dados do tabuleiro */
let tabuleiroAltura = tabuleiroElemento.offsetHeight; // altura
let tabuleiroLargura = tabuleiroElemento.offsetWidth; // largura

console.log(`${tabuleiroAltura} e ${tabuleiroLargura}`);

let linTopTab = 0;
let linBasTab = tabuleiroAltura;

let linEsqTab = 0;
let linDirTab = tabuleiroLargura;

console.log(`Posições Y: Topo = ${linTopTab}px, Base = ${linBasTab}px`);
console.log(`Posições X: Esquerda = ${linEsqTab}px, Direita = ${linDirTab}px`);

/* dados da bola*/

let bolaPosY = bolaElemento.offsetTop;
let bolaPosX = bolaElemento.offsetLeft;

console.log(`Posição Bola Y (Topo): ${bolaPosY}`);
console.log(`Posição Bola X (Esquerda): ${bolaPosX}`);

let bolaVelY = 2;
let bolaVelX = 2;

/* movimento da bola */
function movimentoBola() {
    bolaElemento.style.top = `${bolaPosY}px`;
    bolaElemento.style.left = `${bolaPosX}px`;
}

/* colisão bola x tabuleiro */
function colisaoBolaTabuleiro() {
    // Colisão com o topo
    if (bolaPosY <= linTopTab) {
        bolaVelY = -bolaVelY; // Inverte a direção da bola
    }

    // Colisão com a base
    if (bolaPosY >= linBasTab - bolaElemento.offsetHeight) {
        bolaVelY = -bolaVelY; // Inverte a direção da bola
    }
}

/* atualiza posição da bola */
setInterval(function () {
    bolaPosX += bolaVelX;
    bolaPosY += bolaVelY;

    colisaoBolaTabuleiro(); // Verifica colisões

    movimentoBola(); // Atualiza a posição da bola

}, 16);

/* dados das raquetes */

let raqEsqPosY = raqueteEsqElemento.offsetTop;
let raqDirPosY = raqueteDirElemento.offsetTop;

let raqVel = 4;


console.log(`Posição raq esq Y (Topo): ${raqEsqPosY}`);
console.log(`Posição raq dir y (topo): ${raqDirPosY}`);

let raqDirAltura = raqueteDirElemento.offsetHeight;
let raqEsqAltura = raqueteDirElemento.offsetHeight;

console.log(`altura raq esq: ${raqDirAltura}`);
console.log(`altura raq dir: ${raqEsqAltura}`);

/* movimento das raquetes */

function processarTecla(evento) {
    // Movimento da raquete esquerda
    if (evento.key === 'w' && raqEsqPosY > linTopTab +1) {
        console.log('Você pressionou a tecla w!');
        raqEsqPosY -= raqVel;
        raqueteEsqElemento.style.top = `${raqEsqPosY}px`;
    }
    if (evento.key === 's' && raqEsqPosY < linBasTab - raqEsqAltura - 5) {
        console.log('Você pressionou a tecla s!');
        raqEsqPosY += raqVel;
        raqueteEsqElemento.style.top = `${raqEsqPosY}px`;
    }

    // Movimento da raquete direita
    if (evento.key === 'ArrowUp' && raqDirPosY > linTopTab +1) {
        console.log('Você pressionou a tecla seta para cima!');
        raqDirPosY -= raqVel;
        raqueteDirElemento.style.top = `${raqDirPosY}px`;
    }
    if (evento.key === 'ArrowDown' && raqDirPosY < linBasTab - raqDirAltura -5) {
        console.log('Você pressionou a tecla seta para baixo!');
        raqDirPosY += raqVel;
        raqueteDirElemento.style.top = `${raqDirPosY}px`;
    }
}


document.addEventListener('keydown', processarTecla);






