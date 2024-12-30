const token = localStorage.getItem('tokenUsuario');

document.querySelector("#btn-gravar").addEventListener("click", (event) => {
    event.preventDefault();
    setTempoAtual();
    verificarSessaoEGravar();
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

function gravar() {
    let nome = document.getElementById("nome-cadastro").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if (!validacao(nome, email, senha)) {
        return;
    }

    let administrador = {
        nome,
        email,
        senha
    };

    fetch(`https://localhost:7123/oc-api/Usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(administrador)
    }).then(response => {
        if (!response.ok) {
            console.log(response);
            throw new Error('Falha na requisição');
        }
        return response.json();
    }).catch(error => console.error('Erro:', error));
    window.location.href = "../pages/tela-administrador.html";
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

function verificarSessaoEGravar() {
    setTempoAtual();
    if (localStorage.getItem('tokenUsuario') == 'false') {
        window.location.href = "../pages/tela-login.html";
        logout();
        window.alert('⏰ Sessão expirada. Faça login novamente.');
    } else if (Number.parseInt(localStorage.getItem('minutoLimite')) <= Number.parseInt(localStorage.getItem('minutoTotal'))) {
        logout();
        window.alert('⏰ Sessão expirada. Faça login novamente.');
    } else {
        gravar();
    }
}