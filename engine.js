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
    // Se não usar a função de depuração, comente ou remova a chamada abaixo.
    // depuracao();
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
 * SONS DO JOGO     *
 ********************/
var somRaquete    = new Audio('recursos/somRaquete.mp3');    // ao colidir bola/raquete
var somParede     = new Audio('recursos/somParede.mp3');     // ao colidir com paredes (esq, dir, topo)
var somBase       = new Audio('recursos/somBase.mp3');       // ao tocar a base
var somExtraVida  = new Audio('recursos/somExtraVida.mp3');  // ao ganhar vida extra
var somLevelUp    = new Audio('recursos/somLevelUp.mp3');    // ao subir de nível
var somGameOver   = new Audio('recursos/somGameOver.mp3');   // game over

/********************
 * VARIÁVEIS DO JOGO *
 ********************/
// Elementos do jogo
var tabuleiro = document.getElementById('tabuleiro');
var raquete   = document.getElementById('raquete');
var bola      = document.getElementById('bola');
var botao     = document.getElementById('botao');

// Elementos da interface
var contadorPontos = document.getElementById('contadorPontos');
var contadorRecorde = document.getElementById('contadorRecorde');
var vidasEl        = document.getElementById('vidas');
var temporizadorEl = document.getElementById('temporizador');
var nivelEl        = document.getElementById('nomeNivel');

// Dimensões do tabuleiro e da raquete
var boardWidth  = tabuleiro.offsetWidth;
var boardHeight = tabuleiro.offsetHeight;
var paddleWidth  = raquete.offsetWidth;
var paddleHeight = raquete.offsetHeight;
var paddleX; // posição horizontal da raquete

// Propriedades da bola
var ballSize    = bola.offsetWidth; // bola quadrada
var ballX, ballY;                // posição (left e bottom)
var ballSpeedX, ballSpeedY;      // velocidades nos eixos X e Y

// Controle do loop
var animationFrameId;
var gameRunning = false;

// Variáveis de pontuação, recorde, vidas e nível
var score    = 0;
var highScore = 0;
var lives    = 5;
var level    = 1;

// Para controlar os aumentos progressivos
var lastSpeedIncreaseScore = 0;
var lastLifeIncreaseScore  = 0;

// Variável para controle da contagem regressiva
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

    boardWidth  = tabuleiro.offsetWidth;
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
        somParede.currentTime = 0;
        somParede.play();
    } else if (ballX + ballSize >= boardWidth) {
        ballX = boardWidth - ballSize;
        ballSpeedX = -ballSpeedX;
        somParede.currentTime = 0;
        somParede.play();
    }

    if (ballY + ballSize >= boardHeight) {
        ballY = boardHeight - ballSize;
        ballSpeedY = -ballSpeedY;
        somParede.currentTime = 0;
        somParede.play();
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
            // Som ao colidir com a raquete
            somRaquete.currentTime = 0;
            somRaquete.play();

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
                somLevelUp.currentTime = 0;
                somLevelUp.play();
            }

            // Ganha uma vida extra a cada 1000 pontos, somente se tiver menos de 5 vidas
            while (score - lastLifeIncreaseScore >= 1000) {
                if (lives < 5) {
                    lives++;
                    updateLivesDisplay();
                    somExtraVida.currentTime = 0;
                    somExtraVida.play();
                } else {
                    break;
                }
                lastLifeIncreaseScore += 1000;
            }
        }
    }

    // Se a bola tocar o fundo
    if (ballY < 0) {
        gameRunning = false;
        somBase.currentTime = 0;
        somBase.play();
        // Reposiciona a bola para ficar presa à raquete
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
    somGameOver.currentTime = 0;
    somGameOver.play();
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
    // Se a contagem regressiva estiver ativa, mantém a bola presa à raquete
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