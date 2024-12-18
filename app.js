// Lista para não repetir números sorteados.
let listaDeNumerosSorteados = [];

// Declara o número limite do jogo.
let numeroLimite = 100;

// Variável para armazenar o número aleatório.
let numeroSecreto =  gerarNumeroAleatorio();

// Variável para armazenar o número de tentativas do usuário.
let tentativas = 1;

// Função para exibir os textos através de tags.
function exibirTextoNaTela(tag, texto) {

        let campo = document.querySelector(tag);
        campo.innerHTML = texto; 
        if ('speechSynthesis' in window) {
                let utterance = new SpeechSynthesisUtterance(texto);
                utterance.lang = 'pt-BR'; 
                utterance.rate = 1.2; 
                window.speechSynthesis.speak(utterance); 
            } else {
                console.log("Web Speech API não suportada neste navegador.");
            }
};

//Função para reiniciar o jogo com as mensagens.
function exibirMensagemInicial() {

        exibirTextoNaTela('h1', 'Jogo do Número Secreto.');
        exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}.` );

};

exibirMensagemInicial();


// Redução de linhas de código ao criar funções.
exibirTextoNaTela('h1', 'Jogo do Número Secreto.');
exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}.`);

// Função para clique do botão.
function verificarChute() {

        let chute = document.querySelector('input').value;

        if ( chute == numeroSecreto) {

                exibirTextoNaTela('h1', 'Acertou!');

                let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

                let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;

                exibirTextoNaTela('p', mensagemTentativas);

                document.getElementById('reiniciar').removeAttribute('disabled');

        } else {
                if(chute > numeroSecreto) {

                        exibirTextoNaTela('p', `O número secreto é menor que ${chute}!`);

                } else {

                        exibirTextoNaTela('p', `O número secreto é maior que ${chute}!`);

                }

                tentativas++;

                limparCampo();
        }

};

// Função para limpar o campo após o chute.
function limparCampo() {

        chute = document.querySelector('input');
        chute.value = '';

};

// Função para reiniciar o jogo após acertar.
function reiniciarJogo() {

        numeroSecreto = gerarNumeroAleatorio();
        limparCampo();
        tentativas = 1;
        exibirMensagemInicial();
        document.getElementById('reiniciar').setAttribute('disabled' , true);

};

// Criada a função para gerar um número aleatório e adicionada na lista.
function gerarNumeroAleatorio() {

       let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
       let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

       if (quantidadeDeElementosNaLista == numeroLimite) {

                listaDeNumerosSorteados = [];
       };
        
       if (listaDeNumerosSorteados.includes(numeroEscolhido)) {

                return gerarNumeroAleatorio();

       } else {

                listaDeNumerosSorteados.push(numeroEscolhido);
                console.log(listaDeNumerosSorteados);
                return numeroEscolhido;

       };

};
