/* ******************************
 * AJUSTE DINÂMICO DE FONTES  *
 ****************************** */

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
const temporizadorEl = document.getElementById('temporizador');
const nivelEl = document.getElementById('nomeNivel');

/**************************************************************
 * Obter as dimensões dos elementos tabuleiro, raquete e bola *
 **************************************************************/

let larguraTabuleiro = tabuleiro.offsetWidth;
let alturaTabuleiro = tabuleiro.offsetHeight;

const larguraRaquete = raquete.offsetWidth;
const alturaRaquete = raquete.offsetHeight;

const tamanhoBola = bola.offsetWidth;


/************************************
 * Variáveis                        *
 ************************************/
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

/************************************
 * CONTROLE DO JOGO                 *
 ************************************/

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
    botao.style.display = 'none';
    jogoEmExecucao = true;
    // Iniciar o loop
    idFrameAnimacao = requestAnimationFrame(loopDoJogo);
}


function loopDoJogo() {
    if (!jogoEmExecucao) {
        return;
    }
    posicaoBolaX += velocidadeBolaX;
    posicaoBolaY += velocidadeBolaY;

    if (posicaoBolaX <= 0) {
        posicaoBolaX = 0;
        velocidadeBolaX = -velocidadeBolaX;
        //colisão da bola na parede esquerda
    } else if (posicaoBolaX + tamanhoBola >= larguraTabuleiro) {
        posicaoBolaX = larguraTabuleiro - tamanhoBola;
        velocidadeBolaX = -velocidadeBolaX;
        //colisão da bola na parede direita
    }

    if (posicaoBolaY + tamanhoBola >= alturaTabuleiro) {
        posicaoBolaY = alturaTabuleiro - tamanhoBola;
        velocidadeBolaY = -velocidadeBolaY;
        //colisão da bola na parede do topo
    }

    if (posicaoBolaY <= alturaRaquete) {
        if (
            posicaoBolaX + tamanhoBola >= posicaoRaqueteX &&
            posicaoBolaX <= posicaoRaqueteX + larguraRaquete
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
            }


        }
    }

    if (posicaoBolaY < 0) {
        jogoEmExecucao = false;
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
        iniciarContagemRegressiva()
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


/************************************
 * MOVIMENTAÇÃO DA RAQUETE          *
 ************************************/

tabuleiro.addEventListener('touchmove',
    function (evento) {
        evento.preventDefault();
        const toque = evento.touches[0];
        const retangulo = tabuleiro.getBoundingClientRect();
        const posicaoToqueX = toque.clientX - retangulo.left;
        posicaoRaqueteX = posicaoToqueX - larguraRaquete / 2;
        if (posicaoRaqueteX < 0) {
            posicaoRaqueteX = 0;
        }
        if (posicaoRaqueteX > larguraTabuleiro - larguraRaquete) {
            posicaoRaqueteX = larguraTabuleiro - larguraRaquete;
        }
        raquete.style.left = posicaoRaqueteX + 'px';
        if (contadorRegressivoAtivo) {
            posicaoBolaX = posicaoRaqueteX + (larguraRaquete - tamanhoBola) / 2;
            posicaoBolaY = alturaRaquete + 10;
            atualizarPosicoes();
        }    
    }
)

window.addEventListener('resize', function () {
    larguraTabuleiro = tabuleiro.offsetWidth;
    alturaTabuleiro = tabuleiro.offsetHeight;
});


/************************************
 * ATUALIZAÇÃO DE EXIBIÇÃO          *
 ************************************/

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
            console.log('Elemento ' + i + ' ativo:', vidasSpans[i]); // Debug: elemento ativo
        } else {
            vidasSpans[i].classList.add('vidaPerdida');
            console.log('Elemento ' + i + ' perdido:', vidasSpans[i]); // Debug: elemento com vida perdida
        }
    }
}

function atualizarExibicaoNivel() {
    const nivelTexto = 'nivel-' + (nivel < 10 ? '0' + nivel : nivel);
    nivelEl.textContent = nivelTexto;
}


/************************************
 * MELHORIAS E EVENTOS               *
 ************************************/
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
            reiniciarRodada();
        }
    }, 1000);
}

function fimDeJogo() {
    jogoEmExecucao = false;
    cancelAnimationFrame(idFrameAnimacao);
    botao.style.display = 'block';
    alert('Fim de jogo! Sua pontuação: ' + pontuacao);
}


/************************************
 * GERENCIAMENTO DE SONS            *
 ************************************/
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
