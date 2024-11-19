const tentativas = 3;
const login = "fabio@gmail.com";
const senha = 123;

function validacao(event) {
    event.preventDefault();
    let login_usuario = document.getElementById("login").value;
    let senha_usuario = document.getElementById("senha").value;

    if (login_usuario == login && senha_usuario == senha) {
        window.location.href = "./pages/tela-pagina-inicial.html";
        return false;
    } else {
        tentativas--;
        alert("Login ou senha inválido. Você tem " + tentativas + " tentativas;");
    }
}