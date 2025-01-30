function obterDimensoesDaTela() {
    let largura = window.innerWidth;
    let altura = window.innerHeight;

    return { largura, altura };
}

const ALTURA_REFERENCIA = 914;
const FONT_REFERENCIA = 16;
function atualizarTamanhoDaFonte(altura) {
    let tamanhoDaFonte = Math.floor((FONT_REFERENCIA * altura) / ALTURA_REFERENCIA);
    document.documentElement.style.setProperty('--font-size', tamanhoDaFonte + 'px');
}

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

    return { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola };
}
let contador = 0;
function estabelecerLimitesDosTabuleiro() {
    const { dimensoesTabuleiro } = dimensoesDosElementos();

    limiteEsquerdo = 0;
    limiteDireito = dimensoesTabuleiro.largura;
    limiteTopo = 0;
    limiteBase = dimensoesTabuleiro.altura;

    return { limiteEsquerdo, limiteDireito, limiteTopo, limiteBase };
}

function obterPosicaoInicialDaBola() {
    elementoBola.style.transform = 'translateX(0%)';

    let posicaoEsq = elementoBola.offsetLeft;
    let posicaoTop = elementoBola.offsetTop;

    console.log('posição esq da bola: ' + posicaoEsq);
    console.log('posição top da bola: ' + posicaoTop);

    contador++;
    console.log(contador);

    return { posicaoEsq, posicaoTop };

}


let velocidadeY = -2;
let velocidadeX = -2;

function animarBola() {

    const posicaoDaBola = obterPosicaoInicialDaBola();
    const limiteDoTabuleiro = estabelecerLimitesDosTabuleiro();
    const { dimensoesBola } = dimensoesDosElementos();

    let posicaoY = posicaoDaBola.posicaoTop + velocidadeY;
    let posicaoX = posicaoDaBola.posicaoEsq + velocidadeX;

    if (posicaoY >= limiteDoTabuleiro.limiteTopo) {        
        elementoBola.style.top = posicaoY + 'px';

    } else {
        velocidadeY = -velocidadeY; 
    }

    if (posicaoX >= limiteDoTabuleiro.limiteEsquerdo && posicaoX <= limiteDoTabuleiro.limiteDireito - dimensoesBola.largura) {
        elementoBola.style.left = posicaoX + 'px';

    } else {
        velocidadeX = -velocidadeX; 
    }

    if (posicaoY >= limiteDoTabuleiro.limiteBase - dimensoesBola.altura) {
        velocidadeX = 0;
        velocidadeY = 0;
    }

}

//animarBola();
setInterval(animarBola, 16);


function carregarLayout() {
    const { altura } = obterDimensoesDaTela();
    atualizarTamanhoDaFonte(altura);
    dimensoesDosElementos();

    depuracao();
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
        // 
        const { limiteEsquerdo, limiteDireito, limiteTopo, limiteBase } = estabelecerLimitesDosTabuleiro();

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
        // 
        console.log('Limites do Tabuleiro:');
        console.log('\tEsquerda:', limiteEsquerdo);
        console.log('\tDireita:', limiteDireito);
        console.log('\tTopo:', limiteTopo);
        console.log('\tBase:', limiteBase);
    }
}

