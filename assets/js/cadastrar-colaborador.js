document.querySelector("#btn-gravar").addEventListener("click", (event) => {
    event.preventDefault();
    gravar();
});

function gerarId() {
    return Math.floor(Math.random() * 1000000);
}

function validacao(nome, email, idade) {
    if (nome == "") {
        alert("⚠️ O campo nome deve estar preenchido.");
        return false;
    } else if (email == "") {
        alert("⚠️ O campo email deve estar preenchido.");
        return false;
    } else if (idade == "") {
        alert("⚠️ O campo idade deve estar preenchido.");
        return false;
    }
    return true;
}

function gravar() {
    let id = gerarId();
    let nome = document.getElementById("nome-cadastro").value;
    let status = document.getElementById("status");
    let idade = document.getElementById("idade").value;
    let email = document.getElementById("email").value;
    let endereco = document.getElementById("endereco").value;
    let interesses = document.getElementById("interesses").value;
    let sentimento = document.getElementById("sentimento").value;
    let valores = document.getElementById("valores").value;

    if (status.checked) {
        status = "Ativo";
    } else {
        status = "Inativo";
    }

    if (!validacao(nome, email, idade)) {
        return;
    }

    let colaborador = {
        id,
        status,
        nome,
        idade,
        email,
        endereco,
        interesses,
        sentimento,
        valores
    };

    let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];

    colaboradores.push(colaborador);

    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));

    alert("✅ Colaborador cadastrado!");

    window.location.href = "../pages/tela-cadastro.html";
}