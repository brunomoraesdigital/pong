const elementoCaixaDoJogo = document.getElementById('caixaDoJogo');

// Elementos da interface
const elementoInterface = document.getElementById('interface');
const elementoPontuacao = document.getElementById('pontuacao');
const elementoNivel = document.getElementById('nivel');
const elementoVidas = document.getElementById('vidas'); 

// Elementos do tabuleiro
const elementoTabuleiro = document.getElementById('tabuleiro');
const elementoBola = document.getElementById('bola');
const elementoraquete = document.getElementById('raquete');
const elementoBotao = document.getElementById('botao');

let larguraDaTela = window.innerWidth;
let alturaDaTela = window.innerHeight;

let larguraElementoCaixaDoJogo;
let alturaElementoCaixaDoJogo;


function carregar_elementos () {
    larguraElementoCaixaDoJogo = Math.floor((larguraDaTela*90)/100);
    alturaElementoCaixaDoJogo = Math.floor((alturaDaTela*70)/100);

    elementoCaixaDoJogo.style.width = `${larguraElementoCaixaDoJogo}px`;
    elementoCaixaDoJogo.style.height = `${alturaElementoCaixaDoJogo}px`;

    elementoBola.style.width = `${(larguraElementoCaixaDoJogo*2)/100}px`;
    elementoBola.style.height = `${(larguraElementoCaixaDoJogo*2)/100}px`;

    elementoraquete.style.height = `${(larguraElementoCaixaDoJogo*2)/100}px`;
    elementoraquete.style.width = `${(larguraElementoCaixaDoJogo*15)/100}px`;
    
}

function iniciar_jogo () {
    botao.style.display = "none";
}

function carregar_jogo () {
    carregar_elementos();

}

carregar_jogo();

// Responsividade
/*
window.addEventListener('resize', () => {
    larguraDaTela = window.innerWidth;
    alturaDaTela = window.innerHeight;
    carregar_jogo();
});
*/