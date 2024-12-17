/* dados dos elementos */
const tabuleiroElemento = document.getElementById('tabuleiro');
const raqueteEsqElemento = document.getElementById('raqueteEsquerda');
const raqueteDirElemento = document.getElementById('raqueteDireita');
const bolaElemento = document.getElementById('bola');
const pontuacaoEsquerdaElemento = document.getElementById('pontuacaoEsquerda');
const pontuacaoDireitaElemento = document.getElementById('pontuacaoDireita');

let tabuleiroAltura = tabuleiroElemento.offsetHeight; // altura
let tabuleiroLargura = tabuleiroElemento.offsetWidth; // largura
console.log(`${tabuleiroAltura} e ${tabuleiroLargura}`);

let linTopTab = 0;
let linBasTab = tabuleiroAltura;

let linEsqTab = 0;
let linDirTab = tabuleiroLargura;
console.log(`Posições Y: Topo = ${linTopTab}px, Base = ${linBasTab}px`);
console.log(`Posições X: Esquerda = ${linEsqTab}px, Direita = ${linDirTab}px`);

let bolaPosY = bolaElemento.offsetTop;
let bolaPosX = bolaElemento.offsetLeft;
console.log(`Posição Bola Y (Topo): ${bolaPosY}`);
console.log(`Posição Bola X (Esquerda): ${bolaPosX}`);

let bolaVelY = 2;
let bolaVelX = 2;

let pontuacaoEsquerda = 0; // Variável para armazenar pontos do jogador esquerdo
let pontuacaoDireita = 0; // Variável para armazenar pontos do jogador direito

let raqEsqPosY = raqueteEsqElemento.offsetTop;
let raqDirPosY = raqueteDirElemento.offsetTop;

let raqVel = 4;

console.log(`Posição raq esq Y (Topo): ${raqEsqPosY}`);
console.log(`Posição raq dir y (topo): ${raqDirPosY}`);

let raqEsqAltura = raqueteEsqElemento.offsetHeight;
let raqDirAltura = raqueteDirElemento.offsetHeight;

console.log(`altura raq esq: ${raqDirAltura}`);
console.log(`altura raq dir: ${raqEsqAltura}`);

/* ************************* /

/* movimento da bola */
function movimentoBola() {
    bolaElemento.style.top = `${bolaPosY}px`;
    bolaElemento.style.left = `${bolaPosX}px`;
}

/* colisão bola x tabuleiro */
function colisaoBolaTabuleiroHorizontal() {
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

    colisaoBolaTabuleiroHorizontal(); 

    colisaoBolaRaquete();

    verificarGol()

    movimentoBola(); 

}, 16);

/* movimento das raquetes */

function processarTecla(evento) {
    if (evento.key === 'w' && raqEsqPosY > linTopTab + 1) {
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
    if (evento.key === 'ArrowUp' && raqDirPosY > linTopTab + 1) {
        console.log('Você pressionou a tecla seta para cima!');
        raqDirPosY -= raqVel;
        raqueteDirElemento.style.top = `${raqDirPosY}px`;
    }
    if (evento.key === 'ArrowDown' && raqDirPosY < linBasTab - raqDirAltura - 5) {
        console.log('Você pressionou a tecla seta para baixo!');
        raqDirPosY += raqVel;
        raqueteDirElemento.style.top = `${raqDirPosY}px`;
    }
}

document.addEventListener('keydown', processarTecla);

function colisaoBolaRaquete() {
    if (
        bolaPosX + bolaElemento.offsetWidth >= linDirTab - raqueteDirElemento.offsetWidth && // A bola atinge a borda esquerda da raquete direita
        bolaPosY + bolaElemento.offsetHeight >= raqDirPosY && // A bola está abaixo do topo da raquete
        bolaPosY <= raqDirPosY + raqDirAltura // A bola está acima da base da raquete
    ) {
        bolaVelX = - bolaVelX; // Inverte a direção da bola no eixo X
        console.log('Colisão com a raquete direita!');
    }

    if (
        bolaPosX <= raqueteEsqElemento.offsetWidth && // A bola atinge a borda direita da raquete esquerda
        bolaPosY + bolaElemento.offsetHeight >= raqEsqPosY && // A bola está abaixo do topo da raquete
        bolaPosY <= raqEsqPosY + raqEsqAltura // A bola está acima da base da raquete
    ) {
        bolaVelX = - bolaVelX; // Inverte a direção da bola no eixo X
        console.log('Colisão com a raquete esquerda!');
    }
}
function verificarGol() {
    if (bolaPosX <= linEsqTab) {
        // Bola ultrapassou o lado esquerdo
        console.log('Ponto para a direita!');
        pontuacaoDireita++; // Aumenta a pontuação do jogador da direita
        pontuacaoDireitaElemento.textContent = pontuacaoDireita; 
        reiniciarBola();
    }

    if (bolaPosX + bolaElemento.offsetWidth >= linDirTab) {
        // Bola ultrapassou o lado direito
        console.log('Ponto para a esquerda!');
        pontuacaoEsquerda++; // Aumenta a pontuação do jogador da esquerda
        pontuacaoEsquerdaElemento.textContent = pontuacaoEsquerda; 
        reiniciarBola();
    }
}

function reiniciarBola() {
    // Centraliza a bola no meio do tabuleiro
    bolaPosX = tabuleiroLargura / 2 - bolaElemento.offsetWidth / 2;
    bolaPosY = tabuleiroAltura / 2 - bolaElemento.offsetHeight / 2;

    // Inverte a direção da bola para que ela vá ao lado do vencedor anterior
    bolaVelX = -bolaVelX;
    bolaVelY = 2; // Restaura a velocidade inicial

    // Centraliza a raquete esquerda
    raqEsqPosY = tabuleiroAltura / 2 - raqueteEsqElemento.offsetHeight / 2;
    raqueteEsqElemento.style.top = `${raqEsqPosY}px`;

    // Centraliza a raquete direita
    raqDirPosY = tabuleiroAltura / 2 - raqueteDirElemento.offsetHeight / 2;
    raqueteDirElemento.style.top = `${raqDirPosY}px`;
}






