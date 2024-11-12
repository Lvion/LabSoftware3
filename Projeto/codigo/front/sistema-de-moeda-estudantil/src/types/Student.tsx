import { Instituction } from "./Instituction";
import { Transactions } from "./Transactions";

export interface Student {
    data: {
        id: number;
        cpf: string;
        nome: string;
        email: string;
        curso: string;
        saldoMoedas: number;
        instituicao: Instituction;
        transactions: Transactions[];
    };
    userType: number;
}