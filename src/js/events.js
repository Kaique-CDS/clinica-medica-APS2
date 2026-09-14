import { db } from './database.js';

export function initEvents() {
    // Eventos de formulários
    document.getElementById('formPaciente')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById("pNome").value;
        const cpf = document.getElementById("pCpf").value;
        const data = document.getElementById("pDataNasc").value;
        const sexo = document.getElementById("pSexo").value;
        const convSelect = document.getElementById("pConvenio");
        const conv = convSelect.options[convSelect.selectedIndex].text;
        const cart = document.getElementById("pCarteirinha").value || "N/A";

        const tbl = document.getElementById("tblPacientes");
        const row = tbl.insertRow();
        row.innerHTML = `<td>3</td><td>${cpf}</td><td>${nome}</td><td>${data}</td><td>${sexo}</td><td>${conv}</td><td>${cart}</td><td><button class="btn-secundario btn-historico" data-id="3">Ver Prontuário</button></td>`;
        
        alert("Paciente cadastrado com sucesso!");
        e.target.reset();
    });

    document.getElementById('formAgendamento')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Consulta agendada com sucesso!");
        e.target.reset();
    });

    document.getElementById('formConsulta')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const diag = document.getElementById("cDiagnostico").value;
        const exame = document.getElementById("solExame").value;

        let msg = `Consulta médica finalizada com sucesso!\n- Diagnóstico: ${diag}\n- Prescrição registrada.`;
        if (exame) { msg += `\n- Solicitação de Exame enviada para o módulo de exames: ${exame}`; }
        
        alert(msg);
        e.target.reset();
    });

    // Eventos delegados na página
    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('btn-confirmar-presenca')) {
            target.parentElement.previousElementSibling.innerHTML = '<span class="badge badge-verde">Confirmado</span>';
            target.outerHTML = '<button class="btn-secundario btn-ja-confirmado">Já Confirmado</button>';
            alert("Presença confirmada! O agendamento agora aparece liberado para a consulta médica.");
        }

        if (target.classList.contains('btn-atualizar-exame')) {
            const id = target.getAttribute('data-id');
            const st = prompt("Digite o novo status do exame (Solicitado, Agendado, Realizado, Cancelado):", "Realizado");
            if (st) {
                if (st === "Realizado") { prompt("Digite o laudo do exame:", "Exame sem alterações significativas."); }
                alert("Status e Resultado do exame #" + id + " atualizados!");
            }
        }

        if (target.classList.contains('btn-receber-pagamento')) {
            const id = target.getAttribute('data-id');
            const forma = prompt("Selecione a forma de pagamento (PIX, Cartão de Crédito, Cartão de Débito, Dinheiro):", "PIX");
            if (forma) {
                alert("Pagamento #" + id + " recebido via " + forma + ".");
            }
        }

        if (target.classList.contains('btn-historico')) {
            const id = target.getAttribute('data-id');
            verHistorico(id);
        }

        if (target.id === 'btnFecharModal') {
            document.getElementById("modalProntuario").style.display = "none";
        }
    });
}

function verHistorico(id) {
    const nomes = { 1: "Carlos Eduardo Santos", 2: "Mariana Costa Alves", 3: "Novo Paciente" };
    const nome = nomes[id] || "Paciente";

    const html = `
        <p><strong>Paciente:</strong> ${nome} | <strong>Prontuário Nº:</strong> ${id}0492</p>
        <hr>
        <h4>Histórico de Consultas</h4>
        <p><strong>Data:</strong> 10/08/2026 | <strong>Médico:</strong> Dr. Roberto Silva (CRM/SP 123456)</p>
        <p><strong>Queixa:</strong> Cansaço e dores de cabeça persistentes.</p>
        <p><strong>Diagnóstico:</strong> I10 - Hipertensão essencial (primária)</p>
        <p><strong>Prescrição:</strong> Losartana Potássica 50mg - 1 comprimido ao dia.</p>
        <hr>
        <h4>Exames Solicitados</h4>
        <p>- Ecocardiograma Transtorácico (Solicitado em 10/05/2026)</p>
    `;

    document.getElementById("mConteudo").innerHTML = html;
    document.getElementById("modalProntuario").style.display = "block";
}
