// Base de dados dinamicamente gerenciável (CRUD em memória)
export const db = {
    unidades: [
        { id: 1, nome: "Unidade Central Jardins", endereco: "Av. Paulista, 1000 - SP", telefone: "(11) 3333-1000" },
        { id: 2, nome: "Unidade Zona Sul Moema", endereco: "Av. Ibirapuera, 500 - SP", telefone: "(11) 3333-2000" }
    ],
    pacientes: [
        { id: 1, cpf: "333.444.555-66", nome: "Carlos Eduardo Santos", dataNasc: "1985-04-12", sexo: "Masculino", convenio: "Unimed Saúde (Cobertura 80%)", carteirinha: "88990011" },
        { id: 2, cpf: "444.555.666-77", nome: "Mariana Costa Alves", dataNasc: "1992-09-25", sexo: "Feminino", convenio: "Bradesco Saúde (Cobertura 70%)", carteirinha: "55443322" }
    ],
    medicos: [
        { id: 101, nome: "Dr. Roberto Silva", cpf: "111.222.333-44", crm: "CRM/SP 123456", especialidade: "Cardiologia, Clínica Geral", telefone: "(11) 98888-1111" },
        { id: 102, nome: "Dra. Fernanda Lima", cpf: "222.333.444-55", crm: "CRM/SP 654321", especialidade: "Pediatria", telefone: "(11) 98888-2222" }
    ],
    convenios: [
        { id: 1, codigo: "UNI", nome: "Unimed Saúde", cnpj: "12.345.678/0001-90", cobertura: 80 },
        { id: 2, codigo: "BRA", nome: "Bradesco Saúde", cnpj: "98.765.432/0001-10", cobertura: 70 },
        { id: 3, codigo: "PART", nome: "Particular", cnpj: "00.000.000/0000-00", cobertura: 0 }
    ],
    medicamentos: [
        { id: 1, codigo: "MED01", nome: "Amoxicilina 500mg", principioAtivo: "Amoxicilina", fabricante: "Medley", apresentacao: "Caixa 21 cápsulas" },
        { id: 2, codigo: "MED02", nome: "Losartana Potássica 50mg", principioAtivo: "Losartana", fabricante: "EMS", apresentacao: "Caixa 30 comprimidos" },
        { id: 3, codigo: "MED03", nome: "Dipirona Sódica 500mg/ml", principioAtivo: "Dipirona", fabricante: "Eurofarma", apresentacao: "Frasco 20ml gotas" }
    ],
    agendamentos: [
        { id: 101, dataHora: "15/09/2026 09:00", pacienteId: 1, pacienteNome: "Carlos Eduardo Santos", medicoId: 101, medicoNome: "Dr. Roberto Silva", unidadeNome: "Unidade Central Jardins", status: "Confirmado" },
        { id: 102, dataHora: "15/09/2026 10:30", pacienteId: 2, pacienteNome: "Mariana Costa Alves", medicoId: 102, medicoNome: "Dra. Fernanda Lima", unidadeNome: "Unidade Central Jardins", status: "Agendado" }
    ],
    consultas: [
        { id: 1, pacienteId: 1, pacienteNome: "Carlos Eduardo Santos", medicoNome: "Dr. Roberto Silva", data: "10/08/2026", queixa: "Cansaço e dores de cabeça persistentes.", diagnostico: "I10 - Hipertensão essencial (primária)", prescricao: "Losartana Potássica 50mg - 1 comprimido ao dia." }
    ],
    exames: [
        { id: 501, data: "10/05/2026", paciente: "Carlos Eduardo Santos", exame: "Ecocardiograma Transtorácico", status: "Solicitado", pendencia: "Pendente > 90 dias", dias: 127 },
        { id: 502, data: "01/09/2026", paciente: "Mariana Costa Alves", exame: "Hemograma Completo", status: "Agendado", pendencia: "Em andamento", dias: 14 }
    ],
    pagamentos: [
        { id: 901, paciente: "Carlos Eduardo Santos", convenio: "Unimed Saúde (80%)", valorTotal: 200, valorConvenio: 160, valorPaciente: 40, forma: "PIX", status: "Pago" },
        { id: 902, paciente: "Mariana Costa Alves", convenio: "Bradesco Saúde (70%)", valorTotal: 200, valorConvenio: 140, valorPaciente: 60, forma: "Pendente", status: "Aguardando" }
    ]
};
