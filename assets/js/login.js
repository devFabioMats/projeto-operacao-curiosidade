const btn = document.querySelector("#btn-login");
btn.addEventListener("click", event => {
    event.preventDefault();
    login();
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

   

    await fetch(`https://localhost:7123/oc-api/Usuario/Login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUsuario)
    }).then(response => {
        // if (!response.ok) {
        //     throw new Error('Falha na requisição');
        // }
        const requisicao = response.json();
        const token = requisicao.token;
        localStorage.setItem('tokenUsuario', JSON.stringify(token));
    }).catch(error => {
        console.error('Erro:', error);
        window.alert('❌ Login ou senha incorretos. Tente novamente.');
    });

    // console.log(token);
    // if (token) {
    //     localStorage.setItem('tokenUsuario', JSON.stringify(token));
    //     //window.location.href = "../pages/tela-pagina-inicial.html";
    //     localStorage.removeItem('tokenUsuario');
    // }
}

function verificarAutenticacao() {
    const isAuthenticated = localStorage.getItem(token);
    if (isAuthenticated) {
        window.location.href = "../pages/tela-login.html";
    } else {
        carregarColaboradores();
    }
}

function logout() {
    localStorage.removeItem(isAuthenticated);
    window.location.href = "../pages/tela-login.html";
}