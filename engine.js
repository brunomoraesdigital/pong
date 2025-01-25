function obterDimensoesRaquete() {
  const elementoRaquete = document.getElementById('raquete');
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
  const elementoBola = document.getElementById('bola');
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
  const elementoTabuleiro = document.getElementById('tabuleiro');
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
  let primeiraExecucao = true;
  let contResize = 0;
  
  function quandoTelaAtualizar() {
    
    // Não fazer nada na primeira execução
    if (primeiraExecucao) {
      primeiraExecucao = false;
      return;
    }
    contResize++;
    console.log('A tela foi redimensionada '+ contResize + 'x');
    const { larguraTela, alturaTela } = obterDimensoesTela();
    atualizaTamanhoDaFonte(alturaTela);
 
  }


let debounce;
window.addEventListener('resize', function() {
  clearTimeout(debounce);
  debounce = setTimeout( function () {
    quandoTelaAtualizar();
  }, 200);
});

// Chamadas das funções
const dimensoesRaquete = obterDimensoesRaquete();
const dimensoesBola = obterDimensoesBola();
const dimensoesTabuleiro = obterDimensoesTabuleiro();
const dimensoesTela = obterDimensoesTela();
atualizaTamanhoDaFonte(dimensoesTela.alturaTela);