const elementoRaquete = document.getElementById('raquete');
const elementoBola = document.getElementById('bola');
const elementoTabuleiro = document.getElementById('tabuleiro');

const ALTURA_REFERENCIA = 766;

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
  let largura = window.innerWidth;
  let alturaTela = window.innerHeight;
  console.log(
    'Tela:\n' +
    '\tLargura: ' + largura + 'px\n' +
    '\tAltura: ' + alturaTela + 'px'
  );
  return { largura, alturaTela };
}

function atualizaTamanhoDaFonte(alturaTela) {
  let tamanhoDaFonte = Math.floor((16 * alturaTela) / ALTURA_REFERENCIA);
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

  const { largura, alturaTela } = obterDimensoesTela();
  atualizaTamanhoDaFonte(alturaTela);

  const dimensoesBola = obterDimensoesBola();
  const dimensoesRaquete = obterDimensoesRaquete();
  const dimensoesTabuleiro = obterDimensoesTabuleiro();

  posicionarBola(dimensoesBola, dimensoesTabuleiro, dimensoesRaquete);
  posicionarRaquete(dimensoesRaquete, dimensoesTabuleiro);

  velocidadeBolinhaX = posicionarBola.posicaoBolaHorizontal;
  velocidadeBolinhaY = posicionarBola.posicaoBolaVertical;

  animarBolinha();
}

let debounce;
window.addEventListener('resize', function() {
  clearTimeout(debounce);
  debounce = setTimeout(function() {
    quandoTelaAtualizar();
  }, 200);
});

// Chamadas das funções
/*const dimensoesRaquete = obterDimensoesRaquete();
const dimensoesBola = obterDimensoesBola();
const dimensoesTabuleiro = obterDimensoesTabuleiro();
const dimensoesTela = obterDimensoesTela();
*/

function posicionarBola(dimensoesBola, dimensoesTabuleiro, dimensoesRaquete) {
  let posicaoBolaHorizontal = Math.floor((dimensoesTabuleiro.largura / 2) - (dimensoesBola.largura / 2));
  let posicaoBolaVertical = Math.floor((dimensoesTabuleiro.altura - dimensoesRaquete) - (dimensoesBola.altura / 2));
  elementoBola.style.left = posicaoBolaHorizontal + 'px';
  elementoBola.style.top = posicaoBolaVertical + 'px';
  console.log('Bola posicionada horizontalmente em: ' + posicaoBolaHorizontal + 'px\n' +
    'Bola posicionada verticalmente em: ' + posicaoBolaVertical + 'px');

  return { posicaoBolaHorizontal, posicaoBolaVertical }
}

function posicionarRaquete(dimensoesRaquete, dimensoesTabuleiro) {
  let posicaoRaqueteHorizontal = Math.floor((dimensoesTabuleiro.largura / 2) - (dimensoesRaquete.largura / 2));
  elementoRaquete.style.left = posicaoRaqueteHorizontal + 'px';

  console.log('Raquete posicionada horizontalmente em: ' + posicaoRaqueteHorizontal + 'px');
}

let velocidadeBolinhaX;
let velocidadebolinhaY;

function animarBolinha() {

  velocidadeBolinhaX += 2;
  velocidadeBolinhaY += 2;

  elementoBola.style.left = velocidadeBolinhaX + 'px';
  elementoBola.style.top = velocidadeBolinhaY + 'px';
}
const intervalo = setInterval(animarBolinha, 16);

quandoTelaAtualizar(); // Executa a lógica uma vez no carregamento inicial