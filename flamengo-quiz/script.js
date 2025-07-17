//Variaveis pra salvar as repostas
let resposta1 = "";
let resposta2 = "";
let resposta3 = "";
let resposta4 = "";
let resposta5 = "";
let resposta6 = "";
let resposta7 = "";
let resposta8 = "";
//variavel pra salvar em qual pergunta o usuario está
let perguntaAtual = 1;
//variaveis dos botoes
let pergunta = document.getElementById('pergunta')
let proximo = document.getElementById('proximo')
//Evento Pra salvar a resposta do usuario
let A = document.getElementById('alternativaA')
A.addEventListener('click', function () {
    A.classList.add('selecionada')
    B.classList.remove('selecionada')
    C.classList.remove('selecionada')
    D.classList.remove('selecionada')
    if (perguntaAtual === 1) resposta1 = "A";
    if (perguntaAtual === 2) resposta2 = "A";
    if (perguntaAtual === 3) resposta3 = "A";
    if (perguntaAtual === 4) resposta4 = "A";
    if (perguntaAtual === 5) resposta5 = "A";
    if (perguntaAtual === 6) resposta6 = "A";
    if (perguntaAtual === 7) resposta7 = "A";
    if (perguntaAtual === 8) resposta8 = "A";
})

let B = document.getElementById('alternativaB')
B.addEventListener('click', function () {
    B.classList.add('selecionada')
    A.classList.remove('selecionada')
    C.classList.remove('selecionada')
    D.classList.remove('selecionada')
    if (perguntaAtual === 1) resposta1 = "B";
    if (perguntaAtual === 2) resposta2 = "B";
    if (perguntaAtual === 3) resposta3 = "B";
    if (perguntaAtual === 4) resposta4 = "B";
    if (perguntaAtual === 5) resposta5 = "B";
    if (perguntaAtual === 6) resposta6 = "B";
    if (perguntaAtual === 7) resposta7 = "B";
    if (perguntaAtual === 8) resposta8 = "B";
})

let C = document.getElementById('alternativaC')
C.addEventListener('click', function () {
    C.classList.add('selecionada')
    B.classList.remove('selecionada')
    A.classList.remove('selecionada')
    D.classList.remove('selecionada')
    if (perguntaAtual === 1) resposta1 = "C";
    if (perguntaAtual === 2) resposta2 = "C";
    if (perguntaAtual === 3) resposta3 = "C";
    if (perguntaAtual === 4) resposta4 = "C";
    if (perguntaAtual === 5) resposta5 = "C";
    if (perguntaAtual === 6) resposta6 = "C";
    if (perguntaAtual === 7) resposta7 = "C";
    if (perguntaAtual === 8) resposta8 = "C";
})

let D = document.getElementById('alternativaD')
D.addEventListener('click', function () {
    D.classList.add('selecionada')
    B.classList.remove('selecionada')
    C.classList.remove('selecionada')
    A.classList.remove('selecionada')
    if (perguntaAtual === 1) resposta1 = "D";
    if (perguntaAtual === 2) resposta2 = "D";
    if (perguntaAtual === 3) resposta3 = "D";
    if (perguntaAtual === 4) resposta4 = "D";
    if (perguntaAtual === 5) resposta5 = "D";
    if (perguntaAtual === 6) resposta6 = "D";
    if (perguntaAtual === 7) resposta7 = "D";
    if (perguntaAtual === 8) resposta8 = "D";
})
//Evento principal onde ocorre as perguntas e mostra as alternativas Salvas 
function mostrarPergunta() {
    //remover e add estilo de classe para mostrar que uma letra esta selecionada
    A.classList.remove('selecionada');
    B.classList.remove('selecionada');
    C.classList.remove('selecionada');
    D.classList.remove('selecionada');
    //If pra salvar qual letra usuario escolheu 
    if (perguntaAtual === 1 && resposta1 === "A") {
        A.classList.add('selecionada')
    }
    if (perguntaAtual === 1 && resposta1 === "B") {
        B.classList.add('selecionada')
    }
    if (perguntaAtual === 1 && resposta1 === "C") {
        C.classList.add('selecionada')
    }
    if (perguntaAtual === 1 && resposta1 === "D") {
        D.classList.add('selecionada')
    }

    if (perguntaAtual === 2 && resposta2 === "A") {
        A.classList.add('selecionada')
    }
    if (perguntaAtual === 2 && resposta2 === "B") {
        B.classList.add('selecionada')
    }
    if (perguntaAtual === 2 && resposta2 === "C") {
        C.classList.add('selecionada')
    }
    if (perguntaAtual === 2 && resposta2 === "D") {
        D.classList.add('selecionada')
    }

    if (perguntaAtual === 3 && resposta3 === "A") {
        A.classList.add('selecionada')
    }
    if (perguntaAtual === 3 && resposta3 === "B") {
        B.classList.add('selecionada')
    }
    if (perguntaAtual === 3 && resposta3 === "C") {
        C.classList.add('selecionada')
    }
    if (perguntaAtual === 3 && resposta3 === "D") {
        D.classList.add('selecionada')
    }

    if (perguntaAtual === 4 && resposta4 === "A") {
        A.classList.add('selecionada')
    }
    if (perguntaAtual === 4 && resposta4 === "B") {
        B.classList.add('selecionada')
    }
    if (perguntaAtual === 4 && resposta4 === "C") {
        C.classList.add('selecionada')
    }
    if (perguntaAtual === 4 && resposta4 === "D") {
        D.classList.add('selecionada')
    }


    if (perguntaAtual === 5 && resposta5 === "A") {
        A.classList.add('selecionada')
    }
    if (perguntaAtual === 5 && resposta5 === "B") {
        B.classList.add('selecionada')
    }
    if (perguntaAtual === 5 && resposta5 === "C") {
        C.classList.add('selecionada')
    }
    if (perguntaAtual === 5 && resposta5 === "D") {
        D.classList.add('selecionada')
    }


    if (perguntaAtual === 6 && resposta6 === "A") {
        A.classList.add('selecionada')
    }
    if (perguntaAtual === 6 && resposta6 === "B") {
        B.classList.add('selecionada')
    }
    if (perguntaAtual === 6 && resposta6 === "C") {
        C.classList.add('selecionada')
    }
    if (perguntaAtual === 6 && resposta6 === "D") {
        D.classList.add('selecionada')
    }


    if (perguntaAtual === 7 && resposta7 === "A") {
        A.classList.add('selecionada')
    }
    if (perguntaAtual === 7 && resposta7 === "B") {
        B.classList.add('selecionada')
    }
    if (perguntaAtual === 7 && resposta7 === "C") {
        C.classList.add('selecionada')
    }
    if (perguntaAtual === 7 && resposta7 === "D") {
        D.classList.add('selecionada')
    }


    if (perguntaAtual === 8 && resposta8 === "A") {
        A.classList.add('selecionada')
    }
    if (perguntaAtual === 8 && resposta8 === "B") {
        B.classList.add('selecionada')
    }
    if (perguntaAtual === 8 && resposta8 === "C") {
        C.classList.add('selecionada')
    }
    if (perguntaAtual === 8 && resposta8 === "D") {
        D.classList.add('selecionada')
    }


    //Perguntas velha guarda
    if (perguntaAtual === 1) {
        pergunta.innerText = "Quem é o maior ídolo do Flamengo de todos os tempos?";
        A.innerHTML = "<span>A)</span> Zico";
        B.innerHTML = "<span>B)</span> Gabigol";
        C.innerHTML = "<span>C)</span> Bruno Henrique";
        D.innerHTML = "<span>D)</span> De Arrascaeta";
    } else if (perguntaAtual === 2) {
        pergunta.innerText = "Em que ano o Flamengo foi fundado?";
        A.innerHTML = "<span>A)</span> 1895";
        B.innerHTML = "<span>B)</span> 1902";
        C.innerHTML = "<span>C)</span> 1912";
        D.innerHTML = "<span>D)</span> 1920";
    } else if (perguntaAtual === 3) {
        pergunta.innerText = "Quantas vezes o Flamengo ganhou o Campeonato Brasileiro na década de 80?";
        A.innerHTML = "<span>A)</span> 1";
        B.innerHTML = "<span>B)</span> 3";
        C.innerHTML = "<span>C)</span> 2";
        D.innerHTML = "<span>D)</span> 4";
        //Perguntas anos 2000
    } else if (perguntaAtual === 4) {
        pergunta.innerText = "Quem foi o técnico do Flamengo campeão da Copa do Brasil em 2006?";
        A.innerHTML = "<span>A)</span> Vanderlei Luxemburgo";
        B.innerHTML = "<span>B)</span> Ney Franco";
        C.innerHTML = "<span>C)</span> Zico";
        D.innerHTML = "<span>D)</span> Cuca";
    } else if (perguntaAtual === 5) {
        pergunta.innerText = "Em que ano o Flamengo venceu a Taça Guanabara pela primeira vez na década de 2000?";
        A.innerHTML = "<span>A)</span> 2001";
        B.innerHTML = "<span>B)</span> 2004";
        C.innerHTML = "<span>C)</span> 2007";
        D.innerHTML = "<span>D)</span> 2009";
        //perguntas apartir de 2019
    } else if (perguntaAtual === 6) {
        pergunta.innerText = "Quem foi o treinador campeão da Libertadores pelo Flamengo em 2019?";
        A.innerHTML = "<span>A)</span> Jorge Jesus";
        B.innerHTML = "<span>B)</span> Dorival Júnior";
        C.innerHTML = "<span>C)</span> Abel Braga";
        D.innerHTML = "<span>D)</span> Rogério Ceni";
    } else if (perguntaAtual === 7) {
        pergunta.innerText = "Qual jogador marcou o gol decisivo na final da Libertadores de 2019?";
        A.innerHTML = "<span>A)</span> Gabriel Barbosa (Gabigol)";
        B.innerHTML = "<span>B)</span> Bruno Henrique";
        C.innerHTML = "<span>C)</span> Everton Ribeiro";
        D.innerHTML = "<span>D)</span> Arrascaeta";
    } else if (perguntaAtual === 8) {
        pergunta.innerText = "Quantos títulos do Campeonato Carioca o Flamengo conquistou entre 2019 e 2023?";
        A.innerHTML = "<span>A)</span> 2";
        B.innerHTML = "<span>B)</span> 3";
        C.innerHTML = "<span>C)</span> 4";
        D.innerHTML = "<span>D)</span> 5";
    }

    iniciarCronometro();
}
//evento pra mostrar o resultado
function mostrarResultado() {
    //array pra comparar e contabilizar acertos (minha primeira array na vida)
    let perguntas = [
        "Quem é o maior ídolo do Flamengo de todos os tempos?",
        "Em que ano o Flamengo foi fundado?",
        "Quantas vezes o Flamengo ganhou o Campeonato Brasileiro na década de 80?",
        "Quem foi o técnico do Flamengo campeão da Copa do Brasil em 2006?",
        "Em que ano o Flamengo venceu a Taça Guanabara pela primeira vez na década de 2000?",
        "Quem foi o treinador campeão da Libertadores pelo Flamengo em 2019?",
        "Qual jogador marcou o gol decisivo na final da Libertadores de 2019?",
        "Quantos títulos do Campeonato Carioca o Flamengo conquistou entre 2019 e 2023?"
    ];

    //array com as explicações das respostas certas pro gabarito
    let explicacoes = [
        "Zico é considerado o maior ídolo da história do Flamengo por sua técnica, liderança e títulos, especialmente na década de 80.",
        "O Flamengo foi fundado em 1895 como um clube de remo antes de se tornar clube de futebol.",
        "Na década de 80, o Flamengo conquistou 3 títulos do Campeonato Brasileiro: 1980, 1982 e 1983.",
        "Ney Franco foi o técnico campeão da Copa do Brasil em 2006.",
        "O Flamengo venceu a Taça Guanabara pela primeira vez na década de 2000 em 2001 Contra o Fluminense.",
        "Jorge Jesus comandou o Flamengo na campanha histórica da Libertadores em 2019.",
        "Gabigol marcou dois gols nos minutos finais contra o River Plate na final da Libertadores de 2019.",
        "Entre 2019 e 2023, o Flamengo venceu a competição apenas em 2019, 2020 e 2021 – totalizando três títulos"
    ];

    //Arrays com as respostas do usuario e as respostas certas
    let respostasUsuario = [resposta1, resposta2, resposta3, resposta4, resposta5, resposta6, resposta7, resposta8];
    let respostasCorretas = ["A", "A", "B", "B", "A", "A", "A", "B"];

    let totalAcertos = 0;
    let acertosVelhaGuarda = 0; // perguntas 1 a 3 (índice 0 a 2)
    let acertosRecentes = 0;    // perguntas 6 a 8 (índice 5 a 7)

    //laço pra contabilizar acertos pra velha guarda e modinha
    for (let i = 0; i < respostasUsuario.length; i++) {
        if (respostasUsuario[i] === respostasCorretas[i]) {
            totalAcertos++;
            if (i <= 2) acertosVelhaGuarda++;
            if (i >= 5) acertosRecentes++;
        }
    }

    // Agora vem a lógica dos títulos
    let veredito = "";

    // Define o veredito final baseado no número e tipo de acertos do usuário
    // Se acertou todas as 8 perguntas, é o nível máximo: "Raiz"
    if (totalAcertos === 8) {
        veredito = "Raiz";

        // Se acertou 2 ou menos, conhecimento muito baixo: "Vascaíno"
    } else if (totalAcertos <= 2) {
        veredito = "Vascaíno";

        // Se acertou mais perguntas da Velha Guarda do que da Modinha, então é "Velha Guarda"
    } else if (acertosVelhaGuarda > acertosRecentes) {
        veredito = "Velha Guarda";

        // Se acertou mais perguntas da Modinha do que da Velha Guarda, então é "Modinha"
    } else if (acertosRecentes > acertosVelhaGuarda) {
        veredito = "Modinha";

        // Se empatou em número de acertos entre Velha Guarda e Modinha, é "Quase Mengo"
    } else {
        veredito = "Quase Mengo";
    }



    //Variavel pra ir criando a lista 
    let lista = "";

    //laço para contabilizar respostas certas pra cada pergunta
    for (let i = 0; i < perguntas.length; i++) {
        let correta = respostasCorretas[i];
        let usuario = respostasUsuario[i] || "em branco";

        // Adicionando a pergunta atual (numerada) no HTML de resultado
        lista += `<p><strong>${i + 1}. ${perguntas[i]}</strong><br>`;

        // Verifica se o usuário acertou ou errou a pergunta 
        if (usuario === correta) {
            lista += `✅ Você acertou: ${usuario})<br>`;
        } else {
            lista += `❌ Você respondeu: ${usuario})<br>`;
            lista += `✅ Resposta certa: ${correta})<br>`;
        }

        // Adiciona a explicação da pergunta no resultado
        lista += `<em>${explicacoes[i]}</em><hr>`;
    }

    //variavel pra receber a lista e mostrar no html
    let gabaritoElemento = document.getElementById("listaGabarito");
    gabaritoElemento.innerHTML = lista;

    //Evento para remover as perguntas e mostrar o gabarito caso o usuario clique no botão do mostrar gabarito
    let mostrar_gabarito = document.getElementById('mostrar_gabarito')
    mostrar_gabarito.addEventListener('click', function () {
        res.style.display = "none"
        document.getElementById("gabarito").style.display = "block";
        let texto_gabarito = document.getElementById("texto-gabarito");
        texto_gabarito.classList.add("texto-gabarito")
    })

    //tirar as perguntas e mostrar o resultado
    document.getElementById("containerPrincipal").style.display = "none";
    document.getElementById("res").style.display = "block";

    //Variaveis para pegar e manipular o H2 e as imagens
    let texto = document.getElementById("textoResultado");
    let imagem = document.getElementById("imagemResultado");

    //logica pra definir sua colocação atraves do veredito
    if (veredito === "Velha Guarda") {
        texto.innerText = "Você é da Velha Guarda! Respeito máximo!";
        imagem.src = "img/velha_guarda.jpeg";
    } else if (veredito === "Raiz") {
        texto.innerText = "Você é Flamenguista Raiz! 🔴⚫";
        imagem.src = "img/raiz.jpeg";
    } else if (veredito === "Modinha") {
        texto.innerText = "Você é Modinha, entrou na onda pós-2019 😅";
        imagem.src = "img/modinha.jpeg";
    } else if (veredito === "Quase Mengo") {
        texto.innerText = "Tá quase virando flamenguista de verdade 😅";
        imagem.src = "img/quase_mengo.jpeg";
    } else {
        texto.innerText = "Ihhh... Tá mais pra Vascaíno mesmo! 🤣";
        imagem.src = "img/vascaino.jpeg";
    }

    // Mostrar a div de compartilhar
    let divCompartilhar = document.getElementById('compartilharResultado');
    let mensagemCompartilhar = document.getElementById('mensagemCompartilhar');
    let linkWhatsApp = document.getElementById('linkWhatsApp');

    // Monta a mensagem que vai aparecer no parágrafo e no WhatsApp
    let mensagem = `Eu acertei ${totalAcertos} perguntas no Quiz do Flamengo e meu nível é: ${veredito}! Faça você também: ${window.location.href}`;

    // Exibe a mensagem no parágrafo
    mensagemCompartilhar.innerText = mensagem;

    // Monta o link do WhatsApp (com texto codificado para URL)
    linkWhatsApp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;

    // Mostra a div
    divCompartilhar.style.display = 'block';
}

//Caixinha estilizada pra alertar o usuario a marcar uma questão antes de continuar
function mostrarAlerta(mensagem) {
    let alerta = document.getElementById('alertaPersonalizado');
    let texto = document.getElementById('mensagemAlerta');
    texto.innerText = "Selecione uma resposta antes de continuar.";
    alerta.style.display = 'block';
}
//função de fechar o pop up
function fecharAlerta() {
    document.getElementById('alertaPersonalizado').style.display = 'none';
}

//Variaveis pra serem manipuladas no cronometro
let tempoRestante = 30;
let intervaloTempo;

function iniciarCronometro() {
    // Para qualquer contador anterior
    clearInterval(intervaloTempo);

    // Define o tempo inicial da pergunta
    tempoRestante = 30;

    // pega o span tempo onde ta o numero do cronometro pra manipular
    let elementoTempo = document.getElementById("tempo");

    // Atualiza o tempo inicialmente (30) sem aplicar a classe vermelha
    elementoTempo.innerText = tempoRestante;
    elementoTempo.classList.remove('tempo-baixo'); // garante que o cronometro inicie sem a classe de tempo baixo

    // Inicia novo contador
    intervaloTempo = setInterval(function () {
        tempoRestante = tempoRestante - 1;
        elementoTempo.innerText = tempoRestante;

        // Verifica se o tempo está baixo a cada segundo e adiciona a classe
        if (tempoRestante <= 10) {
            elementoTempo.classList.add('tempo-baixo');
        } else {
            elementoTempo.classList.remove('tempo-baixo');
        }

        //If vereficia se acabou o tempo, zera o intervalo marca visualmente a questão como "A" é avança botao proximo
        if (tempoRestante <= 0) {
            clearInterval(intervaloTempo);
            marcarRespostaVaziaESelecionar();
            document.getElementById('proximo').click();
        }
    }, 1000);
}
//Função que faz as repostas do usuario ficarem em branco
//So fica em branco se ele n responder no tempo
//Visualemnte a classe de estilo é marcado no A pra permitir avançar e pra q ele volte dps
function marcarRespostaVaziaESelecionar() {
    // Salva a resposta da pergunta atual como vazia
    if (perguntaAtual === 1) resposta1 = "";
    else if (perguntaAtual === 2) resposta2 = "";
    else if (perguntaAtual === 3) resposta3 = "";
    else if (perguntaAtual === 4) resposta4 = "";
    else if (perguntaAtual === 5) resposta5 = "";
    else if (perguntaAtual === 6) resposta6 = "";
    else if (perguntaAtual === 7) resposta7 = "";
    else if (perguntaAtual === 8) resposta8 = "";

    // Limpa as seleções visuais
    A.classList.remove('selecionada');
    B.classList.remove('selecionada');
    C.classList.remove('selecionada');
    D.classList.remove('selecionada');

    // Marca a alternativa A visualmente para liberar o botão "Próximo"
    A.classList.add('selecionada');
}


//Botao que avança uma pergunta apos a outra até o fim
proximo.addEventListener('click', function () {
    //If para sa
    let respostaAtual = "";
    if (perguntaAtual === 1) respostaAtual = resposta1;
    else if (perguntaAtual === 2) respostaAtual = resposta2;
    else if (perguntaAtual === 3) respostaAtual = resposta3;
    else if (perguntaAtual === 4) respostaAtual = resposta4;
    else if (perguntaAtual === 5) respostaAtual = resposta5;
    else if (perguntaAtual === 6) respostaAtual = resposta6;
    else if (perguntaAtual === 7) respostaAtual = resposta7;
    else if (perguntaAtual === 8) respostaAtual = resposta8;
    //função para impedir que usuario deixe uma pergunta sem responder
    if (
        !A.classList.contains('selecionada') &&
        !B.classList.contains('selecionada') &&
        !C.classList.contains('selecionada') &&
        !D.classList.contains('selecionada') &&
        respostaAtual === ""
    ) {
        mostrarAlerta()
        return; // Interrompe a função
    }

    //caso a pergunta for < 8 ou seja, não seja a ultima, ele mostra o evento mostrarPergunta()
    //Caso chegue na ultima ele muda e mostra o mostrarResultado();
    if (perguntaAtual < 8) {
        perguntaAtual++
        mostrarPergunta()
    }
    else {
        mostrarResultado();
        clearInterval(intervaloTempo); // para o cronômetro
        document.getElementById('temporizador').style.display = 'none'; // esconde o cronômetroF
    }
})

//Botão para voltar e mudar a pergunta
let voltar = document.getElementById('voltar')
voltar.addEventListener('click', function () {

    if (perguntaAtual > 1) {
        perguntaAtual--
        mostrarPergunta()
    }
    else {
        mostrarPergunta();
    }
})
// Começa o quiz na pergunta 1, configurando tudo e iniciando o cronômetro
mostrarPergunta();


