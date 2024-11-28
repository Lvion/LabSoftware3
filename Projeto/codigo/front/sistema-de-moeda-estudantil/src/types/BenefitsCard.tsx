export interface BenefitsCardProps {
    nome: string;
    descricao: string;
    custoEmMoedas: number;
    imagem?: string;
    onBuy?: () => void;
    adquirido?: boolean;
}