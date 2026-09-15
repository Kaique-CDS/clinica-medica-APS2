import { db } from './database.js';

export function renderAllTables() {
    renderUnidades();
    renderPacientes();
    renderMedicos();
    renderConvenios();
    renderMedicamentos();
    renderAgendamentos();
    renderExames();
    renderPagamentos();
    renderRelatorios();
    populateSelects();
    updateDashboardStats();
}

// 1. UNIDADES (CRUD)
export function renderUnidades() {
    const tbl = document.getElementById("tblUnidades");
    if (!tbl) return;
    tbl.innerHTML = db.unidades.map(u => `
        <tr>
            <td>${u.id}</td>
            <td><strong>${u.nome}</strong></td>
            <td>${u.endereco}</td>
            <td>${u.telefone}</td>
            <td>
                <button class="btn-secundario btn-editar-unidade" data-id="${u.id}">Editar</button>
                <button class="btn-secundario btn-excluir-unidade" data-id="${u.id}" style="background:#dc3545;">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// 2. PACIENTES (CRUD)
export function renderPacientes() {
    const tbl = document.getElementById("tblPacientes");
    if (!tbl) return;
    tbl.innerHTML = db.pacientes.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.cpf}</td>
            <td><strong>${p.nome}</strong></td>
            <td>${p.dataNasc}</td>
            <td>${p.sexo}</td>
            <td>${p.convenio}</td>
            <td>${p.carteirinha}</td>
            <td>
                <button class="btn-secundario btn-editar-paciente" data-id="${p.id}">Editar</button>
                <button class="btn-secundario btn-excluir-paciente" data-id="${p.id}" style="background:#dc3545;">Excluir</button>
                <button class="btn-secundario btn-historico" data-id="${p.id}">Prontuário</button>
            </td>
        </tr>
    `).join('');
}

// 3. MÉDICOS (CRUD)
export function renderMedicos() {
    const tbl = document.getElementById("tblMedicos");
    if (!tbl) return;
    tbl.innerHTML = db.medicos.map(m => `
        <tr>
            <td>${m.id}</td>
            <td><strong>${m.nome}</strong></td>
            <td>${m.cpf}</td>
            <td><span class="badge badge-azul">${m.crm}</span></td>
            <td>${m.especialidade}</td>
            <td>${m.telefone}</td>
            <td>
                <button class="btn-secundario btn-editar-medico" data-id="${m.id}">Editar</button>
                <button class="btn-secundario btn-excluir-medico" data-id="${m.id}" style="background:#dc3545;">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// 4. CONVÊNIOS (CRUD)
export function renderConvenios() {
    const tbl = document.getElementById("tblConvenios");
    if (!tbl) return;
    tbl.innerHTML = db.convenios.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.codigo}</td>
            <td><strong>${c.nome}</strong></td>
            <td>${c.cnpj}</td>
            <td>${c.cobertura}%</td>
            <td>
                <button class="btn-secundario btn-editar-convenio" data-id="${c.id}">Editar</button>
                <button class="btn-secundario btn-excluir-convenio" data-id="${c.id}" style="background:#dc3545;">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// 5. MEDICAMENTOS (CRUD)
export function renderMedicamentos() {
    const tbl = document.getElementById("tblMedicamentos");
    if (!tbl) return;
    tbl.innerHTML = db.medicamentos.map(med => `
        <tr>
            <td>${med.id}</td>
            <td>${med.codigo}</td>
            <td><strong>${med.nome}</strong></td>
            <td>${med.principioAtivo}</td>
            <td>${med.fabricante}</td>
            <td>${med.apresentacao}</td>
            <td>
                <button class="btn-secundario btn-editar-medicamento" data-id="${med.id}">Editar</button>
                <button class="btn-secundario btn-excluir-medicamento" data-id="${med.id}" style="background:#dc3545;">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// 6. AGENDAMENTOS
export function renderAgendamentos() {
    const tbl = document.getElementById("tblAgendamentos");
    if (!tbl) return;
    tbl.innerHTML = db.agendamentos.map(ag => `
        <tr>
            <td>${ag.id}</td>
            <td>${ag.dataHora}</td>
            <td>${ag.pacienteNome}</td>
            <td>${ag.medicoNome}</td>
            <td>${ag.unidadeNome}</td>
            <td><span class="badge ${ag.status === 'Confirmado' ? 'badge-verde' : 'badge-amarelo'}">${ag.status}</span></td>
            <td>
                ${ag.status === 'Confirmado' 
                    ? '<button class="btn-secundario btn-ja-confirmado">Já Confirmado</button>' 
                    : `<button class="btn-secundario btn-confirmar-presenca" data-id="${ag.id}">Confirmar Presença</button>`}
            </td>
        </tr>
    `).join('');
}

// 7. EXAMES
export function renderExames() {
    const tbl = document.getElementById("tblExames");
    if (!tbl) return;
    tbl.innerHTML = db.exames.map(ex => `
        <tr>
            <td>#EX-${ex.id}</td>
            <td>${ex.data}</td>
            <td>${ex.paciente}</td>
            <td>${ex.exame}</td>
            <td><span class="badge ${ex.status === 'Realizado' ? 'badge-verde' : (ex.status === 'Agendado' ? 'badge-azul' : 'badge-amarelo')}">${ex.status}</span></td>
            <td><span class="badge ${ex.dias > 90 ? 'badge-vermelho' : 'badge-verde'}">${ex.dias > 90 ? 'Pendente > 90 dias' : 'Em andamento'}</span></td>
            <td><button class="btn-secundario btn-atualizar-exame" data-id="${ex.id}">Atualizar Laudo / Status</button></td>
        </tr>
    `).join('');
}

// 8. FATURAMENTO
export function renderPagamentos() {
    const tbl = document.getElementById("tblFaturamento");
    if (!tbl) return;
    tbl.innerHTML = db.pagamentos.map(pag => `
        <tr>
            <td>#PAG-${pag.id}</td>
            <td>${pag.paciente}</td>
            <td>${pag.convenio}</td>
            <td>R$ ${pag.valorTotal.toFixed(2)}</td>
            <td style="color:green;">R$ ${pag.valorConvenio.toFixed(2)}</td>
            <td style="color:red;"><strong>R$ ${pag.valorPaciente.toFixed(2)}</strong></td>
            <td>${pag.forma}</td>
            <td><span class="badge ${pag.status === 'Pago' ? 'badge-verde' : 'badge-amarelo'}">${pag.status}</span></td>
            <td>
                ${pag.status === 'Pago' 
                    ? 'Concluído' 
                    : `<button class="btn-secundario btn-receber-pagamento" data-id="${pag.id}">Receber Pagamento</button>`}
            </td>
        </tr>
    `).join('');
}

// 9. RELATÓRIOS
export function renderRelatorios() {
    const tblEx = document.getElementById("tblRelatorioExames");
    if (tblEx) {
        const expirados = db.exames.filter(e => e.dias > 90);
        tblEx.innerHTML = expirados.map(e => `
            <tr style="background:#f8d7da;">
                <td>${e.paciente}</td>
                <td>${e.exame}</td>
                <td>${e.data}</td>
                <td>${e.dias} Dias</td>
                <td><strong style="color:red;">Pendente há mais de 90 dias</strong></td>
            </tr>
        `).join('');
    }

    const tblConv = document.getElementById("tblRelatorioConvenios");
    if (tblConv) {
        tblConv.innerHTML = `
            <tr><td>Unimed Saúde (80%)</td><td>14</td><td>R$ 2.800,00</td><td>R$ 2.240,00</td><td>R$ 560,00</td></tr>
            <tr><td>Bradesco Saúde (70%)</td><td>8</td><td>R$ 1.600,00</td><td>R$ 1.120,00</td><td>R$ 480,00</td></tr>
            <tr><td>Particular (100%)</td><td>5</td><td>R$ 1.000,00</td><td>R$ 0,00</td><td>R$ 1.000,00</td></tr>
        `;
    }
}

// Preencher selects dinamicamente
export function populateSelects() {
    const agPac = document.getElementById("agPac");
    if (agPac) {
        agPac.innerHTML = db.pacientes.map(p => `<option value="${p.id}">${p.nome} (CPF: ${p.cpf})</option>`).join('');
    }

    const agUni = document.getElementById("agUni");
    if (agUni) {
        agUni.innerHTML = db.unidades.map(u => `<option value="${u.id}">${u.nome}</option>`).join('');
    }

    const agMed = document.getElementById("agMed");
    if (agMed) {
        agMed.innerHTML = db.medicos.map(m => `<option value="${m.id}">${m.nome} - ${m.crm}</option>`).join('');
    }

    const pMed = document.getElementById("pMed");
    if (pMed) {
        pMed.innerHTML = db.medicamentos.map(m => `<option value="${m.nome}">${m.nome} (${m.fabricante})</option>`).join('');
    }

    const cPac = document.getElementById("cPacienteSelect");
    if (cPac) {
        cPac.innerHTML = db.pacientes.map(p => `<option value="${p.id}">${p.nome} (CPF: ${p.cpf})</option>`).join('');
    }
}

function updateDashboardStats() {
    const statP = document.getElementById("statPacientes");
    if (statP) statP.innerText = db.pacientes.length;

    const statU = document.getElementById("statUnidades");
    if (statU) statU.innerText = db.unidades.length;

    const statM = document.getElementById("statMedicos");
    if (statM) statM.innerText = db.medicos.length;
}
