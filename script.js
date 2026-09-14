// -------------------------------------------------------------------------
// TRABALHO DE CONCLUSAO DE CURSO - ADS SEMESTRE 6
// PROJETO: SISTEMA DE GESTAO DE CLINICA MEDICA (VITACARE)
// -------------------------------------------------------------------------

// Função simples para navegar entre as abas do sistema
function trocarAba(event, abaId) {
    // Esconde todas as abas
    var abas = document.getElementsByClassName("aba-conteudo");
    for (var i = 0; i < abas.length; i++) {
        abas[i].classList.remove("active");
    }

    // Desmarca botões
    var btns = document.getElementsByClassName("tab-btn");
    for (var j = 0; j < btns.length; j++) {
        btns[j].classList.remove("active");
    }

    // Mostra a aba clicada
    document.getElementById(abaId).classList.add("active");
    event.currentTarget.classList.add("active");
}

// Simulador de cadastro de paciente (RF01)
function salvarPacienteMock(event) {
    event.preventDefault();

    var nome = document.getElementById("nomePac").value;
    var cpf = document.getElementById("cpfPac").value;
    var conv = document.getElementById("convPac").value;

    var tabela = document.getElementById("tabelaPacientes");
    var novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td>3</td>
        <td>${nome}</td>
        <td>${cpf}</td>
        <td>${conv}</td>
        <td><button onclick="abrirHistorico('${nome}')">Ver Prontuário</button></td>
    `;

    alert("Paciente cadastrado com sucesso!");
    document.getElementById("formPaciente").reset();
}

// Função para confirmar presença na recepção (RN02)
function confirmarPresenca(btn) {
    var tdStatus = btn.parentElement.previousElementSibling;
    tdStatus.innerHTML = '<span class="badge verde">Confirmado</span>';
    btn.setAttribute("onclick", "alert('Presença já confirmada.')");
    btn.innerText = "Confirmado";
    alert("RN02: Presença confirmada! O paciente agora aparece liberado para a consulta médica.");
}

// Simulador de finalização de consulta pelo médico (RF03 / RN03)
function finalizarConsultaMock(event) {
    event.preventDefault();
    alert("Consulta finalizada com sucesso!\n\nRN03 Aplicada: Cálculo de coparticipação realizado e enviado ao faturamento.");
    event.target.reset();
}

// Abrir histórico do paciente no modal (UC09 / RNF03)
function abrirHistorico(nome) {
    document.getElementById("nomePacModal").innerText = "Prontuário - " + nome;
    document.getElementById("modalProntuario").style.display = "block";
}

function fecharModal() {
    document.getElementById("modalProntuario").style.display = "none";
}
