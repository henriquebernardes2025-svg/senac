/*
Calculadora de Pedidos

Vocês vão criar uma página interativa onde o usuário poderá montar uma refeição escolhendo itens do cardápio e as
quantidades, e o sistema calculará o valor total automaticamente.
Ao final, o projeto deve ser publicado no GitHub.
Utilizem tudo o que já aprendemos em aula com HTML, CSS e JavaScript.

1) Estrutura do projeto
Criem uma pasta chamada calculadora-refeicoes.
Dentro dela, criem:
index.html
Pasta css com style.css
Pasta js com script.js

2) HTML
A página deve conter:
Header:
Um título principal: "Calculadora de Refeições"

Main:
Uma section central contendo:
Um breve texto explicando que o usuário deve selecionar itens e quantidades
Um elemento <select> com pelo menos cinco opções de alimentos, cada um possuindo um preço fixo (os preços devem aparecer
    no select)
    Um input do tipo number para selecionar a quantidade (mínimo 1 e máximo 9)
    Um botão "Adicionar ao pedido"
    Uma div vazia com a classe erro

    Logo abaixo, criar uma section com id="pedido" contendo uma tag <ul> com id="lista-pedido"
        Cada item deverá exibir:
        Nome do alimento
        Quantidade escolhida
        Preço total do item
        Um botão "Remover"

        Abaixo da lista, exibir uma div com id="total-geral" mostrando o valor total acumulado da refeição
+
        Footer:
        Nome do aluno e data

        Dica:
        Usem tags semânticas e organizem tudo dentro de seções bem definidas.

        3) CSS
        A página deve ser organizada, bonita e responsiva:
        Fundo claro e elementos centralizados
        A lista de itens adicionados deve possuir bordas, sombra e espaçamento adequado
        O item mais caro da lista deve receber uma classe especial de destaque visual (fundo ou borda diferente)
        Os botões devem ter efeito de hover
        Utilize classes e IDs, evitando estilos inline

        4) JavaScript
        No arquivo script.js, vocês devem:
        1. Capturar os elementos do HTML usando document.querySelector
        2. Criar um objeto contendo os alimentos e seus respectivos valores
        Exemplo:
        const cardapio = { pizza: 25, salada: 12, suco: 8, ... }

        3. Criar uma função adicionarItem():
        Validar se o usuário selecionou um alimento
        Validar se a quantidade é maior que zero
        Se houver erro, exibir mensagem dentro da div erro e parar a função

        Se estiver tudo correto:
        Criar um elemento <li>
            O
        <li> deve conter:
            Nome do alimento
            Quantidade
            Preço total multiplicando preço x quantidade
            Botão "Remover"
            Adicionar o elemento
        <li> na lista

            4. Criar uma função atualizarTotal():
            Deve somar o valor de todos os itens presentes na lista
            Atualizar o texto da div com id="total-geral"

            5. Criar interação com o botão remover:
            Deve excluir apenas o item clicado
            Após remover, atualizar o valor total

            6. Destacar visualmente o item mais caro:
            Utilize comparação de valores e classList para adicionar e remover classes corretamente

            7. Adicionar eventos com addEventListener no botão e nos inputs

            5) Regras adicionais
            Não é permitido adicionar itens sem selecionar alimento ou com quantidade menor que 1
            A div de erro deve desaparecer quando o usuário corrigir o problema
            Não usar style inline ni no HTML, apenas CSS externo
            Deve existir pelo menos uma pequena animação visual (por exemplo, fade ou scale) ao inserir os itens

            6) Publicação no GitHub
            Se ainda não tiverem criado o repositório Senac no GitHub, vocês devem seguir o seguinte passo:

            No Explorador de arquivos, dentro da pasta Documentos, criem uma pasta chamada GitHub
            Abram o GitHub Desktop
            Criem um repositório chamado Senac dentro da pasta GitHub
            Após criarem o repositório ou para quem já tiver criado anteriormente
            Criem uma pasta dentro da pasta Senac chamada calculadora-refeicoes
            Coloquem o projeto dentro dessa pasta e façam:
            Commit com mensagem:
            Adiciona projeto Calculadora de Refeições
            Push origin

            OBSERVAÇÃO: TODOS OS PROJETOS SERÃO ENTREGUES EXCLUSIVAMENTE DENTRO DA PASTA SENAC
            */

const select = document.querySelector("select");
const inputQuantidade = document.querySelector("input[type='number']");
const btnAdicionar = document.querySelector("button");
const listaPedidos = document.querySelector("#lista-pedidos");
const divErro = document.querySelector(".erro");


const cardapio = {
    "salmão": 40,
    "lagosta": 120,
    "carne-wagyu": 300,
    "caviar": 500,
    "risoto-de-camarão": 60
};


function adicionarItem(e) {
    e.preventDefault();

    const alimento = select.value;
    const quantidade = Number(inputQuantidade.value);

    divErro.textContent = "";

    if (alimento === "selecione" || alimento === "") {
        divErro.textContent = "Selecione um alimento!";
        return;
    }

    if (quantidade < 1 || quantidade > 9) {
        divErro.textContent = "A quantidade deve ser entre 1 e 9.";
        return;
    }

    const precoTotal = cardapio[alimento] * quantidade;

    const li = document.createElement("li");
    li.dataset.total = precoTotal;

    li.innerHTML = `
        ${alimento.replace("-", " ")} — Quantidade: ${quantidade} — 
        Total: R$ ${precoTotal.toFixed(2)}
        <button class="remover">Remover</button>
    `;

    listaPedidos.appendChild(li);

    li.querySelector(".remover").addEventListener("click", () => {
        li.remove();
        atualizarTotal();
        destacarMaisCaro();
    });

    atualizarTotal();
    destacarMaisCaro();
}


function atualizarTotal() {
    let soma = 0;
    const itens = document.querySelectorAll("#lista-pedidos li");

    itens.forEach(item => {
        soma += Number(item.dataset.total);
    });

    let totalGeral = document.querySelector("#total-geral");

    if (!totalGeral) {
        totalGeral = document.createElement("div");
        totalGeral.id = "total-geral";
        document.querySelector("#pedidos").appendChild(totalGeral);
    }

    totalGeral.textContent = `Total: R$ ${soma.toFixed(2)}`;
}


function destacarMaisCaro() {
    const itens = document.querySelectorAll("#lista-pedidos li");

    itens.forEach(li => li.classList.remove("destaque"));

    if (itens.length === 0) return;

    let maisCaro = itens[0];

    itens.forEach(li => {
        if (Number(li.dataset.total) > Number(maisCaro.dataset.total)) {
            maisCaro = li;
        }
    });

    maisCaro.classList.add("destaque");
}


btnAdicionar.addEventListener("click", adicionarItem);

select.addEventListener("change", () => divErro.textContent = "");
inputQuantidade.addEventListener("input", () => divErro.textContent = "");