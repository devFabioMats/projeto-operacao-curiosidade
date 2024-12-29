// GET todos os administradores
async function carregarAdministradores() {
    let todosAdministradores = await fetch("https://localhost:7123/oc-api/Usuario/ObterTodos")
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na requisição');
            }
            return response.json();
        })
    criarListaAdministradores(todosAdministradores);
}

function criarListaAdministradores(administradores) {
    let lista = document.getElementById('lista');

    lista.innerHTML = `
        <li class="lista-header">
            <span>NOME</span>
            <span id="span-email">EMAIL</span>
            <span class="acoes">AÇÕES</span>
        </li>
    `;

    administradores.forEach(administrador => {
        let spanNome = document.createElement('span');
        spanNome.innerText = administrador.nome;
        let spanEmail = document.createElement('span');
        spanEmail.innerText = administrador.email;
        spanEmail.setAttribute('class', 'span-email');

        let spanAcoes = document.createElement('span');
        spanAcoes.classList.add('acoes');

        let btnEditar = document.createElement('span');
        btnEditar.classList.add('material-symbols-outlined');
        btnEditar.setAttribute('id', 'editar');
        btnEditar.innerText = 'edit';
        btnEditar.style.cursor = 'pointer';
        btnEditar.addEventListener('click', () => redirecionarEditarAdministrador(administrador.id));

        let btnDeletar = document.createElement('span');
        btnDeletar.classList.add('material-symbols-outlined');
        btnDeletar.setAttribute('id', 'deletar');
        btnDeletar.innerText = 'delete_forever';
        btnDeletar.style.cursor = 'pointer';
        btnDeletar.addEventListener('click', () => deletarAdministrador(administrador.id));

        spanAcoes.appendChild(btnEditar);
        spanAcoes.appendChild(btnDeletar);

        let li = document.createElement('li');
        li.setAttribute('class', 'lista-item');
        li.appendChild(spanNome);
        li.appendChild(spanEmail);
        li.appendChild(spanAcoes);

        lista.appendChild(li);
    })
}

// DELETE administrador
async function deletarAdministrador(idAdministrador) {
    await fetch(`https://localhost:7123/oc-api/Administrador/${idAdministrador}`, {
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

// REDIRECIONAR para editar administrador
function redirecionarEditarAdministrador(idAdministrador) {
    window.location.href = `../pages/tela-editar-administrador.html?id=${idAdministrador}`;
}