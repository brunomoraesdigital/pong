/*******************************
 * AJUSTE DINÂMICO DE FONTES  *
 *******************************/
function obterDimensoesDaTela() {
    return {
        largura: window.innerWidth,
        altura: window.innerHeight
    };
}

var ALTURA_REFERENCIA = 914;
var FONTE_REFERENCIA = 16;

function atualizarTamanhoDaFonte(alturaTela) {
    var tamanhoDaFonte = Math.floor((FONTE_REFERENCIA * alturaTela) / ALTURA_REFERENCIA);
    document.documentElement.style.setProperty('--tamanho-da-fonte', tamanhoDaFonte + 'px');
    return tamanhoDaFonte;
}

function aoRedimensionar() {
    var dimensoes = obterDimensoesDaTela();
    var tamanhoFonte = atualizarTamanhoDaFonte(dimensoes.altura);
    atualizarDebug(dimensoes, tamanhoFonte);
}

function debounce(funcao, tempo) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(funcao, tempo);
    };
}

window.addEventListener('resize', debounce(aoRedimensionar, 100));

(function inicializar() {
    aoRedimensionar();
    // Se não utilizar a função de depuração, remova a chamada abaixo.
    // atualizarDebug(...);
})();

/********************
 * FUNÇÕES DEBUG  *
 ********************/
function criarPainelDebug() {
    var debugDiv = document.createElement('div');
    debugDiv.id = 'debug-painel';
    debugDiv.style.cssText = 'position: fixed; bottom: 10px; left: 10px; background: rgba(0,0,0,0.7); color: red; padding: 10px; border-radius: 5px; font-family: monospace; z-index: 9999; font-size: 0.8rem;';
    document.body.appendChild(debugDiv);
    return debugDiv;
}

function atualizarDebug(dimensoes, tamanhoFonteCalculado) {
    var debugDiv = document.getElementById('debug-painel') || criarPainelDebug();
    debugDiv.innerHTML = 'Depuração:<br>' +
        'Largura da Tela: ' + dimensoes.largura + 'px<br>' +
        'Altura da Tela: ' + dimensoes.altura + 'px<br>' +
        'Fonte Calculada: ' + tamanhoFonteCalculado + 'px<br>' +
        'Fonte CSS Atual: ' + getComputedStyle(document.documentElement).getPropertyValue('--tamanho-da-fonte');
}

/********************
 * GERENCIADOR DE SOM *
 ********************/
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audioBuffers = {};

function carregarSom(nome, url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        audioContext.decodeAudioData(request.response, function (buffer) {
            audioBuffers[nome] = buffer;
        }, function (error) {
            console.error('Erro ao decodificar áudio: ' + nome, error);
        });
    };
    request.send();
}

function tocarSom(nome) {
    if (!audioBuffers[nome]) {
        return;
    }
    var source = audioContext.createBufferSource();
    source.buffer = audioBuffers[nome];
    source.connect(audioContext.destination);
    source.start(0);
}

// Carregar os sons (confirme que os arquivos estão na pasta "recursos" e com os nomes corretos)
carregarSom("raquete", "./recursos/somRaquete.mp3");
carregarSom("parede", "./recursos/somParede.mp3");
carregarSom("base", "./recursos/somBase.mp3");
carregarSom("extraVida", "./recursos/somExtraVida.mp3");
carregarSom("levelUp", "./recursos/somLevelUp.mp3");
carregarSom("gameOver", "./recursos/somGameOver.mp3");

/********************
 * VARIÁVEIS DO JOGO *
 ********************/
var tabuleiro = document.getElementById('tabuleiro');
var raquete = document.getElementById('raquete');
var bola = document.getElementById('bola');
var botao = document.getElementById('botao');

var contadorPontos = document.getElementById('contadorPontos');
var contadorRecorde = document.getElementById('contadorRecorde');
var vidasEl = document.getElementById('vidas');
var temporizadorEl = document.getElementById('temporizador');
var nivelEl = document.getElementById('nomeNivel');

var boardWidth = tabuleiro.offsetWidth;
var boardHeight = tabuleiro.offsetHeight;
var paddleWidth = raquete.offsetWidth;
var paddleHeight = raquete.offsetHeight;
var paddleX;

var ballSize = bola.offsetWidth;
var ballX, ballY;
var ballSpeedX, ballSpeedY;

var animationFrameId;
var gameRunning = false;

var score = 0;
var highScore = 0;
var lives = 5;
var level = 1;

var lastSpeedIncreaseScore = 0;
var lastLifeIncreaseScore = 0;

var countdownActive = false;

/************************************
 * FUNÇÕES DA INTERFACE DO JOGO     *
 ************************************/
function updateScoreDisplay() {
    contadorPontos.textContent = score.toString().padStart(6, '0');
}

function updateRecordDisplay() {
    contadorRecorde.textContent = highScore.toString().padStart(6, '0');
}

function updateLivesDisplay() {
    var vidasSpans = vidasEl.querySelectorAll('span');
    var i;
    for (i = 0; i < vidasSpans.length; i++) {
        if (i < lives) {
            vidasSpans[i].classList.remove('vidaPerdida');
        } else {
            vidasSpans[i].classList.add('vidaPerdida');
        }
    }
}

function updateLevelDisplay() {
    var nivelTexto = 'nivel-' + (level < 10 ? '0' + level : level);
    nivelEl.textContent = nivelTexto;
}

/************************************
 * CONTROLE DO JOGO                 *
 ************************************/
function iniciar_jogo() {
    score = 0;
    lives = 5;
    level = 1;
    updateScoreDisplay();
    updateLivesDisplay();
    updateLevelDisplay();

    highScore = parseInt(localStorage.getItem('pongHighScore')) || 0;
    updateRecordDisplay();

    lastSpeedIncreaseScore = 0;
    lastLifeIncreaseScore = 0;

    boardWidth = tabuleiro.offsetWidth;
    boardHeight = tabuleiro.offsetHeight;

    paddleX = (boardWidth - paddleWidth) / 2;
    raquete.style.left = paddleX + 'px';

    ballX = paddleX + (paddleWidth - ballSize) / 2;
    ballY = paddleHeight + 10;

    ballSpeedX = 3;
    ballSpeedY = 3;

    atualizarPosicoes();

    botao.style.display = 'none';
    gameRunning = true;
    animationFrameId = requestAnimationFrame(loopDoJogo);
}

function atualizarPosicoes() {
    bola.style.left = ballX + 'px';
    bola.style.bottom = ballY + 'px';
}

function loopDoJogo() {
    if (!gameRunning) {
        return;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <= 0) {
        ballX = 0;
        ballSpeedX = -ballSpeedX;
        tocarSom("parede");
    } else if (ballX + ballSize >= boardWidth) {
        ballX = boardWidth - ballSize;
        ballSpeedX = -ballSpeedX;
        tocarSom("parede");
    }

    if (ballY + ballSize >= boardHeight) {
        ballY = boardHeight - ballSize;
        ballSpeedY = -ballSpeedY;
        tocarSom("parede");
    }

    // Verifica colisão com a raquete
    if (ballY <= paddleHeight) {
        if (ballX + ballSize >= paddleX && ballX <= paddleX + paddleWidth) {
            ballY = paddleHeight;
            var hitPoint = (ballX + ballSize / 2) - (paddleX + paddleWidth / 2);
            var normalizedHit = hitPoint / (paddleWidth / 2);
            var bounceAngle = normalizedHit * (Math.PI / 4);
            var currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
            ballSpeedX = currentSpeed * Math.sin(bounceAngle);
            ballSpeedY = currentSpeed * Math.cos(bounceAngle);
            if (ballSpeedY < 0) {
                ballSpeedY = -ballSpeedY;
            }
            tocarSom("raquete");

            score += 10;
            updateScoreDisplay();

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('pongHighScore', highScore);
                updateRecordDisplay();
            }

            // Aumenta a velocidade e o nível a cada 100 pontos
            while (score - lastSpeedIncreaseScore >= 100) {
                increaseBallSpeed();
                lastSpeedIncreaseScore += 100;
                level++;
                updateLevelDisplay();
                tocarSom("levelUp");
            }

            // Ganha uma vida extra a cada 1000 pontos, se tiver menos de 5 vidas
            while (score - lastLifeIncreaseScore >= 1000) {
                if (lives < 5) {
                    lives++;
                    updateLivesDisplay();
                    tocarSom("extraVida");
                } else {
                    break;
                }
                lastLifeIncreaseScore += 1000;
            }
        }
    }

    if (ballY < 0) {
        gameRunning = false;
        tocarSom("base");
        ballX = paddleX + (paddleWidth - ballSize) / 2;
        ballY = paddleHeight + 10;
        atualizarPosicoes();
        lives--;
        updateLivesDisplay();
        if (lives <= 0) {
            fimDeJogo();
            return;
        }
        iniciarCountdown();
        return;
    }

    atualizarPosicoes();
    animationFrameId = requestAnimationFrame(loopDoJogo);
}

function increaseBallSpeed() {
    var signX = ballSpeedX >= 0 ? 1 : -1;
    var signY = ballSpeedY >= 0 ? 1 : -1;
    ballSpeedX = signX * (Math.abs(ballSpeedX) + 0.5);
    ballSpeedY = signY * (Math.abs(ballSpeedY) + 0.5);
}

function iniciarCountdown() {
    countdownActive = true;
    var countdown = 3;
    temporizadorEl.style.display = 'block';
    temporizadorEl.textContent = countdown;
    var intervalId = setInterval(function () {
        countdown--;
        if (countdown > 0) {
            temporizadorEl.textContent = countdown;
        } else {
            clearInterval(intervalId);
            temporizadorEl.style.display = 'none';
            countdownActive = false;
            reiniciarRodada();
        }
    }, 1000);
}

function reiniciarRodada() {
    paddleX = (boardWidth - paddleWidth) / 2;
    raquete.style.left = paddleX + 'px';
    ballX = paddleX + (paddleWidth - ballSize) / 2;
    ballY = paddleHeight + 10;
    atualizarPosicoes();
    gameRunning = true;
    animationFrameId = requestAnimationFrame(loopDoJogo);
}

function fimDeJogo() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    botao.style.display = 'block';
    tocarSom("gameOver");
    alert('Fim de jogo! Sua pontuação: ' + score);
}

/************************************
 * CONTROLE DA RAQUETE VIA TOQUE    *
 ************************************/
tabuleiro.addEventListener('touchmove', function (e) {
    e.preventDefault();
    var touch = e.touches[0];
    var rect = tabuleiro.getBoundingClientRect();
    var touchX = touch.clientX - rect.left;
    paddleX = touchX - paddleWidth / 2;
    if (paddleX < 0) {
        paddleX = 0;
    }
    if (paddleX > boardWidth - paddleWidth) {
        paddleX = boardWidth - paddleWidth;
    }
    raquete.style.left = paddleX + 'px';
    if (countdownActive) {
        ballX = paddleX + (paddleWidth - ballSize) / 2;
        ballY = paddleHeight + 10;
        atualizarPosicoes();
    }
});

window.addEventListener('resize', function () {
    boardWidth = tabuleiro.offsetWidth;
    boardHeight = tabuleiro.offsetHeight;
});