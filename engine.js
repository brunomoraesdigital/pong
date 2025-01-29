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
    const { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola } = dimensoesDosElementos();

    const posicaoDoTabuleiroX = elementoTabuleiro.offsetLeft;
    const posicaoDoTabuleiroY = posicaoDoTabuleiroX + dimensoesTabuleiro.largura;

    /*console.log('Posição inicial/final do tabuleiro:');
    console.log('X:', posicaoDoTabuleiroX, 'Y:', posicaoDoTabuleiroY);*/

    const posicaoDaRaqueteX = elementoRaquete.offsetLeft;
    const posicaoDaRaqueteY = posicaoDaRaqueteX + dimensoesRaquete.largura;

    /*console.log('Posição inicial/final da raquete:');
    console.log('X:', posicaoDaRaqueteX, 'Y:', posicaoDaRaqueteY);*/

    const posicaoDaBolaX = elementoBola.offsetLeft;
    const posicaoDaBolaY = posicaoDaBolaX + dimensoesBola.largura;

    /*console.log('Posição inicial/final da bola:');
    console.log('X:', posicaoDaBolaX, 'Y:', posicaoDaBolaY);*/

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
        /* ============================= */
        // Coleta de Dados Organizados
        /* ============================= */

        /* ------------------------------------------ */
        // dimensões da tela
        const { largura, altura } = obterDimensoesDaTela();
        /* ------------------------------------------ */
        // tamanho da fonte
        atualizarTamanhoDaFonte(altura);

        /* ------------------------------------------ */
        // dimensões dos elementos
        const { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola } = dimensoesDosElementos();

        /* ------------------------------------------ */
        // posições dos elementos
        const { posicaoDoTabuleiroX, posicaoDoTabuleiroY, posicaoDaRaqueteX, posicaoDaRaqueteY, posicaoDaBolaX, posicaoDaBolaY } = posicoesDosElementos();


        /* ============================= */
        // Logs organizados para depuração
        /* ============================= */

        /* ------------------------------------------ */
        // Dimensões da tela 
        console.log(
            'Dimensões da Tela\n' +
            '\tLargura:\t' + largura +
            '\n\tAltura:\t\t' + altura
        );
        /* ------------------------------------------ */
        // Tamanho da fonte
        console.log('Tamanho da Fonte: ' + Math.floor((FONT_REFERENCIA * altura) / ALTURA_REFERENCIA));

        /* ------------------------------------------ */
        // Dimensões dos elementos
        console.log(`Tabuleiro\n\tLargura: \t${dimensoesTabuleiro.largura}px \n\tAltura: \t${dimensoesTabuleiro.altura}px`);
        console.log(`Raquete\n\tLargura: \t${dimensoesRaquete.largura}px \n\tAltura: \t${dimensoesRaquete.altura}px`);
        console.log(`Bola\n\tLargura: \t${dimensoesBola.largura}px \n\tAltura: \t${dimensoesBola.altura}px`);

        /* ------------------------------------------ */
        // Posição dos elementos
        console.log('Posição inicial/final da bola:');
        console.log('X:', posicaoDaBolaX, 'Y:', posicaoDaBolaY);

        console.log('Posição inicial/final da raquete:');
        console.log('X:', posicaoDaRaqueteX, 'Y:', posicaoDaRaqueteY);

        console.log('Posição inicial/final do tabuleiro:');
        console.log('X:', posicaoDoTabuleiroX, 'Y:', posicaoDoTabuleiroY);
    }
}
depuracao();