function obterDimensoesDaTela() {
    let largura = window.innerWidth;
    let altura = window.innerHeight;

    /*console.log(
        'Dimensões da Tela\n' +
        '\tLargura:\t' + largura +
        '\n\tAltura:\t\t' + altura
    )*/

    return { largura, altura };
}

const ALTURA_REFERENCIA = 914;
const FONT_REFERENCIA = 16;
function atualizarTamanhoDaFonte(altura) {
    let tamanhoDaFonte = Math.floor((FONT_REFERENCIA * altura) / ALTURA_REFERENCIA);
    document.documentElement.style.setProperty('--font-size', tamanhoDaFonte + 'px');

    /*console.log('Tamanho da Fonte: ' + tamanhoDaFonte);*/
}
/* ----------------------- */

const elementoTabuleiro = document.getElementById('tabuleiro');
const elementoRaquete = document.getElementById('raquete');
const elementoBola = document.getElementById('bola');

function obterDimensoesDosElementos(elemento) {
    return {
        largura: elemento.offsetWidth,
        altura: elemento.offsetHeight,
    };
}

function dimensoesDosElementos() {
    const dimensoesTabuleiro = obterDimensoesDosElementos(elementoTabuleiro);
    const dimensoesRaquete = obterDimensoesDosElementos(elementoRaquete);
    const dimensoesBola = obterDimensoesDosElementos(elementoBola);

    /*console.log(`Tabuleiro\n\tLargura: \t${dimensoesTabuleiro.largura}px \n\tAltura: \t${dimensoesTabuleiro.altura}px`);
    console.log(`Raquete\n\tLargura: \t${dimensoesRaquete.largura}px \n\tAltura: \t${dimensoesRaquete.altura}px`);
    console.log(`Bola\n\tLargura: \t${dimensoesBola.largura}px \n\tAltura: \t${dimensoesBola.altura}px`);*/

    return { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola };

}

function posicoesDosElementos() {
    const posicaoDaBolaX = elementoBola.offsetLeft;
    const { dimensoesBola, dimensoesRaquete } = dimensoesDosElementos();
    const posicaoDaBolaY = posicaoDaBolaX + dimensoesBola.largura;

    /*console.log('Posição inicial/final da bola:');
    console.log('X:', posicaoDaBolaX, 'Y:', posicaoDaBolaY);*/

    const posicaoDaRaqueteX = elementoRaquete.offsetLeft;
    const posicaoDaRaqueteY = posicaoDaRaqueteX + dimensoesRaquete.largura;
    
    /*console.log('Posição inicial/final da raquete:');
    console.log('X:', posicaoDaRaqueteX, 'Y:', posicaoDaRaqueteY);*/

    return {
        posicaoDaBolaX,
        posicaoDaBolaY,
        posicaoDaRaqueteX,
        posicaoDaRaqueteY
    }
}


function animarBola() {

    elementoBola.style.left = 0 + 'px';
}
animarBola();


/* --------------------------------- */
function carregarLayout() {
    const { altura } = obterDimensoesDaTela();
    atualizarTamanhoDaFonte(altura);
    dimensoesDosElementos();
    posicoesDosElementos();
    /*console.log('-----------------------');*/
}

document.addEventListener('DOMContentLoaded', function () {
    carregarLayout();
});

let debounce;
function aoRedimensionar() {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
        carregarLayout();
    }, 16);
}
window.addEventListener('resize', aoRedimensionar);

function iniciar_jogo() {
    controlarBotao();
}

function controlarBotao() {
    carregarLayout();
}


/* ====================================================== */
// depuraçao
/* ====================================================== */ 

let DEBUG = true;
function depuracao() {
    if (DEBUG) {
    const { largura, altura } = obterDimensoesDaTela();  // Obtenção de dimensões da tela
    atualizarTamanhoDaFonte(altura);  // Atualização do tamanho da fonte com base na altura da tela

    // Obtenção das dimensões dos elementos
    const { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola } = dimensoesDosElementos();

    // Obtenção das posições dos elementos
    const { posicaoDaBolaX, posicaoDaBolaY, posicaoDaRaqueteX, posicaoDaRaqueteY } = posicoesDosElementos();

    // Realizando os logs uma vez
    console.log(
        'Dimensões da Tela\n' +
        '\tLargura:\t' + largura +
        '\n\tAltura:\t\t' + altura
    );
    
    console.log('Tamanho da Fonte: ' + Math.floor((FONT_REFERENCIA * altura) / ALTURA_REFERENCIA));

    console.log(`Tabuleiro\n\tLargura: \t${dimensoesTabuleiro.largura}px \n\tAltura: \t${dimensoesTabuleiro.altura}px`);
    console.log(`Raquete\n\tLargura: \t${dimensoesRaquete.largura}px \n\tAltura: \t${dimensoesRaquete.altura}px`);
    console.log(`Bola\n\tLargura: \t${dimensoesBola.largura}px \n\tAltura: \t${dimensoesBola.altura}px`);

    console.log('Posição inicial/final da bola:');
    console.log('X:', posicaoDaBolaX, 'Y:', posicaoDaBolaY);

    console.log('Posição inicial/final da raquete:');
    console.log('X:', posicaoDaRaqueteX, 'Y:', posicaoDaRaqueteY);
}}
depuracao ();