function obterDimensoesDaTela() {
    let largura = window.innerWidth;
    let altura = window.innerHeight;

    console.log(
        'Dimensões da Tela\n' +
        '\tLargura:\t' + largura +
        '\n\tAltura:\t\t' + altura

    )
    return { largura, altura };
}


const ALTURA_REFERENCIA = 914;
const FONT_REFERENCIA = 16;
function atualizarTamanhoDaFonte(altura) {
    let tamanhoDaFonte = Math.floor((FONT_REFERENCIA * altura) / ALTURA_REFERENCIA);
    document.documentElement.style.setProperty('--font-size', tamanhoDaFonte + 'px');

    console.log('Fonte: ' + tamanhoDaFonte);
}


function carregarLayout() {
    // Destructuring para pegar a altura
    const { altura } = obterDimensoesDaTela();
    atualizarTamanhoDaFonte(altura);
}

document.addEventListener('DOMContentLoaded', function () {
    carregarLayout();  // Garante que o layout seja ajustado no carregamento
});

let debounce;
function aoRedimensionar() {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
        carregarLayout(); 
    }, 16); 
}
window.addEventListener('resize', aoRedimensionar);

/* ************* */

const elementoTabuleiro = document.getElementById('tabuleiro');
const elementoRaquete = document.getElementById('raquete');
const elementoBola = document.getElementById('bola');

function obterDimensoesDosElementos(elemento) {
    return {
        largura: elemento.offsetWidth,
        altura: elemento.offsetHeight
    };
}
const dimensoesTabuleiro = obterDimensoesDosElementos(elementoTabuleiro);
const dimensoesRaquete = obterDimensoesDosElementos(elementoRaquete);
const dimensoesBola = obterDimensoesDosElementos(elementoBola);

console.log(`Tabuleiro\n\tLargura: \t${dimensoesTabuleiro.largura}px \n\tAltura: \t${dimensoesTabuleiro.altura}px`);
console.log(`Raquete\n\tLargura: \t${dimensoesRaquete.largura}px \n\tAltura: \t${dimensoesRaquete.altura}px`);
console.log(`Bola\n\tLargura: \t${dimensoesBola.largura}px \n\tAltura: \t${dimensoesBola.altura}px`);


function iniciar_jogo() {
    controlarBotao();
}

function controlarBotao() {
    const elementoBotao = document.getElementById('botao');
    elementoBotao.style.display = 'none';

}