const btn = document.querySelector("#btn-login");
btn.addEventListener("click", event => {
    event.preventDefault();
    login();
});
//---------------------------------------------------------
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
            throw new Error('Falha na requisição');
        }
        return response.json();
    }).catch(error => {
        console.error('Erro:', error);
        window.alert('❌ Login ou senha incorretos. Tente novamente.');
    });

    const token = requisicaoToken.token;
    console.log(token);
    localStorage.setItem('tokenUsuario', token);
    if (token) {
        setTemporizador();
        window.location.href = "../pages/tela-pagina-inicial.html";
    }
}
//---------------------------------------------------------

// async function login() {
//     let email = document.getElementById('email').value;
//     let senha = document.getElementById('senha').value;

//     if (email === "" || senha === "") {
//         alert("⚠️ Todos os campos devem estar preenchidos.");
//         return;
//     }

//     if (!email.includes("@") || !email.includes(".")) {
//         alert("⚠️ O campo de login deve conter um '@' e o '.dominio'.");
//         return;
//     }

//     let loginUsuario = {
//         email,
//         senha
//     };

//     requisicao = await fetch(`https://localhost:7123/oc-api/Usuario/Login`, {method: 'POST', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(loginUsuario)});

//     const requisicaoJson = await requisicao.json();
//     const token = requisicaoJson.token;
//     console.log(token);
//     localStorage.setItem('tokenUsuario', token);
//     if (token) {
//         setTemporizador();
//         window.location.href = "../pages/tela-pagina-inicial.html";
//     }
// }

function setTemporizador() {
    setTempoAtual();
    setTempoLimite();
}

function setTempoLimite() {
    let minutoLimite = Number.parseInt(localStorage.getItem('minutoTotal')) + 1;
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
        window.location.href = "../pages/tela-login.html";
        logout();
    } else if (Number.parseInt(localStorage.getItem('minutoLimite')) <= Number.parseInt(localStorage.getItem('minutoTotal'))) {
        logout();
    }
}