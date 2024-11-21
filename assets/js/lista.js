const colaborador = [
    {
        status: "Ativo",
        nome: "Fulano",
        idade: 30,
        email: "fabio@gmail.com",
        endereco: "",
        interesses: "",
        sentimento: "",
        valores: ""
    },
    {
        status: "Ativo",
        nome: "fabio",
        idade: 30,
        email: "fabio@gmail.com",
        endereco: "",
        interesses: "",
        sentimento: "",
        valores: ""
    },
    {
        status: "Inativo",
        nome: "caio",
        idade: 30,
        email: "fabio@gmail.com",
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

        if(spanStatus.innerText === 'Inativo') {
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
    lista.innerHTML = '';
    colaboradores.forEach(colaborador => {
        if(colaborador.nome.toLowerCase().includes(pesquisarValor)) {
            criarLista([colaborador]);
        }
    })
})