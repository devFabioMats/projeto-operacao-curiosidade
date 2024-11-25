// inicializando com alguns objetos para testar a funcionalidade
const colaborador = [
    {
        id: 123456,
        status: "Ativo",
        nome: "Fabio Matsumoto",
        idade: 21,
        email: "fabio@gmail.com",
        endereco: "Rua da Unimed, 543",
        interesses: "Judô, Futebol, Música",
        sentimento: "Amor pelo que faz",
        valores: "Retribuir a família"
    },
    {
        id: 513754,
        status: "Ativo",
        nome: "Nelson Junior",
        idade: 18,
        email: "nelsonjr@gmail.com",
        endereco: "",
        interesses: "",
        sentimento: "",
        valores: ""
    },
    {
        id: 784215,
        status: "Inativo",
        nome: "Rodrigo de Sá",
        idade: 21,
        email: "rodrigosa@outlook.com",
        endereco: "",
        interesses: "",
        sentimento: "",
        valores: ""
    },
]

// deixando os dados do localStorage chamado já pra usar nas funções
const colaboradores = JSON.parse(localStorage.getItem('colaboradores'));

// deixa os dados carregados imediatamente no login
function carregarDados() {
    localStorage.setItem('colaboradores', JSON.stringify(colaborador));
}

// dados da Dashboard
function carregarDashboard(colaboradores) {
    let totalCadastros = colaboradores.length;
    let totalInativos = colaboradores.filter(colaborador => colaborador.status === 'Inativo').length;
    let totalPendentes = 0;

    colaboradores.forEach(colaborador => {
        if (colaborador.idade == "" || colaborador.endereco == "" || colaborador.interesses == "" || colaborador.sentimento == "" || colaborador.valores == "") {
            totalPendentes++;
        }
    })

    document.getElementById('total').querySelector('h1').innerText = totalCadastros;
    document.getElementById('inativos').querySelector('h1').innerText = totalInativos;
    document.getElementById('pendentes').querySelector('h1').innerText = totalPendentes;
}

function carregarDadosGerais() {
    criarLista(colaboradores);
    carregarDashboard(colaboradores);
}

function criarLista(colaboradores) {
    let lista = document.getElementById('lista');

    lista.innerHTML = `
        <li class="lista-header">
            <span>FABIO</span>
            <span id="span-email">EMAIL</span>
            <span id="span-status">STATUS</span>
            <span class="acoes">AÇÕES</span>
        </li>
    `;

    colaboradores.forEach(colaborador => {
        let spanNome = document.createElement('span');
        spanNome.innerText = colaborador.nome;
        let spanEmail = document.createElement('span');
        spanEmail.innerText = colaborador.email;
        spanEmail.setAttribute('class', 'span-email');
        let spanStatus = document.createElement('span');
        spanStatus.innerText = colaborador.status;
        spanStatus.setAttribute('class', 'span-status');

        if (spanStatus.innerText === 'Inativo') {
            spanStatus.setAttribute('class', 'inativo');
        }

        let spanAcoes = document.createElement('span');
        spanAcoes.classList.add('acoes');
        
        // let btnDeletar = document.createElement('span');
        // btnDeletar.classList.add('material-symbols-outlined');
        // btnDeletar.innerText = 'person_remove';
        // btnDeletar.style.cursor = 'pointer';
        // btnDeletar.addEventListener('click', () => deletarColaborador(colaborador));

        // spanAcoes.appendChild(btnDeletar);

        let li = document.createElement('li');
        li.setAttribute('class', 'lista-item');
        li.appendChild(spanNome);
        li.appendChild(spanEmail);
        li.appendChild(spanStatus);
        li.appendChild(spanAcoes);

        lista.appendChild(li);
    })
}

// function deletarColaborador(colaborador) {
//     let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
//     colaboradores = colaboradores.filter(c => c.id !== colaborador.id);
//     localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
//     carregarDadosGerais();
// }

// Pesquisar colaboradores
const pesquisar = document.getElementById('box-pesquisar');
pesquisar.addEventListener('keyup', () => {
    let pesquisarValor = pesquisar.value.toLowerCase();
    const lista = document.getElementById('lista');

    lista.innerHTML = `
        <li class="lista-header">
            <span>NOME</span>
            <span id="span-email">EMAIL</span>
            <span id="span-status">STATUS</span>
            <span class="acoes">AÇÕES</span>
        </li>
    `;

    colaboradores.forEach(colaborador => {
        if (colaborador.nome.toLowerCase().includes(pesquisarValor)) {
            criarLista([colaborador]);
        }
    })
})

window.onload = carregarDadosGerais;