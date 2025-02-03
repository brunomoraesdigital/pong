// Função para obter as dimensões atuais da tela
function obterDimensoesDaTela() {
    return {
        largura: window.innerWidth,
        altura: window.innerHeight
    };
}

// Constantes de referência para o cálculo proporcional
const ALTURA_REFERENCIA = 914;
const FONTE_REFERENCIA = 16;

// Função para atualizar o tamanho da fonte com base na altura da tela
function atualizartamanhoDaFonte(alturaTela) {
    // Calcula o tamanho da fonte proporcional
    const tamanhoDaFonte = Math.floor((FONTE_REFERENCIA * alturaTela) / ALTURA_REFERENCIA);
    
    // Atualiza a variável CSS no elemento raiz (html)
    document.documentElement.style.setProperty('--tamanho-da-fonte', `${tamanhoDaFonte}px`);
}

// Função para lidar com o redimensionamento da janela
function aoRedimensionar() {
    const dimensoesDaTela = obterDimensoesDaTela();
    atualizartamanhoDaFonte(dimensoesDaTela.altura);
}

// Debounce para otimizar o evento de redimensionamento
function debounce(funcao, tempo) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            funcao();
        }, tempo);
    };
}

// Adiciona o evento de redimensionamento com debounce
window.addEventListener('resize', debounce(aoRedimensionar, 100));

// Inicializa o tamanho da fonte ao carregar a página
(function inicializar() {
    aoRedimensionar();
    depuracao();
})();


/* --------- */
/* DEPURAÇÃO */
/* --------- */



function criarPainelDebug() {
    const debugDiv = document.createElement('div');
    debugDiv.id = 'debug-painel';
    debugDiv.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.7);
        color: red;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        z-index: 9999;
        font-size: 0.8rem;
    `;
    document.body.appendChild(debugDiv);
    return debugDiv;
}

function atualizarDebug(dimensoes, tamanhoFonteCalculado) {
    let debugDiv = document.getElementById('debug-painel') || criarPainelDebug();
    
    debugDiv.innerHTML = `
        Depuração:<br>
        Largura da Tela: ${dimensoes.largura}px<br>
        Altura da Tela:&nbsp;&nbsp;${dimensoes.altura}px<br>
        Fonte Calculada: ${tamanhoFonteCalculado}px<br>
        Fonte CSS Atual: ${getComputedStyle(document.documentElement).getPropertyValue('--tamanho-da-fonte')}
    `;
}

// Função modificada para usar valores diretos
function aoRedimensionar() {
    const dimensoes = obterDimensoesDaTela();
    const tamanhoFonte = atualizarTamanhoDaFonte(dimensoes.altura); // Pegando valor direto da função
    
    atualizarDebug(dimensoes, tamanhoFonte);
}

// Modifique a função de atualização para retornar o valor
function atualizarTamanhoDaFonte(alturaTela) {
    const tamanhoDaFonte = Math.floor((FONTE_REFERENCIA * alturaTela) / ALTURA_REFERENCIA);
    document.documentElement.style.setProperty('--tamanho-da-fonte', `${tamanhoDaFonte}px`);
    return tamanhoDaFonte; // Agora retorna o valor calculado
}


