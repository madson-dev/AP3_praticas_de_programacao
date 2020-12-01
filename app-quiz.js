const numeroQuestao = document.querySelector(".numero-questao");
const descricaoQuestao = document.querySelector(".questao-descricao");
const opcoesQuestao = document.querySelector(".opcoes-questao");
const indicadorDeQuestoes = document.querySelector(".questao-atual");
const inicioQuiz = document.querySelector(".inicio-quiz");
const caixaQuiz = document.querySelector(".caixa-quiz");
const resultado = document.querySelector(".resultado");
const indexCaixa = document.querySelector(".index-caixa");

let contagemQuestao = 0;
let questaoAtual;
let questaoDisponivel = [];
let opcaoDisponivel = [];
let corretas = 0;
let tentativas = 0;

function carregarQuestoes(){
    const totalQuestoes = quiz.length;
    for(let i=0; i<totalQuestoes; i++){
        questaoDisponivel.push(quiz[i])
    }
}   

window.onload = function(){
    indexCaixa.querySelector(".total-questao").innerHTML = quiz.length;
}

function gerarNovaQuestao(){
    //carregar a questão e vir em ordem aleatória 
    numeroQuestao.innerHTML = "Questão " + (contagemQuestao + 1) + " de " + quiz.length;
    const questaoInicial = questaoDisponivel[Math.floor(Math.random() * questaoDisponivel.length)]
    questaoAtual = questaoInicial;

    descricaoQuestao.innerHTML = questaoAtual.questao;

    //pega a posição atual
    const indexAtual = questaoDisponivel.indexOf(questaoInicial);

    //remove a questão que já foi carregada
    questaoDisponivel.splice(indexAtual,1)

    //carrega o array de opcoes
    const alternativasQuestao = questaoAtual.opcoes.length;

    //carregar as opções da questão atual
    for(let i=0; i<alternativasQuestao; i++){
        opcaoDisponivel.push(i)
    }

    opcoesQuestao.innerHTML = '';

    let animationDelay = 0.14;
    //carregar as opções na tabela 
    for(let i=0; i<alternativasQuestao; i++){

        //Carregar as opções aleatoriamente
        const opcaoRandom = opcaoDisponivel[Math.floor(Math.random() * opcaoDisponivel.length)];
        const IndexRandom = opcaoDisponivel.indexOf(opcaoRandom);
        opcaoDisponivel.splice(IndexRandom, 1)

        const opcao = document.createElement("div");
        opcao.innerHTML = questaoAtual.opcoes[opcaoRandom];
        opcao.id = opcaoRandom;
        opcao.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.14;
        opcao.className = "opcao";
        opcoesQuestao.appendChild(opcao);
        opcao.setAttribute("onclick", "getResultado(this)");
    }
    contagemQuestao++
}

//Capturar a seleção da resposta
function getResultado(opcaoSelecionada){
    const id  = parseInt(opcaoSelecionada.id);

    //alterar as cores das respostas e marcações
    if(id === questaoAtual.resposta){ 
        opcaoSelecionada.classList.add("correta");
        mudarCorIndicador("correta");
        corretas++;
        console.log("Corretas" + corretas);
    } else {
        opcaoSelecionada.classList.add("errada")
        mudarCorIndicador("errada");
    }

    //Mostrar quando a resposta for correta ou não
    const contadorOpcao = opcoesQuestao.children.length;
    for(let i=0; i<contadorOpcao; i++){
        if(parseInt(opcoesQuestao.children[i].id) === questaoAtual.resposta){
            opcoesQuestao.children[i].classList.add("correta");   
        }
    }
    tentativas++;
    naoTrocarOpcao()
} 

function naoTrocarOpcao(){
    const opcaoClicada = opcoesQuestao.children.length;
    for(let i=0; i<opcaoClicada; i++){
        opcoesQuestao.children[i].classList.add("ja-respondida");
    }
}

function IndicadorQuestoes(){
    indicadorDeQuestoes.innerHTML = '';
    const totQuestoes = quiz.length;
    for(let i=0; i<totQuestoes; i++){
        const indicador = document.createElement("div");
        indicadorDeQuestoes.appendChild(indicador);
    }
}

function mudarCorIndicador(indicadorResposta){
    indicadorDeQuestoes.children[contagemQuestao-1].classList.add(indicadorResposta);
}

function proximaQuestao(){
    if(contagemQuestao === quiz.length){
        FimQuiz();
    } else {    
        gerarNovaQuestao();    
    }
}

function proximaImagem(){
    print_r("OLÁ!")
}

function FimQuiz(){
    caixaQuiz.classList.add("ocultar-box");
    resultado.classList.remove("ocultar-box");
    ResultadoQuiz();
}

function ResultadoQuiz(){
    resultado.querySelector(".total-perguntas").innerHTML = quiz.length;
    resultado.querySelector(".total-acerto").innerHTML = corretas;
    resultado.querySelector(".total-erro").innerHTML = quiz.length - corretas;
    const porcentagemTotal = (corretas/quiz.length)*100; 
    resultado.querySelector(".total-pontuacao").innerHTML = corretas + " / " + quiz.length;
}

function resetQuiz(){
    contagemQuestao = 0;
    corretas = 0;
    tentativas = 0;        
}

function jogarNovamente(){
    // ocultar o resultado
    resultado.classList.add("ocultar-box");
    caixaQuiz.classList.remove("ocultar-box");
    resetQuiz();
    iniciarQuiz();
}

function voltarMenu(){
    resultado.classList.add("ocultar-box");
    indexCaixa.classList.remove("ocultar-box")
    resetQuiz();   
}

//Iniciando Quiz
function iniciarQuiz(){
    indexCaixa.classList.add("ocultar-box")
    caixaQuiz.classList.remove("ocultar-box")
    carregarQuestoes();
    gerarNovaQuestao();
    IndicadorQuestoes();
}   