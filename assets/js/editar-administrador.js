const token = localStorage.getItem('tokenUsuario');

document.querySelector("#btn-alterar").addEventListener("click", (event) => {
    event.preventDefault();
    verificarSessaoEEditar();
});

function validacao(nome, email, senha) {
    if (nome == "") {
        alert("⚠️ O campo nome deve estar preenchido.");
        return false;
    }

    if (email == "") {
        alert("⚠️ O campo email deve estar preenchido.");
        return false;
    } else if (!email.includes("@") || !email.includes(".")) {
        alert("⚠️ O campo de login deve conter um '@' e o '.dominio'.");
        return false;
    }

    if (senha == "") {
        alert("⚠️ O campo senha deve estar preenchido.");
        return false;
    }

    return true;
}

async function carregarAdministrador() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const idAdministrador = Number.parseInt(params.get("id"));

    let administrador = await fetch(`https://localhost:7123/oc-api/Usuario/${idAdministrador}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na requisição');
            }
            return response.json();
        })
        .catch(error => console.error('Erro:', error));

    document.getElementById('nome-editar').value = administrador.nome;
    document.getElementById('email').value = administrador.email;
    document.getElementById('senha').value = administrador.senha;
}

async function editar() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const idAdministrador = Number.parseInt(params.get("id"));

    let nome = document.getElementById("nome-editar").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if (!validacao(nome, email, senha)) {
        return;
    }

    let administrador = {
        id: idAdministrador,
        nome,
        email,
        senha
    };

    await fetch(`https://localhost:7123/oc-api/Usuario/${idAdministrador}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(administrador)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        return response.json();
    }).then(data => {
        window.location.href = "../pages/tela-administrador.html";
    }).catch(error => console.error('Erro:', error));
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

function verificarSessaoEEditar() {
    setTempoAtual();
    if (localStorage.getItem('tokenUsuario') == 'false') {
        window.location.href = "../pages/tela-login.html";
        logout();
        window.alert('⏰ Sessão expirada. Faça login novamente.');
    } else if (Number.parseInt(localStorage.getItem('minutoLimite')) <= Number.parseInt(localStorage.getItem('minutoTotal'))) {
        logout();
        window.alert('⏰ Sessão expirada. Faça login novamente.');
    } else {
        editar();
    }
}