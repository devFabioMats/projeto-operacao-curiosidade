document.querySelector("#btn-gravar").addEventListener("click", (event) => {
    event.preventDefault();
    gravar();
});

// function gerarId() {
//     const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let id;
//     for (let i = 0; i < 4; i++) {
//         id = id + caracteres.charAt(Math.floor(Math.random() * caracteres.length));
//     }
//     return id;
// }

function validacao(nome) {
    if (nome == "") {
        alert("⚠️ O campo nome deve estar preenchido.");
        return false;
    }
    return true;
}

function gravar() {
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

    if (!validacao(nome)) {
        return;
    }

    let colaborador = {
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
}