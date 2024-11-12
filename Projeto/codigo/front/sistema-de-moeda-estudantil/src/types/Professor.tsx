export interface Professor {
    data: {
        id: number;
        cpf: string;
        nome: string;
        departamento_id: number;
        instituicao_id: number;
    };
    userType: number;
}