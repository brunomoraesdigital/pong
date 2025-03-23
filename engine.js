let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let tamanhoPixel = 3;

let magoParado = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0]
];

let magoAtacando = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]
];

let magoAndando1 = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]

];

let magoAndando2 = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0]
]

// Definindo o objeto mago
let mago = {
  parado: {
    nome: "parado",
    matriz: magoParado
  },
  atacando: {
    nome: "atacando",
    matriz: magoAtacando
  },
  andando1: {
    nome: "andando1",
    matriz: magoAndando1
  },
  andando2: {
    nome: "andando2",
    matriz: magoAndando2
  },

  // Função para desenhar o mago em ação no canvas
  desenhar: function (acao, posX, posY) {
    let acaoEscolhida = this[acao];  // Pega a matriz da ação escolhida
    if (acaoEscolhida) {
      for (let i = 0; i < acaoEscolhida.matriz.length; i++) {
        for (let j = 0; j < acaoEscolhida.matriz[i].length; j++) {
          if (acaoEscolhida.matriz[i][j] === 1) {  // Verifica se é parte da "imagem"
            ctx.fillStyle = "white";  // Pode mudar a cor ou o estilo conforme necessário
            ctx.fillRect((posX * 10) + j * tamanhoPixel, (posY * 10) + i * tamanhoPixel, tamanhoPixel, tamanhoPixel);
          }
        }
      }
    }
  }
};

// Função para desenhar o mago em qualquer posição com um único objeto
function desenharMago(acao, posicao) {
  let { x, y } = posicao; // Desestruturando o objeto para obter x e y
  mago.desenhar(acao, x, y); // Usando a função de desenhar com a nova posição
}

// chamando a função desenharMago
desenharMago("parado", { x: 1, y: 1 });
desenharMago("andando1", { x: 1, y: 19 });
desenharMago("andando2", { x: 16, y: 19 });

let posX = -5; // Posição inicial do mago no eixo X
let posY = 1; // Posição inicial no eixo Y
let velocidade = 2.5; // Quantidade de pixels que ele se move por frame
let passo = 1; // Alterna entre os sprites

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Desenha o mago na nova posição
    if (passo === 1) {
        desenharMago("andando1", { x: posX, y: posY });
        passo = 2;
    } else if (passo === 2) {
        desenharMago("parado", { x: posX, y: posY });
        passo = 3;
    } else {
        desenharMago("andando2", { x: posX, y: posY });
        passo = 1;
    }

    // Move o mago para a direita
    posX += velocidade;

    if (posX * tamanhoPixel > 80) {
        posX = -5; // Volta para o começo
    }

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 200);  // Altera o sprite a cada 200ms
}

(function() {
    var loader = document.getElementById("loader");
    if (loader) {
      loader.style.display = "flex";
    }

    loop();
  
    var dots = document.getElementById("dots");
  
    function updateDots() {
      if (dots.textContent.length >= 3) {
        dots.textContent = "";
      } else {
        dots.textContent += ".";
      }
    }
    
    var intervalId = setInterval(updateDots, 333);
  
    // Registra o tempo de início
    var startTime = new Date().getTime();
    var minDuration = 3000; // 3 segundos
  
    window.addEventListener("load", function() {
      var elapsed = new Date().getTime() - startTime;
      var remaining = minDuration - elapsed;
      if (remaining < 0) {
        remaining = 0;
      }
      
      setTimeout(function() {
        clearInterval(intervalId);
        if (loader) {
          loader.style.display = "none";
        }
      }, remaining);
    });
  })();
  
  

/* ****************************
 * AJUSTE DINÂMICO DE FONTES  *
 **************************** */

function obterDimensoesDaTela() {
    return {
        largura: window.innerWidth,
        altura: window.innerHeight
    }
}

const ALTURA_REFERENCIA = 914;
const FONTE_REFERENCIA = 16;

function atualizarTamanhoDaFonte(alturaTela) {
    let tamanhoDaFonte = Math.floor((FONTE_REFERENCIA * alturaTela) / ALTURA_REFERENCIA);
    document.documentElement.style.setProperty('--tamanho-da-fonte', tamanhoDaFonte + 'px');
}

function aoRedimensionar() {
    let dimensoes = obterDimensoesDaTela();
    atualizarTamanhoDaFonte(dimensoes.altura);
}

function debounce(funcao, tempo) {
    let tempoEspera;
    return function () {
        clearTimeout(tempoEspera);
        tempoEspera = setTimeout(funcao, tempo);
    };
}

window.addEventListener('resize', debounce(aoRedimensionar, 100));

(function inicializar() {
    aoRedimensionar();
})();

/*************************************
 * Selecionar Elementos da Interface *
 *************************************/

const tabuleiro = document.getElementById('tabuleiro');
const raquete = document.getElementById('raquete');
const bola = document.getElementById('bola');
const botao = document.getElementById('botao');

const contadorPontos = document.getElementById('contadorPontos');
const contadorRecorde = document.getElementById('contadorRecorde');
const vidasEl = document.getElementById('vidas');
const nivelEl = document.getElementById('nomeNivel');
const temporizadorEl = document.getElementById('temporizador');
const mensagemFimDoJogoEl = document.getElementById('mensagemFimDoJogo');
const dicaEl = document.getElementById('dica');

/**************************************************************
 * Obter as dimensões dos elementos tabuleiro, raquete e bola *
 **************************************************************/

let larguraTabuleiro = tabuleiro.offsetWidth;
let alturaTabuleiro = tabuleiro.offsetHeight;

const larguraRaquete = raquete.offsetWidth;
const alturaRaquete = raquete.offsetHeight;

const tamanhoBola = bola.offsetWidth;


/*************
 * Variáveis *
 *************/
let posicaoRaqueteX;
let posicaoBolaX, posicaoBolaY;
let velocidadeBolaX, velocidadeBolaY;

let idFrameAnimacao
let jogoEmExecucao = false;

let pontuacao = 0;
let pontuacaoRecorde = 0;

let vidas = 5;
let ultimoPontoAumentoVida = 0;

let nivel = 1;
let ultimoPontoAumentoVelocidade = 0;

let contadorRegressivoAtivo = false;

let inicioDaPartida = false;

/********************
 * CONTROLE DO JOGO *
 ********************/

(function ajustar() {
    definirPosicoes();
    atualizarPosicoes();
})();

function iniciar_jogo() {

    // variáveis

    velocidadeBolaX = 3;
    velocidadeBolaY = 3;

    pontuacao = 0;
    pontuacaoRecorde = parseInt(localStorage.getItem('pongHighScore')) || 0;

    vidas = 5;
    ultimoPontoAumentoVida = 0;

    nivel = 1;
    ultimoPontoAumentoVelocidade = 0;

    larguraTabuleiro = tabuleiro.offsetWidth;
    alturaTabuleiro = tabuleiro.offsetHeight;

    // funções
    definirPosicoes();
    atualizarPosicoes();
    atualizarExibicaoPontuacao();
    atualizarExibicaoRecorde();
    atualizarExibicaoVidas();
    atualizarExibicaoNivel();

    // diversos
    dicaEl.style.display = 'none';
    botao.style.display = 'none';
    jogoEmExecucao = true;
    // Iniciar o loop
    //idFrameAnimacao = requestAnimationFrame(loopDoJogo);
    inicioDaPartida = true;
    iniciarContagemRegressiva();
}


function loopDoJogo() {
    if (!jogoEmExecucao) {
        return;
    }
    atualizarRaquete();
    posicaoBolaX += velocidadeBolaX;
    posicaoBolaY += velocidadeBolaY;

    if (posicaoBolaX <= 0) {
        posicaoBolaX = 0;
        velocidadeBolaX = -velocidadeBolaX;
        tocarSom('parede');
        //colisão da bola na parede esquerda
    } else if (posicaoBolaX + tamanhoBola >= larguraTabuleiro) {
        posicaoBolaX = larguraTabuleiro - tamanhoBola;
        velocidadeBolaX = -velocidadeBolaX;
        tocarSom('parede');
        //colisão da bola na parede direita
    }

    if (posicaoBolaY + tamanhoBola >= alturaTabuleiro) {
        posicaoBolaY = alturaTabuleiro - tamanhoBola;
        velocidadeBolaY = -velocidadeBolaY;
        tocarSom('parede');
        //colisão da bola na parede do topo
    }

    if (posicaoBolaY <= alturaRaquete) {
        if (
            /*
            posicaoBolaX + tamanhoBola >= posicaoRaqueteX &&
            posicaoBolaX <= posicaoRaqueteX + larguraRaquete
            */
            posicaoBolaX + tamanhoBola >= posicaoRaqueteX -5 &&
            posicaoBolaX <= posicaoRaqueteX + larguraRaquete +5
        ) {
            const pontoDeImpacto = (posicaoBolaX + tamanhoBola / 2) - (posicaoRaqueteX + larguraRaquete / 2);
            let impactoNormalizado = pontoDeImpacto / (larguraRaquete / 2);
            const anguloRebatida = impactoNormalizado * (Math.PI / 4);
            const velocidadeAtual = Math.sqrt(velocidadeBolaX * velocidadeBolaX + velocidadeBolaY * velocidadeBolaY);
            velocidadeBolaX = velocidadeAtual * Math.sin(anguloRebatida);
            velocidadeBolaY = velocidadeAtual * Math.cos(anguloRebatida);
            if (velocidadeBolaY < 0) {
                velocidadeBolaY = -velocidadeBolaY;
            }
            tocarSom('raquete');
            //colisão da bola na raquete

            pontuacao += 10;
            atualizarExibicaoPontuacao();

            if (pontuacao > pontuacaoRecorde) {
                pontuacaoRecorde = pontuacao;
                localStorage.setItem('pongHighScore', pontuacaoRecorde);
                atualizarExibicaoRecorde();
            }

            while (pontuacao - ultimoPontoAumentoVida >= 1000) {
                if (vidas < 5) {
                    vidas++;
                    atualizarExibicaoVidas();
                    tocarSom('extraVida');
                } else {
                    break;
                }
                ultimoPontoAumentoVida += 1000;
            }

            while (pontuacao - ultimoPontoAumentoVelocidade >= 100) {
                aumentarVelocidadeBola();
                ultimoPontoAumentoVelocidade += 100;
                nivel++;
                atualizarExibicaoNivel();
                tocarSom('levelUp');
            }


        }
    }

    if (posicaoBolaY < 0) {
        jogoEmExecucao = false;
        tocarSom('base');
        //colisão da bola na base
        posicaoBolaX = posicaoRaqueteX + (larguraRaquete - tamanhoBola) / 2;
        posicaoBolaY = alturaRaquete + 10;
        atualizarPosicoes();
        vidas--;
        atualizarExibicaoVidas();
        if (vidas <= 0) {
            fimDeJogo();
            return;
        }
        iniciarContagemRegressiva();
        return; //Interrompe a execução da função
    }

    atualizarPosicoes();
    // Continua o loop
    idFrameAnimacao = requestAnimationFrame(loopDoJogo);
}

/************************************
 *                *
 ************************************/

function definirPosicoes() {
    posicaoRaqueteX = (larguraTabuleiro - larguraRaquete) / 2;
    posicaoBolaX = posicaoRaqueteX + (larguraRaquete - tamanhoBola) / 2;
    posicaoBolaY = alturaRaquete + 10;
}


/**************************************
 * MOVIMENTAÇÃO DA RAQUETE COM O DEDO *
 **************************************/

window.addEventListener('touchmove',
    function (evento) {
        evento.preventDefault();
        if (!jogoEmExecucao) return;
        if (inicioDaPartida) return;
        const toque = evento.touches[0];
        const retangulo = tabuleiro.getBoundingClientRect();
        const posicaoToqueX = toque.clientX - retangulo.left;
        posicaoRaqueteX = posicaoToqueX - larguraRaquete / 2;
        //if (jogoEmExecucao) {
        if (posicaoRaqueteX < 0) {
            posicaoRaqueteX = 0;
        }
        if (posicaoRaqueteX > larguraTabuleiro - larguraRaquete) {
            posicaoRaqueteX = larguraTabuleiro - larguraRaquete;
        }
        raquete.style.left = posicaoRaqueteX + 'px';
        //}
    }, { passive: false }
)

/***************************************
 * MOVIMENTAÇÃO DA RAQUETE COM O MOUSE * 
 ***************************************/

window.addEventListener('mousemove',
    function (evento) {
        evento.preventDefault();
        if (!jogoEmExecucao) return;
        if (inicioDaPartida) return;
        const retangulo/*rect*/ = tabuleiro.getBoundingClientRect();
        const posicaoX/*mouseX*/ = evento.clientX - retangulo.left;
        posicaoRaqueteX = posicaoX - (larguraRaquete / 2);

        //if (jogoEmExecucao) {
        if (posicaoRaqueteX < 0) {
            posicaoRaqueteX = 0;
        }
        if (posicaoRaqueteX > larguraTabuleiro - larguraRaquete) {
            posicaoRaqueteX = larguraTabuleiro - larguraRaquete;
        }
        raquete.style.left = posicaoRaqueteX + 'px';
        //}
    }, { passive: false }
);

/***************************************
 * MOVIMENTAÇÃO DA RAQUETE COM TECLADO *
 ***************************************/
const teclas = {
    ArrowLeft: false,
    ArrowRight: false
};

window.addEventListener('keydown', (evento) => {
    if (['ArrowLeft', 'ArrowRight'].includes(evento.key)) {
        evento.preventDefault();
        teclas[evento.key] = true;
    }
});

window.addEventListener('keyup', (evento) => {
    if (['ArrowLeft', 'ArrowRight'].includes(evento.key)) {
        evento.preventDefault();
        teclas[evento.key] = false;
    }
});

function atualizarRaquete() {
    const velocidade = 7; // Aumente este valor para mais velocidade
    if (teclas.ArrowLeft) {
        posicaoRaqueteX = Math.max(0, posicaoRaqueteX - velocidade);
    }
    if (teclas.ArrowRight) {
        posicaoRaqueteX = Math.min(larguraTabuleiro - larguraRaquete, posicaoRaqueteX + velocidade);
    }
    raquete.style.left = posicaoRaqueteX + 'px';
}


window.addEventListener('resize', function () {
    larguraTabuleiro = tabuleiro.offsetWidth;
    alturaTabuleiro = tabuleiro.offsetHeight;
});


/***************************
 * ATUALIZAÇÃO DE EXIBIÇÃO *
 ***************************/

function atualizarPosicoes() {
    raquete.style.left = posicaoRaqueteX + 'px';
    bola.style.left = posicaoBolaX + 'px';
    bola.style.bottom = posicaoBolaY + 'px';
}

function atualizarExibicaoPontuacao() {
    contadorPontos.textContent = pontuacao.toString().padStart(6, '0');
}

function atualizarExibicaoRecorde() {
    contadorRecorde.textContent = pontuacaoRecorde.toString().padStart(6, '0');
}

function atualizarExibicaoVidas() {
    const vidasSpans = vidasEl.querySelectorAll('span');
    let i;
    for (i = 0; i < vidasSpans.length; i++) {
        if (i < vidas) {
            vidasSpans[i].classList.remove('vidaPerdida');
        } else {
            vidasSpans[i].classList.add('vidaPerdida');
        }
    }
}

function atualizarExibicaoNivel() {
    const nivelTexto = 'nivel-' + (nivel < 10 ? '0' + nivel : nivel);
    nivelEl.textContent = nivelTexto;
}


/***********************
 * MELHORIAS E EVENTOS *
 ***********************/
function aumentarVelocidadeBola() {
    const sinalX = velocidadeBolaX >= 0 ? 1 : -1;
    const sinalY = velocidadeBolaY >= 0 ? 1 : -1;
    velocidadeBolaX = sinalX * (Math.abs(velocidadeBolaX) + 0.5);
    velocidadeBolaY = sinalY * (Math.abs(velocidadeBolaY) + 0.5);
}

function reiniciarRodada() {
    posicaoRaqueteX = (larguraTabuleiro - larguraRaquete) / 2;
    raquete.style.left = posicaoRaqueteX + 'px';
    posicaoBolaX = posicaoRaqueteX + (larguraRaquete - tamanhoBola) / 2;
    posicaoBolaY = alturaRaquete + 10;
    velocidadeBolaY = -velocidadeBolaY;
    atualizarPosicoes();
    jogoEmExecucao = true;
    idFrameAnimacao = requestAnimationFrame(loopDoJogo);
}

function iniciarContagemRegressiva() {

    definirPosicoes();
    atualizarPosicoes();

    contadorRegressivoAtivo = true;
    let contagem = 3;
    temporizadorEl.style.display = 'block';
    temporizadorEl.textContent = contagem;
    const intervaloId = setInterval(function () {
        contagem--;
        if (contagem > 0) {
            temporizadorEl.textContent = contagem;
        } else {
            clearInterval(intervaloId);
            temporizadorEl.style.display = 'none';
            contadorRegressivoAtivo = false;
            if (inicioDaPartida) {
                inicioDaPartida = false;
                idFrameAnimacao = requestAnimationFrame(loopDoJogo);
            } else {
            reiniciarRodada();
            }
        }
    }, 1000);
}

function fimDeJogo() {

    definirPosicoes();
    atualizarPosicoes();

    jogoEmExecucao = false;
    cancelAnimationFrame(idFrameAnimacao);
    let contagemParaReinicio = 3;
    mensagemFimDoJogoEl.style.display = 'block';
    mensagemFimDoJogoEl.textContent = 'Fim do Jogo!';
    tocarSom('gameOver');

    const intervaloFimDoJogo = setInterval(function () {
        contagemParaReinicio--;
        if (contagemParaReinicio <= 0) {
            botao.style.display = 'block';
            clearInterval(intervaloFimDoJogo);
            mensagemFimDoJogoEl.style.display = 'none';
            dicaEl.style.display = 'block';
        }
    }, 1000);

}


/*************************
 * GERENCIAMENTO DE SONS *
 *************************/
const contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
const buffersAudio = {};

function carregarSom(nome, url) {
    const requisicao = new XMLHttpRequest();
    requisicao.open('GET', url, true);
    requisicao.responseType = 'arraybuffer';
    requisicao.onload = function () {
        contextoAudio.decodeAudioData(requisicao.response, function (buffer) {
            buffersAudio[nome] = buffer;
        }, function (erro) {
            console.error('Erro ao decodificar áudio: ' + nome, erro);
        });
    };
    requisicao.send();
}

function tocarSom(nome) {
    if (!buffersAudio[nome]) {
        return;
    }
    const fonteAudio = contextoAudio.createBufferSource();
    fonteAudio.buffer = buffersAudio[nome];
    fonteAudio.connect(contextoAudio.destination);
    fonteAudio.start(0);
}

carregarSom("raquete", "./recursos/somRaquete.mp3");
carregarSom("parede", "./recursos/somParede.mp3");
carregarSom("base", "./recursos/somBase.mp3");
carregarSom("extraVida", "./recursos/somExtraVida.mp3");
carregarSom("levelUp", "./recursos/somLevelUp.mp3");
carregarSom("gameOver", "./recursos/somGameOver.mp3");

/*************************
 * GERENCIAMENTO DE SONS *
 *************************/
// Seleciona o elemento onde o ano será exibido
const anoAtualElement = document.getElementById("ano-atual");

// Obtém o ano atual
const anoAtual = new Date().getFullYear();

// Atualiza o conteúdo do elemento com o ano atual
anoAtualElement.innerHTML = `<a href="https://bmfolio.web.app/" target="_blank" rel="noopener noreferrer">
    © ${anoAtual} Bruno Moraes - Evoluindo a cada código
</a> | Licença AGPL v3`;
/*********************************/


/* ********************************************* */
