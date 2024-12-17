// GET dashboard
async function carregarDashboard(colaboradores) {
    let totalCadastros = colaboradores.length;
    let totalInativos = colaboradores.filter(colaborador => colaborador.status === 'Inativo').length;
    let totalPendentes = 0;

    colaboradores.forEach(colaborador => {
        if (colaborador.endereco == "" || colaborador.interesses == "" || colaborador.sentimento == "" || colaborador.valores == "") {
            totalPendentes++;
        }
    })

    document.getElementById('total').querySelector('h1').innerText = totalCadastros;
    document.getElementById('inativos').querySelector('h1').innerText = totalInativos;
    document.getElementById('pendentes').querySelector('h1').innerText = totalPendentes;
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
        .then((response) => {   // then, pegue a resposta do servidor
            if (!response.ok) {
                throw new Error('Falha na requisição');
            }
            return response.json();
        })
        .catch(error => console.error('Erro:', error));

    console.log(colaboradorPesquisado);
}

// PUT
function editarColaborador(idColaborador) {
    window.location.href = "../pages/tela-editar-cadastro.html";
    pesquisarPorId(idColaborador);
    // let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
    // colaboradores = colaboradores.filter(colaborador => colaborador.id !== idColaborador);
    // localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
    // carregarColaboradores();
    // alert("🗑️ Colaborador deletado!");
    // window.location.reload();
}

// DELETE
function deletarColaborador(idColaborador) {
    fetch(`https://localhost:7123/oc-api/Colaborador/${idColaborador}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
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

function carregarColaboradoresHome() {
    carregarColaboradores();
    //carregarDashboard(colaboradores);
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
        btnEditar.addEventListener('click', () => editarColaborador(colaborador.id));

        let btnDeletar = document.createElement('span');
        btnDeletar.classList.add('material-symbols-outlined');
        btnDeletar.setAttribute('id', 'deletar');
        btnDeletar.innerText = 'delete_forever';
        btnDeletar.style.cursor = 'pointer';
        btnDeletar.addEventListener('click', () => deletarColaborador(colaborador.id));

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
