let tentativas = 3;
const login = "fabio@gmail.com";
const senha = 123;
const btn = document.querySelector("#btn");

btn.addEventListener("click", (event) => {
    event.preventDefault();
    validacao();
});

function validacao() {
    let login_usuario = document.getElementById("login").value;
    let senha_usuario = document.getElementById("senha").value;

    if (login_usuario === "" || senha_usuario === "") {
        alert("⚠️ Todos os campos devem estar preenchidos.");
        return;
    }

    if (!login_usuario.includes("@") || !login_usuario.includes(".")) {
        alert("⚠️ O campo de login deve conter um '@' e o '.dominio'.");
        return;
    }

    if (login_usuario != login || senha_usuario != senha) {
        tentativas--;
        alert("❌ Login ou senha incorretos. Tente novamente. (Tentativas restantes: " + tentativas + ")");
        if (tentativas == 0) {
            document.getElementById("login").disabled = true;
            document.getElementById("senha").disabled = true;
        }
        return;
    } else {
        alert("✅ Login realizado com sucesso!");
        window.location.href = "../pages/tela-pagina-inicial.html";
    }

}