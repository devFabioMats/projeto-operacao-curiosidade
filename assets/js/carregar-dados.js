const colaborador = [
    {
        status: "Ativo",
        nome: "Fabio Matsumoto",
        idade: 21,
        email: "fabio@gmail.com",
        endereco: "",
        interesses: "",
        sentimento: "",
        valores: ""
    },
    {
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

function carregarDados() {
    localStorage.setItem('colaboradores', JSON.stringify(colaborador));
}

const colaboradoresObj = JSON.parse(localStorage.getItem('colaboradores'));

atualizarTotalCadastros(colaboradoresObj);

function atualizarTotalCadastros(colaboradoresObj) {
    debugger;
    let totalCadastros = colaboradoresObj.length;
    document.getElementById('total').querySelector('h1').innerText = totalCadastros;
}

function carregarDadosGerais() {
    criarLista(colaboradoresObj);
}

function criarLista(colaboradoresObj) {
    let lista = document.getElementById('lista');

    colaboradoresObj.forEach(colaborador => {
        let spanNome = document.createElement('span');
        spanNome.innerText = colaborador.nome;
        let spanEmail = document.createElement('span');
        spanEmail.innerText = colaborador.email;
        let spanStatus = document.createElement('span');
        spanStatus.innerText = colaborador.status;

        if (spanStatus.innerText === 'Inativo') {
            spanStatus.setAttribute('class', 'inativo');
        }

        let li = document.createElement('li');
        li.setAttribute('class', 'lista-item');
        li.appendChild(spanNome);
        li.appendChild(spanEmail);
        li.appendChild(spanStatus);

        lista.appendChild(li);
    })
}

const pesquisar = document.getElementById('box-pesquisar');
pesquisar.addEventListener('keyup', () => {
    let pesquisarValor = pesquisar.value.toLowerCase();
    const lista = document.getElementById('lista');
    const colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];

    lista.innerHTML = `
        <li class="lista-header">
            <span>Nome</span>
            <span>E-mail</span>
            <span>Status</span>
        </li>
    `;

    colaboradores.forEach(colaborador => {
        if (colaborador.nome.toLowerCase().includes(pesquisarValor)) {
            criarLista([colaborador]);
        }
    })
})

window.onload = carregarDadosGerais;