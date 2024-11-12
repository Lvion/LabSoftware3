import { Instituction } from "./Instituction";

export interface Student {
    data: {
        id: number;
        cpf: string;
        nome: string;
        email: string;
        curso: string;
        saldoMoedas: number;
        instituicao: Instituction;
    };
    userType: number;
}