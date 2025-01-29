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

    /* ------------------------------------------ */
    // Posição do Tabuleiro
    const posicao_x_inicialDoTabuleiro = elementoTabuleiro.offsetLeft;
    const posicao_x_finalDoTabuleiro = posicao_x_inicialDoTabuleiro + dimensoesTabuleiro.largura;
    const posicao_y_inicialDoTabuleiro = elementoTabuleiro.offsetTop;
    const posicao_y_finalDoTabuleiro = posicao_y_inicialDoTabuleiro + dimensoesTabuleiro.altura;

    // console.log('Posição horizontal(x) inicial/final do tabuleiro:');
    // console.log('inicio:', posicao_x_inicialDoTabuleiro, 'fim:', posicao_x_finalDoTabuleiro);
    // console.log('Posição vertical(y) inicial/final do tabuleiro:');
    // console.log('inicio:', posicao_y_inicialDoTabuleiro, 'fim:', posicao_y_finalDoTabuleiro);

    /* ------------------------------------------ */
    // Posição da Raquete
    const posicao_x_inicialDaRaquete = elementoRaquete.offsetLeft;
    const posicao_x_finalDaRaquete = posicao_x_inicialDaRaquete + dimensoesRaquete.largura;
    const posicao_y_inicialDaRaquete = elementoRaquete.offsetTop;
    const posicao_y_finalDaRaquete = posicao_y_inicialDaRaquete + dimensoesRaquete.altura;

    // console.log('Posição horizontal(x) inicial/final da raquete:');
    // console.log('inicio:', posicao_x_inicialDaRaquete, 'fim:', posicao_x_finalDaRaquete);
    // console.log('Posição vertical(y) inicial/final da raquete:');
    // console.log('inicio:', posicao_y_inicialDaRaquete, 'fim:', posicao_y_finalDaRaquete);

    /* ------------------------------------------ */
    // Posição da Bola
    const posicao_x_inicialDaBola = elementoBola.offsetLeft;
    const posicao_x_finalDaBola = posicao_x_inicialDaBola + dimensoesBola.largura;
    const posicao_y_inicialDaBola = elementoBola.offsetTop;
    const posicao_y_finalDaBola = posicao_y_inicialDaBola + dimensoesBola.altura;

    // console.log('Posição horizontal(x) inicial/final da bola:');
    // console.log('inicio:', posicao_x_inicialDaBola, 'fim:', posicao_x_finalDaBola);
    // console.log('Posição vertical(y) inicial/final da bola:');
    // console.log('inicio:', posicao_y_inicialDaBola, 'fim:', posicao_y_finalDaBola);

    return { 
        posicao_x_inicialDoTabuleiro,
        posicao_x_finalDoTabuleiro,
        posicao_y_inicialDoTabuleiro,
        posicao_y_finalDoTabuleiro,
        posicao_x_inicialDaRaquete,
        posicao_x_finalDaRaquete,
        posicao_y_inicialDaRaquete,
        posicao_y_finalDaRaquete,
        posicao_x_inicialDaBola,
        posicao_x_finalDaBola,
        posicao_y_inicialDaBola,
        posicao_y_finalDaBola
    };
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
// depuração
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
        const { 
            posicao_x_inicialDoTabuleiro, posicao_x_finalDoTabuleiro, posicao_y_inicialDoTabuleiro, posicao_y_finalDoTabuleiro, 
            posicao_x_inicialDaRaquete, posicao_x_finalDaRaquete, posicao_y_inicialDaRaquete, posicao_y_finalDaRaquete,
            posicao_x_inicialDaBola, posicao_x_finalDaBola, posicao_y_inicialDaBola, posicao_y_finalDaBola
        } = posicoesDosElementos();


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
        console.log('Posição horizontal(x) inicial/final do tabuleiro:');
        console.log('inicio:', posicao_x_inicialDoTabuleiro, 'fim:', posicao_x_finalDoTabuleiro);
        console.log('Posição vertical(y) inicial/final do tabuleiro:');
        console.log('inicio:', posicao_y_inicialDoTabuleiro, 'fim:', posicao_y_finalDoTabuleiro);
        
        console.log('Posição horizontal(x) inicial/final da raquete:');
        console.log('inicio:', posicao_x_inicialDaRaquete, 'fim:', posicao_x_finalDaRaquete);
        console.log('Posição vertical(y) inicial/final da raquete:');
        console.log('inicio:', posicao_y_inicialDaRaquete, 'fim:', posicao_y_finalDaRaquete);
        
        console.log('Posição horizontal(x) inicial/final da bola:');
        console.log('inicio:', posicao_x_inicialDaBola, 'fim:', posicao_x_finalDaBola);
        console.log('Posição vertical(y) inicial/final da bola:');
        console.log('inicio:', posicao_y_inicialDaBola, 'fim:', posicao_y_finalDaBola);
    }
}
depuracao();
