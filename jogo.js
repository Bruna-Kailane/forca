let jogo;

const elementos = {
  telaInicial: document.getElementById('inicial'),
  telaJogo: document.getElementById('jogo'),
  telaCadastro: document.getElementById('cadastro'),
  telaMensagem: document.querySelector('.mensagem'),
  textoMensagem: document.querySelector('.mensagem .texto'),
  teclado: document.querySelector('.teclado'),
  palavra: document.querySelector('.palavra'),
  botoes: {
    facil: document.querySelector('.botao-facil'),
    medio: document.querySelector('.botao-medio'),
    dificil: document.querySelector('.botao-dificil'),
    cadastrar: document.querySelector('.botao-cadastrar'),
    confirmar: document.querySelector('.confirmar'),
    voltar: document.querySelector('.voltar'),
    reiniciar: document.querySelector('.reiniciar'),
  },
  boneco: [ //vetor
    document.querySelector('.boneco-cabeca'),
    document.querySelector('.boneco-corpo'),
    document.querySelector('.boneco-braco-esquerdo'),
    document.querySelector('.boneco-braco-direito'),
    document.querySelector('.boneco-perna-esquerda'),
    document.querySelector('.boneco-perna-direita'),
  ],
};

const palavras = {
  facil:[
    {palavra:'anciã', dica:'Idade avançada'},
    {palavra:'série', dica:'Sucessão de fatos ou coisas da mesma classe'},
    {palavra:'avaro', dica:'Obsessão por dinheiro'},
    {palavra:'maior', dica:'Superior a outro'},
  ],
  medio:[
    {palavra:'cônjuge', dica:'Casado'},
    {palavra:'exceção', dica:'Desvio de regra'},
    {palavra:'caráter', dica:'Conjunto de características'},
    {palavra:'sublime', dica:'Extraordinário'},
  ],
  dificil:[
    {palavra:'concepção', dica:'Ponto de vista'},
    {palavra:'plenitude', dica:'Inteiro, completo'},
    {palavra:'hipócrita', dica:'Fingido, Falso'},
    {palavra:'essencial', dica:'Importante'},
  ],
};

//funcao
const novoJogo = () => {
  jogo = {
    dificuldade: undefined,
    palavra: {
      original: undefined,
      semAcentos: undefined,
      tamanho: undefined,
      dica: undefined,
    },
    acertos: undefined,
    jogadas: [],
    chances: 6,
    //metodos
    definirPalavra: function (p) {
      this.palavra.original = p.palavra;
      this.palavra.tamanho = p.palavra.length;
      this.palavra.dica = p.dica;
      this.acertos = '';
      this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); //remove acentos
      for (let i = 0; i < this.palavra.tamanho; i++) {
        this.acertos += ' ';
      }
    },
    jogar: function (letraJogada) {
      let acertou = false;
      for (let i = 0; i < this.palavra.tamanho; i++) {
        const letra = this.palavra.semAcentos[i].toLowerCase(); //toLowerCase = converter para minuscula
        if (letra === letraJogada.toLowerCase()) {
          acertou = true;
          this.acertos = replace(this.acertos, i, this.palavra.original[i]);
        }
      }
      if (!acertou) {
        this.chances--;
      }
      return acertou;
    },
    ganhou: function () {
      return !this.acertos.includes(' ');
    },
    perdeu: function () {
      return this.chances <= 0;
    },
    acabou: function () {
      return this.ganhou() || this.perdeu();
    },
  };

  elementos.telaInicial.style.display = 'flex'; //flex = voltar - para tela inicial 
  elementos.telaJogo.style.display = 'none'; //none = ocultar - a tela do jogo
  elementos.telaCadastro.style.display = 'none';
  elementos.telaMensagem.style.display = 'none';//none = ocultar
  elementos.telaMensagem.classList.remove('mensagem-vitoria');
  elementos.telaMensagem.classList.remove('mensagem-derrota');
  for (const parte of elementos.boneco) {
    parte.classList.remove('escondido');
    parte.classList.add('escondido');
  }

  criarTeclado();
};

const criarTeclado = () => {
  const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  elementos.teclado.textContent = '';
  for (const letra of letras) {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(letra.toUpperCase()));
    button.classList.add(`botao-${letra}`);

    elementos.teclado.appendChild(button);

    button.addEventListener('click', () => {
      if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {
        const acertou = jogo.jogar(letra);
        jogo.jogadas.push(letra);
        button.classList.add(acertou ? 'certo' : 'errado');
        mostrarPalavra();

        if (!acertou) {
          mostrarErro();
        }

        if (jogo.ganhou()) {
          mostrarMensagem(true);
        } else if (jogo.perdeu()) {
          mostrarMensagem(false);
        }
      }
    });
  }
};

const mostrarErro = () => {
  const parte = elementos.boneco[5 - jogo.chances];
  parte.classList.remove('escondido');
};

const mostrarMensagem = vitoria => {
  const mensagem = vitoria ? '<p>Parabéns!</p><p>Você GANHOU!</p>' : '<p>Que pena!</p><p>Você PERDEU!</p>';
  elementos.textoMensagem.innerHTML = mensagem;
  elementos.telaMensagem.style.display = 'flex'; //mostrar tela msg
  elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`);
};

const mostrarDica = p =>{
  const mensagem = jogo.palavra.dica;
  elementos.textoMensagem.innerHTML = mensagem;
  elementos.telaMensagem.style.display = 'flex'; //mostrar tela msg
}

const sortearPalavra = () => {
  const i = Math.floor(Math.random() * palavras[jogo.dificuldade].length); //gerar um num aleatorio de acordo com o tamanho do vetor = palavas.facil-tam
  const palavra = palavras[jogo.dificuldade][i]; //ex: palavras.facil na posicicao 4 (que foi gereada aleatoriamente)
  jogo.definirPalavra(palavra);

  console.log(jogo.palavra.original);

  return jogo.palavra.original;
};

const cadastro = () =>{
  const palavra = document.querySelector('#palavra');
  const dica = document.querySelector('#dica');
  palavra.value;
  dica.value;
  console.log(palavra.value);
  console.log(dica.value);

  const difi = document.querySelector('#dificuldade');
  
  const selectedIndex = difi.selectedIndex;
  const dificuldade = difi.options[selectedIndex].value;
  console.log(dificuldade);
  
  const plv = {
    palavra: palavra.value,
    dica: dica.value,
  }
  
  palavras[dificuldade].push(plv)
}

const mostrarPalavra = () => {
  elementos.palavra.textContent = '';
  for (let i = 0; i < jogo.acertos.length; i++) {
    const letra = jogo.acertos[i].toUpperCase(); //toUpperCase() = mostrar maiuscula
    elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
  }
};

const iniciarJogo = dificuldade => {
  jogo.dificuldade = dificuldade;
  elementos.telaInicial.style.display = 'none'; //tela inicial some-oculta
  elementos.telaCadastro.style.display = 'none';
  elementos.telaJogo.style.display = 'flex'; //tela do jogo aparece

  sortearPalavra();
  mostrarPalavra();
  mostrarDica();
};

const cadastrarPalavra = () => {
  elementos.telaInicial.style.display = 'none'; //tela inicial some-oculta
  elementos.telaJogo.style.display = 'none'; //tela do jogo aparece
  elementos.telaCadastro.style.display = 'flex';

};

const replace = (str, i, newChar) => str.substring(0, i) + newChar + str.substring(i + 1); //substituindo a letra acertada no vetor de espaco de acerto

elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'));
elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'));
elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'));
elementos.botoes.cadastrar.addEventListener('click', () => cadastrarPalavra());
elementos.botoes.confirmar.addEventListener('click', () => cadastro());
elementos.botoes.voltar.addEventListener('click', () => novoJogo());

elementos.botoes.reiniciar.addEventListener('click', () => novoJogo());

novoJogo();
