const token = localStorage.getItem('tokenUsuario');

document.querySelector("#btn-gravar").addEventListener("click", (event) => {
    event.preventDefault();
    setTempoAtual();
    verificarSessaoEGravar();
});

function validacao(nome, email, idade) {
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

    if (idade == "") {
        alert("⚠️ O campo idade deve estar preenchido.");
        return false;
    } else if (idade < 18 || idade > 100) {
        alert("⚠️ O colaborador deve ter entre 18 e 100 anos.");
        return false;
    }

    return true;
}

function gravar() {
    let nome = document.getElementById("nome-cadastro").value;
    let status = document.getElementById("status");
    let idade = Number.parseInt(document.getElementById("idade").value);
    let email = document.getElementById("email").value;
    let endereco = document.getElementById("endereco").value;
    let interesses = document.getElementById("interesses").value;
    let sentimentos = document.getElementById("sentimentos").value;
    let valores = document.getElementById("valores").value;

    if (status.checked) {
        status = true;
    } else {
        status = false;
    }

    if (!validacao(nome, email, idade)) {
        return;
    }

    let colaborador = {
        status,
        nome,
        idade,
        email,
        endereco,
        interesses,
        sentimentos,
        valores
    };

    fetch(`https://localhost:7123/oc-api/Colaborador`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(colaborador)
    }).then(response => {
        if (!response.ok) {
            console.log(response)
            throw new Error('falhou a requisição');
        }
    }).catch(error => console.error('Erro:', error));

    window.location.href = "../pages/tela-cadastro.html";
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
    window.alert('⏰ Sessão expirada. Faça login novamente.');
}

function verificarSessaoEGravar() {
    setTempoAtual();
    if (localStorage.getItem('tokenUsuario') == 'false') {
        window.location.href = "../pages/tela-login.html";
        logout();
    } else if (Number.parseInt(localStorage.getItem('minutoLimite')) <= Number.parseInt(localStorage.getItem('minutoTotal'))) {
        logout();
    } else {
        gravar();
    }
}