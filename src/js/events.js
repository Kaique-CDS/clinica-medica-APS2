import { db } from './database.js';
import { 
    renderAllTables, 
    renderAgendamentos,
    renderExames,
    renderPagamentos
} from './renderers.js';

export function initEvents() {
    renderAllTables();

    // Evento de troca de perfil de usuário logado
    const selectAtor = document.getElementById('selectAtor');
    if (selectAtor) {
        selectAtor.addEventListener('change', (e) => {
            const perfil = e.target.value;
            atualizarPerfilAtivo(perfil);
        });
    }

    // 1. CRUD UNIDADES
    const formUnidade = document.getElementById('formUnidade');
    if (formUnidade) {
        formUnidade.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('uId').value;
            const nome = document.getElementById('uNome').value;
            const endereco = document.getElementById('uEndereco').value;
            const telefone = document.getElementById('uTelefone').value;

            if (id) {
                const item = db.unidades.find(u => u.id == id);
                if (item) {
                    item.nome = nome; item.endereco = endereco; item.telefone = telefone;
                    alert(`Unidade "${nome}" editada com sucesso!`);
                }
            } else {
                const novoId = db.unidades.length ? Math.max(...db.unidades.map(u => u.id)) + 1 : 1;
                db.unidades.push({ id: novoId, nome, endereco, telefone });
                alert(`Unidade "${nome}" adicionada com sucesso!`);
            }

            cancelarEdicaoUnidade();
            renderAllTables();
        });
    }

    // 2. CRUD PACIENTES
    const formPac = document.getElementById('formPaciente');
    if (formPac) {
        formPac.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('pId').value;
            const nome = document.getElementById('pNome').value;
            const cpf = document.getElementById('pCpf').value;
            const dataNasc = document.getElementById('pDataNasc').value;
            const sexo = document.getElementById('pSexo').value;
            const tel = document.getElementById('pTel').value;
            const convenio = document.getElementById('pConvenio').value;
            const carteirinha = document.getElementById('pCarteirinha').value || 'N/A';

            if (id) {
                const item = db.pacientes.find(p => p.id == id);
                if (item) {
                    item.nome = nome; item.cpf = cpf; item.dataNasc = dataNasc;
                    item.sexo = sexo; item.convenio = convenio; item.carteirinha = carteirinha;
                    alert(`Paciente "${nome}" editado com sucesso!`);
                }
            } else {
                const novoId = db.pacientes.length ? Math.max(...db.pacientes.map(p => p.id)) + 1 : 1;
                db.pacientes.push({ id: novoId, cpf, nome, dataNasc, sexo, convenio, carteirinha });
                alert(`Paciente "${nome}" cadastrado com sucesso!`);
            }

            cancelarEdicaoPaciente();
            renderAllTables();
        });
    }

    // 3. CRUD MÉDICOS
    const formMed = document.getElementById('formMedico');
    if (formMed) {
        formMed.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('mId').value;
            const nome = document.getElementById('mNome').value;
            const cpf = document.getElementById('mCpf').value;
            const crm = document.getElementById('mCrm').value;
            const especialidade = document.getElementById('mEspecialidade').value;
            const telefone = document.getElementById('mTel').value;

            if (id) {
                const item = db.medicos.find(m => m.id == id);
                if (item) {
                    item.nome = nome; item.cpf = cpf; item.crm = crm;
                    item.especialidade = especialidade; item.telefone = telefone;
                    alert(`Médico "${nome}" editado com sucesso!`);
                }
            } else {
                const novoId = db.medicos.length ? Math.max(...db.medicos.map(m => m.id)) + 1 : 101;
                db.medicos.push({ id: novoId, nome, cpf, crm, especialidade, telefone });
                alert(`Médico "${nome}" cadastrado com sucesso!`);
            }

            cancelarEdicaoMedico();
            renderAllTables();
        });
    }

    // 4. CRUD CONVÊNIOS
    const formConv = document.getElementById('formConvenio');
    if (formConv) {
        formConv.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('cId').value;
            const codigo = document.getElementById('cCodigo').value;
            const nome = document.getElementById('cNome').value;
            const cnpj = document.getElementById('cCnpj').value;
            const cobertura = parseInt(document.getElementById('cCobertura').value);

            if (id) {
                const item = db.convenios.find(c => c.id == id);
                if (item) {
                    item.codigo = codigo; item.nome = nome; item.cnpj = cnpj; item.cobertura = cobertura;
                    alert(`Convênio "${nome}" editado com sucesso!`);
                }
            } else {
                const novoId = db.convenios.length ? Math.max(...db.convenios.map(c => c.id)) + 1 : 1;
                db.convenios.push({ id: novoId, codigo, nome, cnpj, cobertura });
                alert(`Convênio "${nome}" cadastrado com sucesso!`);
            }

            cancelarEdicaoConvenio();
            renderAllTables();
        });
    }

    // 5. CRUD MEDICAMENTOS
    const formMedicamento = document.getElementById('formMedicamento');
    if (formMedicamento) {
        formMedicamento.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('medId').value;
            const codigo = document.getElementById('medCodigo').value;
            const nome = document.getElementById('medNome').value;
            const principioAtivo = document.getElementById('medPrincipio').value;
            const fabricante = document.getElementById('medFabricante').value;
            const apresentacao = document.getElementById('medApresentacao').value;

            if (id) {
                const item = db.medicamentos.find(m => m.id == id);
                if (item) {
                    item.codigo = codigo; item.nome = nome; item.principioAtivo = principioAtivo;
                    item.fabricante = fabricante; item.apresentacao = apresentacao;
                    alert(`Medicamento "${nome}" editado com sucesso!`);
                }
            } else {
                const novoId = db.medicamentos.length ? Math.max(...db.medicamentos.map(m => m.id)) + 1 : 1;
                db.medicamentos.push({ id: novoId, codigo, nome, principioAtivo, fabricante, apresentacao });
                alert(`Medicamento "${nome}" cadastrado com sucesso!`);
            }

            cancelarEdicaoMedicamento();
            renderAllTables();
        });
    }

    // AGENDAMENTO NOVO
    const formAg = document.getElementById('formAgendamento');
    if (formAg) {
        formAg.addEventListener('submit', (e) => {
            e.preventDefault();
            const pId = document.getElementById('agPac').value;
            const uId = document.getElementById('agUni').value;
            const mId = document.getElementById('agMed').value;
            const dataHoraRaw = document.getElementById('agData').value;

            const pac = db.pacientes.find(p => p.id == pId);
            const med = db.medicos.find(m => m.id == mId);
            const uni = db.unidades.find(u => u.id == uId);

            const novoId = db.agendamentos.length ? Math.max(...db.agendamentos.map(a => a.id)) + 1 : 101;
            const dataFormatada = dataHoraRaw ? dataHoraRaw.replace('T', ' ') : '15/09/2026 11:00';

            db.agendamentos.push({
                id: novoId,
                dataHora: dataFormatada,
                pacienteId: pId,
                pacienteNome: pac ? pac.nome : 'Paciente',
                medicoId: mId,
                medicoNome: med ? med.nome : 'Médico',
                unidadeNome: uni ? uni.nome : 'Unidade Central',
                status: 'Agendado'
            });

            alert(`Consulta agendada para ${pac ? pac.nome : 'Paciente'} com sucesso!`);
            e.target.reset();
            renderAgendamentos();
        });
    }

    // CONSULTA FINALIZAR
    const formCons = document.getElementById('formConsulta');
    if (formCons) {
        formCons.addEventListener('submit', (e) => {
            e.preventDefault();
            const pId = document.getElementById('cPacienteSelect').value;
            const queixa = document.getElementById("cQueixa").value;
            const diag = document.getElementById("cDiagnostico").value;
            const exame = document.getElementById("solExame").value;

            const pac = db.pacientes.find(p => p.id == pId);
            const nomePac = pac ? pac.nome : 'Paciente';

            db.consultas.push({
                id: db.consultas.length + 1,
                pacienteId: pId,
                pacienteNome: nomePac,
                medicoNome: "Dr. Roberto Silva",
                data: new Date().toLocaleDateString('pt-BR'),
                queixa,
                diagnostico: diag,
                prescricao: "Medicação conforme receita emitida."
            });

            if (exame) {
                const novoExId = db.exames.length ? Math.max(...db.exames.map(ex => ex.id)) + 1 : 501;
                db.exames.push({
                    id: novoExId,
                    data: new Date().toLocaleDateString('pt-BR'),
                    paciente: nomePac,
                    exame: exame,
                    status: "Solicitado",
                    pendencia: "Em andamento",
                    dias: 0
                });
                renderExames();
            }

            let msg = `Consulta médica de "${nomePac}" finalizada com sucesso!\n- Diagnóstico: ${diag}`;
            if (exame) msg += `\n- Solicitação de Exame gerada: ${exame}`;
            alert(msg);
            e.target.reset();
        });
    }

    // Delegacao de cliques globais (Sem emojis nos textos)
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target) return;

        // UNIDADES
        if (target.classList.contains('btn-editar-unidade')) {
            const id = target.getAttribute('data-id');
            const item = db.unidades.find(u => u.id == id);
            if (item) {
                document.getElementById('uId').value = item.id;
                document.getElementById('uNome').value = item.nome;
                document.getElementById('uEndereco').value = item.endereco;
                document.getElementById('uTelefone').value = item.telefone;
                document.getElementById('tituloFormUnidade').innerText = "Editar Unidade #" + item.id;
                document.getElementById('btnSalvarUnidade').innerText = "Atualizar Unidade";
                document.getElementById('btnCancelarEdicaoUnidade').style.display = "inline-block";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        if (target.classList.contains('btn-excluir-unidade')) {
            const id = target.getAttribute('data-id');
            const item = db.unidades.find(u => u.id == id);
            if (item && confirm(`Tem certeza que deseja excluir a unidade "${item.nome}"?`)) {
                db.unidades = db.unidades.filter(u => u.id != id);
                renderAllTables();
                alert("Unidade excluída com sucesso!");
            }
        }

        // PACIENTES
        if (target.classList.contains('btn-editar-paciente')) {
            const id = target.getAttribute('data-id');
            const item = db.pacientes.find(p => p.id == id);
            if (item) {
                document.getElementById('pId').value = item.id;
                document.getElementById('pNome').value = item.nome;
                document.getElementById('pCpf').value = item.cpf;
                document.getElementById('pDataNasc').value = item.dataNasc;
                document.getElementById('pSexo').value = item.sexo;
                document.getElementById('pConvenio').value = item.convenio;
                document.getElementById('pCarteirinha').value = item.carteirinha;
                document.getElementById('tituloFormPaciente').innerText = "Editar Paciente #" + item.id;
                document.getElementById('btnSalvarPaciente').innerText = "Atualizar Paciente";
                document.getElementById('btnCancelarEdicaoPaciente').style.display = "inline-block";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        if (target.classList.contains('btn-excluir-paciente')) {
            const id = target.getAttribute('data-id');
            const item = db.pacientes.find(p => p.id == id);
            if (item && confirm(`Tem certeza que deseja excluir o paciente "${item.nome}"?`)) {
                db.pacientes = db.pacientes.filter(p => p.id != id);
                renderAllTables();
                alert("Paciente excluído com sucesso!");
            }
        }

        // MÉDICOS
        if (target.classList.contains('btn-editar-medico')) {
            const id = target.getAttribute('data-id');
            const item = db.medicos.find(m => m.id == id);
            if (item) {
                document.getElementById('mId').value = item.id;
                document.getElementById('mNome').value = item.nome;
                document.getElementById('mCpf').value = item.cpf;
                document.getElementById('mCrm').value = item.crm;
                document.getElementById('mEspecialidade').value = item.especialidade;
                document.getElementById('mTel').value = item.telefone || '';
                document.getElementById('tituloFormMedico').innerText = "Editar Médico #" + item.id;
                document.getElementById('btnSalvarMedico').innerText = "Atualizar Médico";
                document.getElementById('btnCancelarEdicaoMedico').style.display = "inline-block";
            }
        }

        if (target.classList.contains('btn-excluir-medico')) {
            const id = target.getAttribute('data-id');
            const item = db.medicos.find(m => m.id == id);
            if (item && confirm(`Tem certeza que deseja excluir o médico "${item.nome}"?`)) {
                db.medicos = db.medicos.filter(m => m.id != id);
                renderAllTables();
                alert("Médico excluído com sucesso!");
            }
        }

        // CONVÊNIOS
        if (target.classList.contains('btn-editar-convenio')) {
            const id = target.getAttribute('data-id');
            const item = db.convenios.find(c => c.id == id);
            if (item) {
                document.getElementById('cId').value = item.id;
                document.getElementById('cCodigo').value = item.codigo;
                document.getElementById('cNome').value = item.nome;
                document.getElementById('cCnpj').value = item.cnpj;
                document.getElementById('cCobertura').value = item.cobertura;
                document.getElementById('tituloFormConvenio').innerText = "Editar Convênio #" + item.id;
                document.getElementById('btnSalvarConvenio').innerText = "Atualizar Convênio";
                document.getElementById('btnCancelarEdicaoConvenio').style.display = "inline-block";
            }
        }

        if (target.classList.contains('btn-excluir-convenio')) {
            const id = target.getAttribute('data-id');
            const item = db.convenios.find(c => c.id == id);
            if (item && confirm(`Tem certeza que deseja excluir o convênio "${item.nome}"?`)) {
                db.convenios = db.convenios.filter(c => c.id != id);
                renderAllTables();
                alert("Convênio excluído com sucesso!");
            }
        }

        // MEDICAMENTOS
        if (target.classList.contains('btn-editar-medicamento')) {
            const id = target.getAttribute('data-id');
            const item = db.medicamentos.find(m => m.id == id);
            if (item) {
                document.getElementById('medId').value = item.id;
                document.getElementById('medCodigo').value = item.codigo;
                document.getElementById('medNome').value = item.nome;
                document.getElementById('medPrincipio').value = item.principioAtivo;
                document.getElementById('medFabricante').value = item.fabricante;
                document.getElementById('medApresentacao').value = item.apresentacao;
                document.getElementById('tituloFormMedicamento').innerText = "Editar Medicamento #" + item.id;
                document.getElementById('btnSalvarMedicamento').innerText = "Atualizar Medicamento";
                document.getElementById('btnCancelarEdicaoMedicamento').style.display = "inline-block";
            }
        }

        if (target.classList.contains('btn-excluir-medicamento')) {
            const id = target.getAttribute('data-id');
            const item = db.medicamentos.find(m => m.id == id);
            if (item && confirm(`Tem certeza que deseja excluir o medicamento "${item.nome}"?`)) {
                db.medicamentos = db.medicamentos.filter(m => m.id != id);
                renderAllTables();
                alert("Medicamento excluído com sucesso!");
            }
        }

        // CONFIRMAR PRESENÇA
        if (target.classList.contains('btn-confirmar-presenca')) {
            const id = target.getAttribute('data-id');
            const ag = db.agendamentos.find(a => a.id == id);
            if (ag) {
                ag.status = 'Confirmado';
                renderAgendamentos();
                alert(`Presença de ${ag.pacienteNome} confirmada com sucesso!`);
            }
        }

        // ATUALIZAR EXAME
        if (target.classList.contains('btn-atualizar-exame')) {
            const id = target.getAttribute('data-id');
            const ex = db.exames.find(e => e.id == id);
            if (ex) {
                const st = prompt("Digite o novo status do exame (Solicitado, Agendado, Realizado, Cancelado):", ex.status);
                if (st) {
                    ex.status = st;
                    if (st === "Realizado") { prompt("Digite o laudo do exame:", "Exame sem alterações significativas."); }
                    renderExames();
                    alert("Status e Resultado do exame #" + id + " atualizados com sucesso!");
                }
            }
        }

        // RECEBER PAGAMENTO
        if (target.classList.contains('btn-receber-pagamento')) {
            const id = target.getAttribute('data-id');
            const pag = db.pagamentos.find(p => p.id == id);
            if (pag) {
                const forma = prompt("Selecione a forma de pagamento (PIX, Cartão de Crédito, Cartão de Débito, Dinheiro):", "PIX");
                if (forma) {
                    pag.forma = forma;
                    pag.status = "Pago";
                    renderPagamentos();
                    alert("Pagamento #" + id + " recebido via " + forma + " com sucesso!");
                }
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

    atualizarPerfilAtivo('Recepcionista');
}

// Funções globais de cancelamento
window.cancelarEdicaoUnidade = function() {
    document.getElementById('formUnidade')?.reset();
    document.getElementById('uId').value = '';
    document.getElementById('tituloFormUnidade').innerText = "Cadastrar Nova Unidade Física";
    document.getElementById('btnSalvarUnidade').innerText = "Salvar Unidade";
    document.getElementById('btnCancelarEdicaoUnidade').style.display = "none";
};

window.cancelarEdicaoPaciente = function() {
    document.getElementById('formPaciente')?.reset();
    document.getElementById('pId').value = '';
    document.getElementById('tituloFormPaciente').innerText = "Cadastrar Novo Paciente";
    document.getElementById('btnSalvarPaciente').innerText = "Salvar Paciente";
    document.getElementById('btnCancelarEdicaoPaciente').style.display = "none";
};

window.cancelarEdicaoMedico = function() {
    document.getElementById('formMedico')?.reset();
    document.getElementById('mId').value = '';
    document.getElementById('tituloFormMedico').innerText = "Cadastrar Novo Médico / Profissional";
    document.getElementById('btnSalvarMedico').innerText = "Salvar Médico";
    document.getElementById('btnCancelarEdicaoMedico').style.display = "none";
};

window.cancelarEdicaoConvenio = function() {
    document.getElementById('formConvenio')?.reset();
    document.getElementById('cId').value = '';
    document.getElementById('tituloFormConvenio').innerText = "Cadastrar Novo Convênio";
    document.getElementById('btnSalvarConvenio').innerText = "Salvar Convênio";
    document.getElementById('btnCancelarEdicaoConvenio').style.display = "none";
};

window.cancelarEdicaoMedicamento = function() {
    document.getElementById('formMedicamento')?.reset();
    document.getElementById('medId').value = '';
    document.getElementById('tituloFormMedicamento').innerText = "Cadastrar Novo Medicamento";
    document.getElementById('btnSalvarMedicamento').innerText = "Salvar Medicamento";
    document.getElementById('btnCancelarEdicaoMedicamento').style.display = "none";
};

function atualizarPerfilAtivo(perfil) {
    const banner = document.getElementById('bannerPerfil');
    const perfis = {
        'Recepcionista': { nome: 'Ana Souza (Recepção)', perm: 'Gestão de Agendamentos, Cadastros de Pacientes e Faturamento', mostrar: ['.perm-painel', '.perm-recepcao'], abaInicial: 'aba-cadastros' },
        'Medico': { nome: 'Dr. Roberto Silva (Médico)', perm: 'Atendimento Clínico, Prescrições e Exames', mostrar: ['.perm-painel', '.perm-medico'], abaInicial: 'aba-consultas' },
        'Enfermeiro': { nome: 'Juliana Lima (Enfermaria)', perm: 'Módulo de Exames e Laudos', mostrar: ['.perm-painel', '.perm-enfermeiro'], abaInicial: 'aba-exames' },
        'Financeiro': { nome: 'Marcos Mendes (Admin Financeiro)', perm: 'Faturamento Geral e Relatórios', mostrar: ['.perm-painel', '.perm-admin'], abaInicial: 'aba-faturamento' }
    };

    const config = perfis[perfil] || perfis['Recepcionista'];
    if (banner) banner.innerHTML = `Perfil Ativo: ${config.nome} | Permissões: ${config.perm}`;

    document.querySelectorAll('.btn-tab').forEach(btn => btn.style.display = 'none');
    config.mostrar.forEach(seletor => {
        document.querySelectorAll(seletor).forEach(btn => btn.style.display = 'inline-block');
    });

    const btnInicial = document.querySelector(`.btn-tab[onclick*="${config.abaInicial}"]`);
    if (btnInicial) btnInicial.click();
}

function verHistorico(id) {
    const item = db.pacientes.find(p => p.id == id);
    const nome = item ? item.nome : "Paciente";
    const consultasPac = db.consultas.filter(c => c.pacienteId == id);

    let html = `<p><strong>Paciente:</strong> ${nome} | <strong>Prontuário Nº:</strong> ${id}0492</p><hr><h4>Histórico de Consultas</h4>`;
    
    if (consultasPac.length > 0) {
        html += consultasPac.map(c => `
            <p><strong>Data:</strong> ${c.data} | <strong>Médico:</strong> ${c.medicoNome}</p>
            <p><strong>Queixa:</strong> ${c.queixa}</p>
            <p><strong>Diagnóstico:</strong> ${c.diagnostico}</p>
            <p><strong>Prescrição:</strong> ${c.prescricao}</p>
        `).join('<hr>');
    } else {
        html += `
            <p><strong>Data:</strong> 10/08/2026 | <strong>Médico:</strong> Dr. Roberto Silva (CRM/SP 123456)</p>
            <p><strong>Queixa:</strong> Cansaço e dores de cabeça persistentes.</p>
            <p><strong>Diagnóstico:</strong> I10 - Hipertensão essencial (primária)</p>
            <p><strong>Prescrição:</strong> Losartana Potássica 50mg - 1 comprimido ao dia.</p>
        `;
    }

    html += `<hr><h4>Exames Solicitados</h4><p>- Ecocardiograma Transtorácico (Solicitado em 10/05/2026)</p>`;
    
    document.getElementById("mConteudo").innerHTML = html;
    document.getElementById("modalProntuario").style.display = "block";
}
