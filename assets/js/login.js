const btn = document.querySelector("#btn-login");
btn.addEventListener("click", event => {
    event.preventDefault();
    login();
});

function login() {
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

    console.log(JSON.stringify(loginUsuario));
    const retornoLoginApi = fetch(`https://localhost:7123/oc-api/Usuario/Login`, {
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
            //         // Armazene o token de autenticação no localStorage (se a API retornar um token)
            //         if (data.token) {
            //             localStorage.setItem('token', data.token);
            //             localStorage.setItem('isAuthenticated', 'true');
            //         }
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = "../pages/tela-pagina-inicial.html";
        }).catch(error => {
            console.error('Erro:', error);
            window.alert('❌ Login ou senha incorretos. Tente novamente.');
        });
}

function verificarAutenticacao() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
        window.location.href = "../pages/tela-login.html";
    } else {
        carregarColaboradores()
    }
}

function logout() {
    localStorage.setItem('isAuthenticated', 'false');
    window.location.href = "../pages/tela-login.html";
}