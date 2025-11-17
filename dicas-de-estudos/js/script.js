const dicas = [
`Organize seu tempo e transforme estudo em hábito, não em peso`,
`Pequenos passos diários geram grandes resultados no aprendizado`,
`Estudar com foco é melhor que estudar por horas sem atenção`,
`Entenda, não decore: o conhecimento verdadeiro permanece`,
`Revisar é tão importante quanto aprender`,
`Crie metas realistas e comemore cada progresso`,
`Ambiente organizado, mente organizada`,
`Faça pausas: o cérebro também precisa respirar`,
`Pratique: a repetição é o segredo da memorização`,
`Estudar hoje é investir em todas as suas manhãs`,
];
const estudos  = document.querySelector('#estudos');
const botao = document.querySelector('#botao');

function gerarDicas(){
      const indiceAleatorio = Math.floor(Math.random() * dicas.length);
      estudos.innerText = dicas[indiceAleatorio];
};
botao.addEventListener('click', gerarDicas);