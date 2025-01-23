function pegaAltLargDaTela () {
  let larguraTela = window.innerWidth;
  let alturaTela = window.innerHeight;
  console.log('Largura da tela:\t', larguraTela + '\nAltura da tela:\t', alturaTela);
  return {larguraTela, alturaTela};
}



function atualizaTamanhoDaFonte() {
  const {larguraTela, alturaTela} = pegaAltLargDaTela ();
  let tamanhoDaFonte = Math.floor((16 * alturaTela) / 766)
  document.documentElement.style.setProperty('--font-size', tamanhoDaFonte + 'px');
  console.log(tamanhoDaFonte);
}


function quandoTelaAtualizar() {
  console.log('A tela atualizou');
  atualizaTamanhoDaFonte();
}

window.addEventListener('resize', quandoTelaAtualizar);