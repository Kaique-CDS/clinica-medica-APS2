// Base de dados inicial da clínica (Mock Data)
export const db = {
    pacientes: [
        { id: 1, cpf: "333.444.555-66", nome: "Carlos Eduardo Santos", dataNasc: "12/04/1985", sexo: "Masculino", convenio: "Unimed", carteirinha: "88990011" },
        { id: 2, cpf: "444.555.666-77", nome: "Mariana Costa Alves", dataNasc: "25/09/1992", sexo: "Feminino", convenio: "Bradesco Saúde", carteirinha: "55443322" }
    ],
    medicos: [
        { id: 101, nome: "Dr. Roberto Silva", crm: "CRM/SP 123456", especialidade: "Cardiologia, Clínica Geral" },
        { id: 102, nome: "Dra. Fernanda Lima", crm: "CRM/SP 654321", especialidade: "Pediatria" }
    ],
    exames: [
        { id: 501, data: "10/05/2026", paciente: "Carlos Eduardo Santos", exame: "Ecocardiograma Transtorácico", status: "Solicitado", pendencia: "Pendente > 90 dias" },
        { id: 502, data: "01/09/2026", paciente: "Mariana Costa Alves", exame: "Hemograma Completo", status: "Agendado", pendencia: "Em andamento" }
    ]
};
