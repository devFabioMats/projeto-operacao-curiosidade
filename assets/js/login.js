let tentativas = 0;
let tentativasLimite = 3;

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector("#btn-login");
    if (btn) {
        btn.addEventListener("click", event => {
            event.preventDefault();
            login();
        });
    }
});

async function login() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    if (email === "" || senha === "") {
        alert("⚠️ Todos os campos devem estar preenchidos.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("⚠️ O campo de login deve conter um '@' e o '.dominio'.");
        return;
    }

    let loginUsuario = {
        email,
        senha
    };

    const requisicaoToken = await fetch(`https://localhost:7123/oc-api/Usuario/Login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUsuario)
    }).then(response => {
        if (!response.ok) {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('401');
                } else if (response.status === 429) {
                    throw new Error('429');
                } else {
                    throw new Error('Falha na requisição');
                }
            }
        }
        return response.json();
    }).catch(error => {
        console.log('Erro:', error);
        if (error.message === '401') {
            tentativas++;
            window.alert(`❌ Login ou senha incorretos. Tentativas restantes: ${tentativasLimite - tentativas}`);
        } else if (error.message === '429') {
            window.alert('❌ Muitas tentativas. Tente novamente mais tarde.');
        } else {
            window.alert('❌ Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    });

    const token = requisicaoToken.token;
    localStorage.setItem('tokenUsuario', token.token);
    if (token) {
        tentativas = 0;
        setTemporizador();
        window.location.href = "../pages/tela-pagina-inicial.html";
    }
}

function setTemporizador() {
    setTempoAtual();
    setTempoLimite();
}

function setTempoLimite() {
    let minutoLimite = Number.parseInt(localStorage.getItem('minutoTotal')) + 30;
    localStorage.setItem('minutoLimite', minutoLimite);
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

function verificarSessao() {
    setTempoAtual();
    if (localStorage.getItem('tokenUsuario') == 'false') {
        logout();
    } else if (Number.parseInt(localStorage.getItem('minutoLimite')) <= Number.parseInt(localStorage.getItem('minutoTotal'))) {
        logout();
    }
}