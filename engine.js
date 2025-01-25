const elementoRaquete = document.getElementById('raquete');
const elementoBola = document.getElementById('bola');
const elementoTabuleiro = document.getElementById('tabuleiro');

function obterDimensoesRaquete() {
  const largura = elementoRaquete.offsetWidth;
  const altura = elementoRaquete.offsetHeight;
  console.log(
    'Raquete:\n' +
    '\tLargura: ' + largura + 'px\n' +
    '\tAltura: ' + altura + 'px'
  );
  return { largura, altura };
}

function obterDimensoesBola() {
  const largura = elementoBola.offsetWidth;
  const altura = elementoBola.offsetHeight;
  console.log(
    'Bola:\n' +
    '\tLargura: ' + largura + 'px\n' +
    '\tAltura: ' + altura + 'px'
  );
  return { largura, altura };
}

function obterDimensoesTabuleiro() {
  const largura = elementoTabuleiro.offsetWidth;
  const altura = elementoTabuleiro.offsetHeight;
  console.log(
    'Tabuleiro:\n' +
    '\tLargura: ' + largura + 'px\n' +
    '\tAltura: ' + altura + 'px'
  );
  return { largura, altura };
}

function obterDimensoesTela() {
  let larguraTela = window.innerWidth;
  let alturaTela = window.innerHeight;
  console.log(
    'Tela:\n' +
    '\tLargura: ' + larguraTela + 'px\n' +
    '\tAltura: ' + alturaTela + 'px'
  );
  return { larguraTela, alturaTela };
}

function atualizaTamanhoDaFonte(alturaTela) {
  let tamanhoDaFonte = Math.floor((16 * alturaTela) / 766);
  document.documentElement.style.setProperty('--font-size', tamanhoDaFonte + 'px');
  console.log('Tamanho da fonte: ' + tamanhoDaFonte + 'px');
}
/*let primeiroCarregamento = true;*/
let contResize = 0;

function quandoTelaAtualizar() {
  // Não fazer nada na primeira execução
  /*if (primeiroCarregamento) {
    primeiroCarregamento = false;
    return;
  }*/
  contResize++;
  console.log('A tela foi redimensionada ' + contResize + 'x');

  const { larguraTela, alturaTela } = obterDimensoesTela();
  atualizaTamanhoDaFonte(alturaTela);

  const dimensoesBola = obterDimensoesBola();
  const dimensoesRaquete = obterDimensoesRaquete();
  const dimensoesTabuleiro = obterDimensoesTabuleiro();

  posicionarBola(dimensoesBola, dimensoesTabuleiro);
  posicionarRaquete(dimensoesRaquete, dimensoesTabuleiro);

}

let debounce;
window.addEventListener('resize', function() {
  clearTimeout(debounce);
  debounce = setTimeout(function() {
    quandoTelaAtualizar();
  }, 200);
});

// Chamadas das funções
const dimensoesRaquete = obterDimensoesRaquete();
const dimensoesBola = obterDimensoesBola();
const dimensoesTabuleiro = obterDimensoesTabuleiro();
const dimensoesTela = obterDimensoesTela();


function posicionarBola(dimensoesBola, dimensoesTabuleiro) {
  let posicaoBolaHorizontal = Math.floor((dimensoesTabuleiro.largura / 2) - (dimensoesBola.largura / 2));
  let posicaoBolaVertical = Math.floor((dimensoesTabuleiro.altura / 2) - (dimensoesBola.altura / 2));
  elementoBola.style.left = posicaoBolaHorizontal + 'px';
  elementoBola.style.top = posicaoBolaVertical + 'px';
  console.log('Bola posicionada horizontalmente em: ' + posicaoBolaHorizontal + 'px\n' +
    'Bola posicionada verticalmente em: ' + posicaoBolaVertical + 'px');
}

function posicionarRaquete(dimensoesRaquete, dimensoesTabuleiro) {
  let posicaoRaqueteHorizontal = Math.floor((dimensoesTabuleiro.largura / 2) - (dimensoesRaquete.largura / 2));
  elementoRaquete.style.left = posicaoRaqueteHorizontal + 'px';

  console.log('Raquete posicionada horizontalmente em: ' + posicaoRaqueteHorizontal + 'px');


}