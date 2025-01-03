document.querySelector("#btn-alterar").addEventListener("click", (event) => {
    event.preventDefault();
    verificarSessaoEEditar();
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

async function editar() {
    const queryString = window.location.search; 
    const params = new URLSearchParams(queryString); 
    const idColaborador = Number.parseInt(params.get("id")); 
    let nome = document.getElementById("nome-editar").value;
    let status = document.getElementById("status");
    let idade = Number.parseInt(document.getElementById("idade").value);
    let email = document.getElementById("email").value;
    let endereco = document.getElementById("endereco").value;
    let interesses = document.getElementById("interesses").value;
    let sentimentos = document.getElementById("sentimentos").value;
    let valores = document.getElementById("valores").value;
    const token = localStorage.getItem('tokenUsuario');

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
    
    await fetch(`https://localhost:7123/oc-api/Colaborador/${idColaborador}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(colaborador)
    }).then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('400');
            } else {
                throw new Error('Falha na requisição');
            }
        }
        window.location.href = "../pages/tela-cadastro.html";
    }).catch(error => {
        console.log('Erro:', error);
        if (error.message === '400') {
            window.alert("⚠️ Nome ou email já cadastrados em outro colaborador.");
            window.location.href = "../pages/tela-cadastro.html"
        } else {
            window.alert('❌ Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    });
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