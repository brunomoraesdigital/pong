function obterDimensoesDaTela() {
    let largura = window.innerWidth;
    let altura = window.innerHeight;

    return { largura, altura };
}

const ALTURA_REFERENCIA = 914;
const FONT_REFERENCIA = 16;

function atualizarTamanhoDaFonte(altura) {
    let tamanhoDaFonte = Math.floor((FONT_REFERENCIA * altura) / ALTURA_REFERENCIA);
    document.documentElement.style.setProperty('--font-size', tamanhoDaFonte + 'px');
}

const elementoTabuleiro = document.getElementById('tabuleiro');
const elementoRaquete = document.getElementById('raquete');
const elementoBola = document.getElementById('bola');

function obterDimensoesDosElementos(elemento) {
    return {
        largura: elemento.offsetWidth,
        altura: elemento.offsetHeight,
    };
}

function dimensoesDosElementos() {
    const dimensoesTabuleiro = obterDimensoesDosElementos(elementoTabuleiro);
    const dimensoesRaquete = obterDimensoesDosElementos(elementoRaquete);
    const dimensoesBola = obterDimensoesDosElementos(elementoBola);

    return { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola };
}

function estabelecerLimitesDosTabuleiro() {
    const { dimensoesTabuleiro } = dimensoesDosElementos();

    limiteEsquerdo = 0;
    limiteDireito = dimensoesTabuleiro.largura;
    limiteTopo = 0;
    limiteBase = dimensoesTabuleiro.altura;

    return { limiteEsquerdo, limiteDireito, limiteTopo, limiteBase };
}

function posicionarElementos() {
    const { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola } = dimensoesDosElementos();

    let posicionarRaquete = (dimensoesTabuleiro.largura / 2) - (dimensoesRaquete.largura / 2);
    let posicionarBola = (dimensoesTabuleiro.largura / 2) - (dimensoesBola.largura / 2);
    let posicionarBolaVertical = (dimensoesTabuleiro.altura) - (dimensoesBola.altura * 2) - 2;

    elementoRaquete.style.left = posicionarRaquete + 'px';
    elementoBola.style.left = posicionarBola + 'px';
    elementoBola.style.top = posicionarBolaVertical + 'px';
}

function obterPosicaoInicialDaBola() {
    let posBolaEsq = elementoBola.offsetLeft;
    let posBolaTop = elementoBola.offsetTop;

    return { posBolaEsq, posBolaTop };
}

function obterPosicaoInicialDaRaquete() {
    let posRaqueteEsq = elementoRaquete.offsetLeft;
    let posRaqueteTop = elementoRaquete.offsetTop;

    return { posRaqueteEsq, posRaqueteTop };
}

let velocidadeBolaY = -2;
let velocidadeBolaX = -2;
let intervaloJogo;
let perdeu = false;
let contadorDePerdeu = 0;

function executarJogo() {
    function controlarCenario() {
        const posicaoDaBola = obterPosicaoInicialDaBola();
        const posicaoDaRaquete = obterPosicaoInicialDaRaquete();
        const limiteDoTabuleiro = estabelecerLimitesDosTabuleiro();
        const { dimensoesBola, dimensoesRaquete } = dimensoesDosElementos();

        let posicaoBolaY = posicaoDaBola.posBolaTop + velocidadeBolaY;
        let posicaoBolaX = posicaoDaBola.posBolaEsq + velocidadeBolaX;
        let posicaoRaqueteY = posicaoDaRaquete.posRaqueteTop;
        let posicaoRaqueteX = posicaoDaRaquete.posRaqueteEsq;

        if (posicaoBolaY >= limiteDoTabuleiro.limiteTopo) {
            elementoBola.style.top = posicaoBolaY + 'px';
        } else {
            velocidadeBolaY = -velocidadeBolaY;
        }

        if (
            posicaoBolaX >= limiteDoTabuleiro.limiteEsquerdo &&
            posicaoBolaX + dimensoesBola.largura <= limiteDoTabuleiro.limiteDireito
        ) {
            elementoBola.style.left = posicaoBolaX + 'px';
        } else {
            velocidadeBolaX = -velocidadeBolaX;
        }

        if (posicaoBolaY + dimensoesBola.altura >= limiteDoTabuleiro.limiteBase) {
            velocidadeBolaX = 0;
            velocidadeBolaY = 0;
            if (!perdeu && contadorDePerdeu <= 3) {
                perdeu = true;
                contadorDePerdeu++;
                
                perderVida();

                console.log('não colidiu com a raquete');
                console.log(contadorDePerdeu);
                /*console.log(
                    'Raquete: Esq ' + posicaoRaqueteX + ' bola ' + posicaoBolaX + '/' +
                    (posicaoBolaX + dimensoesBola.largura) + ' ld dir ' + (posicaoRaqueteX + dimensoesRaquete.largura)
                );*/
                reiniciarPartida();
            }
        }

        if (
            posicaoBolaY + dimensoesBola.altura >= posicaoRaqueteY &&
            posicaoBolaX + dimensoesBola.largura >= posicaoRaqueteX &&
            posicaoBolaX <= posicaoRaqueteX + dimensoesRaquete.largura
        ) {
            console.log('colidiu com a raquete');
            velocidadeBolaY = -velocidadeBolaY;
            /*console.log(
                'Raquete: Esq ' + posicaoRaqueteX + ' bola ' + posicaoBolaX + '/' +
                (posicaoBolaX + dimensoesBola.largura) + ' ld dir ' + (posicaoRaqueteX + dimensoesRaquete.largura)
            );*/
        }
    }

    intervaloJogo = setInterval(controlarCenario, 16);
}


function perderVida() {
    let vidas = document.querySelectorAll("#vidas span");
    
    for (let i = vidas.length - 1; i >= 0; i--) {
        if (!vidas[i].classList.contains("vidaPerdida")) {
            vidas[i].classList.add("vidaPerdida");
            break;
        }
    }
}

function recuperarVida() {
    let vidas = document.querySelectorAll("#vidas span");
    
    for (let i = 0; i < vidas.length; i++) {
        if (vidas[i].classList.contains("vidaPerdida")) {
            vidas[i].classList.remove("vidaPerdida");
            break;
        }
    }
}

function reiniciarPartida() {
    const elementoTemporizador = document.getElementById('temporizador');
    let contadorDoTemporizador = 5;

    elementoTemporizador.style.display = 'block';
    elementoTemporizador.classList.remove('desfocado');
    elementoTemporizador.textContent = contadorDoTemporizador;

    const intervalo = setInterval(atualizarTemporizador, 1000);

    function atualizarTemporizador() {
        if (contadorDoTemporizador > 1) {
            contadorDoTemporizador--;
            elementoTemporizador.textContent = contadorDoTemporizador;
            elementoTemporizador.classList.add('desfocado');

            setTimeout(removerDesfoque, 500);
        } else {
            clearInterval(intervalo);
            elementoTemporizador.textContent = 'VAI!';
            elementoTemporizador.classList.remove('desfocado');

            setTimeout(finalizarTemporizador, 1000);
        }
    }
    function removerDesfoque() {
        elementoTemporizador.classList.remove('desfocado');
    }

    function finalizarTemporizador() {
        elementoTemporizador.style.display = 'none';
        reiniciarJogo();
    }
}

function reiniciarJogo() {
    console.log('O jogo será reiniciado!');
    // redefinir posições e estados da bola, raquete, etc.

    // Reseta a posição dos elementos
    posicionarElementos();
    // Restaura a velocidade da bola
    velocidadeBolaX = (Math.random() > 0.5 ? 2 : -2); // escolhe um direção aleátoria para a bolinha reiniciar
    velocidadeBolaY = -2;
    // restaura status do jogo
    perdeu = false;
    // Interrompe o loop anterior antes de iniciar um novo
    if (intervaloJogo) {
        clearInterval(intervaloJogo);
    }
    // Reinicia o jogo chamando a função de controle
    executarJogo();
    console.log('Jogo reiniciado!');
}

function carregarLayout() {
    const { altura } = obterDimensoesDaTela();
    atualizarTamanhoDaFonte(altura);
    dimensoesDosElementos();
    posicionarElementos();

    depuracao();
}

document.addEventListener('DOMContentLoaded', function () {
    carregarLayout();
});

let debounce;
function aoRedimensionar() {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
        carregarLayout();
    }, 16);
}

window.addEventListener('resize', aoRedimensionar);

function iniciar_jogo() {
    controlarBotao();
    executarJogo();
}

function controlarBotao() {
    const elementoBotao = document.getElementById('botao');
    elementoBotao.style.display = 'none';
}


/* ====================================================== */
// depuração
/* ====================================================== */

let DEBUG = false;
function depuracao() {
    if (DEBUG) {
        /* ============================= */
        // Coleta de Dados Organizados
        /* ============================= */

        /* ------------------------------------------ */
        // dimensões da tela
        const { largura, altura } = obterDimensoesDaTela();
        /* ------------------------------------------ */
        // tamanho da fonte
        atualizarTamanhoDaFonte(altura);

        /* ------------------------------------------ */
        // dimensões dos elementos
        const { dimensoesTabuleiro, dimensoesRaquete, dimensoesBola } = dimensoesDosElementos();

        /* ------------------------------------------ */
        // 
        const { limiteEsquerdo, limiteDireito, limiteTopo, limiteBase } = estabelecerLimitesDosTabuleiro();

        /* ============================= */
        // Logs organizados para depuração
        /* ============================= */

        /* ------------------------------------------ */
        // Dimensões da tela 
        console.log(
            'Dimensões da Tela\n' +
            '\tLargura:\t' + largura +
            '\n\tAltura:\t\t' + altura
        );
        /* ------------------------------------------ */
        // Tamanho da fonte
        console.log('Tamanho da Fonte: ' + Math.floor((FONT_REFERENCIA * altura) / ALTURA_REFERENCIA));

        /* ------------------------------------------ */
        // Dimensões dos elementos
        console.log(`Tabuleiro\n\tLargura: \t${dimensoesTabuleiro.largura}px \n\tAltura: \t${dimensoesTabuleiro.altura}px`);
        console.log(`Raquete\n\tLargura: \t${dimensoesRaquete.largura}px \n\tAltura: \t${dimensoesRaquete.altura}px`);
        console.log(`Bola\n\tLargura: \t${dimensoesBola.largura}px \n\tAltura: \t${dimensoesBola.altura}px`);

        /* ------------------------------------------ */
        // 
        console.log('Limites do Tabuleiro:');
        console.log('\tEsquerda:', limiteEsquerdo);
        console.log('\tDireita:', limiteDireito);
        console.log('\tTopo:', limiteTopo);
        console.log('\tBase:', limiteBase);
    }
}

