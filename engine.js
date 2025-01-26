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


function obterDimensoesDaTela() {
    let largura = window.innerWidth;
    let altura = window.innerHeight;

    console.log(
        'Tela:\n' +
        '\tLargura: \t' + largura + 'px\n' +
        '\tAltura: \t' + altura + 'px'
    )

    return { largura, altura };
}

const ALTURA_REFERENCIA = 766;
function atualizarTamanhoDaFonte(altura) {
    let tamanhoDaFonte = Math.floor((16 * altura) / ALTURA_REFERENCIA);
    document.documentElement.style.setProperty('--font-size', tamanhoDaFonte + 'px');

    console.log('Fonte: ' + tamanhoDaFonte);
}

function iniciar_jogo() {
    controlarBotao();
}

function controlarBotao() {
    const elementoBotao = document.getElementById('botao');
    elementoBotao.style.display = 'none';

}

let ultimaAltura = window.innerHeight;
function carregarLayout() {
    // Destructuring para pegar a altura
    const { altura } = obterDimensoesDaTela();
    // Verifica se a altura mudou antes de recalcular o layout
    if (altura !== ultimaAltura) {
        // Passar altura como argumento para a função atualizarTamanhoDaFonte
        atualizarTamanhoDaFonte(altura);
        ultimaAltura = altura; // Atualiza a última altura registrada
    }
}

document.addEventListener('DOMContentLoaded', function () {
    carregarLayout();  // Garante que o layout seja ajustado no carregamento
});

let debounce;
function aoRedimensionar() {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
        carregarLayout(); // Função que recalcula o layout
    }, 200); // Espera 200ms após o redimensionamento parar para chamar a função
}
window.addEventListener('resize', aoRedimensionar);
