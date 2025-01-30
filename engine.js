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

function posicionarElementos() {
    const { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola } = dimensoesDosElementos();

    let posicionarRaquete = (dimensoesTabuleiro.largura/2) - (dimensoesRaquete.largura/2);
    let posicionarBola = (dimensoesTabuleiro.largura/2) - (dimensoesBola.largura/2);

    elementoRaquete.style.left = posicionarRaquete + 'px';
    elementoBola.style.left = posicionarBola + 'px';


}


function obterPosicaoInicialDaBola() {

    let posBolaEsq = elementoBola.offsetLeft;
    let posBolaTop = elementoBola.offsetTop;

    return { posBolaEsq, posBolaTop };

}

function obterPosicaoInicialDaRaquete() {

    let posRaqueteEsq = elementoRaquete.offsetLeft;
    let posRaqueteTop = elementoRaquete.offsetTop;

    return { posRaqueteEsq, posRaqueteTop };

}

let velocidadeBolaY = -2;
let velocidadeBolaX = -2;
let entrou = false;
function controlarCenario() {

    const posicaoDaBola = obterPosicaoInicialDaBola();
    const posicaoDaRaquete = obterPosicaoInicialDaRaquete();
    const limiteDoTabuleiro = estabelecerLimitesDosTabuleiro();
    const { dimensoesBola, dimensoesRaquete } = dimensoesDosElementos();

    let posicaoBolaY = posicaoDaBola.posBolaTop + velocidadeBolaY;
    let posicaoBolaX = posicaoDaBola.posBolaEsq + velocidadeBolaX;
    let posicaoRaqueteY = posicaoDaRaquete.posRaqueteTop;
    let posicaoRaqueteX = posicaoDaRaquete.posRaqueteEsq;


    


    if (posicaoBolaY >= limiteDoTabuleiro.limiteTopo) {        
        elementoBola.style.top = posicaoBolaY + 'px';

    } else {
        velocidadeBolaY = -velocidadeBolaY; 
    }

    if (posicaoBolaX >= limiteDoTabuleiro.limiteEsquerdo && posicaoBolaX+dimensoesBola.largura <= limiteDoTabuleiro.limiteDireito) {
        elementoBola.style.left = posicaoBolaX + 'px';

    } else {
        velocidadeBolaX = -velocidadeBolaX; 
    }

    if (posicaoBolaY + dimensoesBola.altura >= limiteDoTabuleiro.limiteBase) {
        velocidadeBolaX = 0;
        velocidadeBolaY = 0;
        if (!entrou) {
            entrou = true;
            console.log('não colidiu com a raquete');
            console.log('Raquete: Esq ' + posicaoRaqueteX + ' bola ' + posicaoBolaX + '/' + (posicaoBolaX + dimensoesBola.largura) + ' ld dir ' + (posicaoRaqueteX + dimensoesRaquete.largura));
        }
    }

    if (posicaoBolaY + dimensoesBola.altura >= posicaoRaqueteY && 
        posicaoBolaX + dimensoesBola.largura >= posicaoRaqueteX &&
        posicaoBolaX <= posicaoRaqueteX + dimensoesRaquete.largura
    ) {
        console.log('colidiu com a raquete');
        velocidadeBolaY = -velocidadeBolaY; 
        console.log('Raquete: Esq ' + posicaoRaqueteX + ' bola ' + posicaoBolaX + '/' + (posicaoBolaX + dimensoesBola.largura) + ' ld dir ' + (posicaoRaqueteX + dimensoesRaquete.largura));
    }    
}
//controlarCenario();
setInterval(controlarCenario, 16);


function carregarLayout() {
    const { altura } = obterDimensoesDaTela();
    atualizarTamanhoDaFonte(altura);
    dimensoesDosElementos();
    posicionarElementos();

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

let DEBUG = false;
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

