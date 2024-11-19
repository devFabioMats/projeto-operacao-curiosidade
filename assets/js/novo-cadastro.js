

function validacao(nome) {
    if (nome == "") {
        alert("⚠️ O campo nome deve estar preenchido.");
        return false;
    }
    return true;
}

function gravar() {
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let email = document.getElementById("email").value;
    let endereco = document.getElementById("endereco").value;
    let interesses = document.getElementById("interesses").value;
    let sentimento = document.getElementById("sentimento").value;
    let valores = document.getElementById("valores").value;

    if (!validacao(nome)) {
        return;
    }

    let colaborador = {
        id: 
        nome,
        idade,
        email,
        endereco,
        interesses,
        sentimento,
        valores
    };

    localStorage.setItem('colaboradores', JSON.stringify(colaborador));
    alert("✅ Colaborador cadastrado!");
}