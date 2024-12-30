const token = localStorage.getItem('tokenUsuario');

// GET dashboard
async function carregarDashboard() {
    let cards = await fetch("https://localhost:7123/oc-api/Colaborador/Dashboard")
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na requisição');
            }
            return response.json();
        })

    document.getElementById('total').querySelector('h1').innerText = cards.totalCadastros;
    document.getElementById('inativos').querySelector('h1').innerText = cards.cadastrosInativos;
    document.getElementById('pendentes').querySelector('h1').innerText = cards.cadastrosPendentes;
}

// GET todos os colaboradores
async function carregarColaboradores() {
    let todosColaboradores = await fetch("https://localhost:7123/oc-api/Colaborador/ObterTodos")
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na requisição');
            }
            return response.json();
        })
    criarLista(todosColaboradores);
}

// GET por nome
const pesquisar = document.getElementById('box-pesquisar');
if (pesquisar) {
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
        if (pesquisarValor === "") {
            carregarColaboradoresHome();
        } else {
            fetch(`https://localhost:7123/oc-api/Colaborador/ObterPorNome?nome=${pesquisarValor}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Falha na requisição');
                    }
                    return response.json();
                })
                .then(colaboradoresPesquisados => {
                    criarLista(colaboradoresPesquisados);
                })
                .catch(error => console.error('Erro:', error));
        }
    });
}

// GET por id
async function pesquisarPorId(idColaborador) {
    let colaboradorPesquisado = await fetch(`https://localhost:7123/oc-api/Colaborador/${idColaborador}`)
        .then(response => { 
            if (!response.ok) {
                throw new Error('Falha na requisição');
            }
            return response.json();
        })
        .catch(error => console.error('Erro:', error));

    return colaboradorPesquisado;
}

//PUT
async function editarColaborador() {
    const queryString = window.location.search; // Contains "?id=<The Given ID>"
    const params = new URLSearchParams(queryString); // Converts the query string to javascript object
    const idColaborador = Number.parseInt(params.get("id")); // Contains the ID given

    let colaborador = await pesquisarPorId(idColaborador);

    document.getElementById('nome-editar').value = colaborador.nome;
    document.getElementById('idade').value = colaborador.idade;
    document.getElementById('email').value = colaborador.email;
    document.getElementById('endereco').value = colaborador.endereco;
    document.getElementById('interesses').value = colaborador.interesses;
    document.getElementById('sentimentos').value = colaborador.sentimentos;
    document.getElementById('valores').value = colaborador.valores;
}

// DELETE
async function deletarColaborador(idColaborador) {
    await fetch(`https://localhost:7123/oc-api/Colaborador/${idColaborador}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na requisição');
            }
            return response.json();
        })
        .catch(error => console.error('Erro:', error));

    window.location.reload();
}

// REDIRECIONAR
function redirecionarEditarColaborador(idColaborador) {
    setTempoAtual();
    if (localStorage.getItem('tokenUsuario') == 'false') {
        window.location.href = "../pages/tela-login.html";
        logout();
    } else if (Number.parseInt(localStorage.getItem('minutoLimite')) <= Number.parseInt(localStorage.getItem('minutoTotal'))) {
        logout();
        window.alert('⏰ Sessão expirada. Faça login novamente.');
    } else {
        window.location.href = `../pages/tela-editar-cadastro.html?id=${idColaborador}`;
    }
}

function carregarColaboradoresHome() {
    carregarColaboradores();
    carregarDashboard();
}

function criarLista(colaboradores) {
    let lista = document.getElementById('lista');

    lista.innerHTML = `
        <li class="lista-header">
            <span>NOME</span>
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

        if (spanStatus.innerText === 'false') {
            spanStatus.innerText = 'Inativo';
            spanStatus.setAttribute('class', 'inativo');
        } else {
            spanStatus.innerText = 'Ativo';
        }

        let spanAcoes = document.createElement('span');
        spanAcoes.classList.add('acoes');

        let btnEditar = document.createElement('span');
        btnEditar.classList.add('material-symbols-outlined');
        btnEditar.setAttribute('id', 'editar');
        btnEditar.innerText = 'edit';
        btnEditar.style.cursor = 'pointer';
        btnEditar.addEventListener('click', () => redirecionarEditarColaborador(colaborador.id));

        let btnDeletar = document.createElement('span');
        btnDeletar.classList.add('material-symbols-outlined');
        btnDeletar.setAttribute('id', 'deletar');
        btnDeletar.innerText = 'delete_forever';
        btnDeletar.style.cursor = 'pointer';
        btnDeletar.addEventListener('click', () => verificarSessaoEDeletar(colaborador.id));

        spanAcoes.appendChild(btnEditar);
        spanAcoes.appendChild(btnDeletar);

        let li = document.createElement('li');
        li.setAttribute('class', 'lista-item');
        li.appendChild(spanNome);
        li.appendChild(spanEmail);
        li.appendChild(spanStatus);
        li.appendChild(spanAcoes);

        lista.appendChild(li);
    })
}

function setTempoAtual() {
    const d = new Date();
    let horaAtual = d.getHours() * 60;
    let minutoAtual = d.getMinutes();
    let minutoTotal = horaAtual + minutoAtual;
    localStorage.setItem('minutoTotal', minutoTotal);
}

function logout() {
    localStorage.removeItem('tokenUsuario');
    localStorage.removeItem('minutoTotal');
    localStorage.removeItem('minutoLimite');
    window.location.href = "../pages/tela-login.html";
}

function verificarSessaoEDeletar(idColaborador) {
    setTempoAtual();
    if (localStorage.getItem('tokenUsuario') == 'false') {
        window.location.href = "../pages/tela-login.html";
        logout();
    } else if (Number.parseInt(localStorage.getItem('minutoLimite')) <= Number.parseInt(localStorage.getItem('minutoTotal'))) {
        logout();
        window.alert('⏰ Sessão expirada. Faça login novamente.');
    } else {
        deletarColaborador(idColaborador);
    }
}