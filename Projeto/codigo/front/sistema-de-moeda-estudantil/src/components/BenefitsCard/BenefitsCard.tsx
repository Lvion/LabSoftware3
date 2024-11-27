import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import './BenefitsCard.css';

interface BenefitsCardProps {
    nome: string;
    descricao: string;
    custoEmMoedas: number;
    imagem?: string;
    onBuy: () => void; // Função passada como prop para tratar a compra
}

const BenefitsCard: React.FC<BenefitsCardProps> = ({ nome, descricao, custoEmMoedas, imagem, onBuy }) => {
    return (
        <div className="benefits-card">
            {imagem && <img src={`data:image/png;base64,${imagem}`} alt={nome} className="benefit-image" />}
            <div className="benefits-card-info">
                <h3>{nome}</h3>
                <p>{descricao}</p>
                <p>Valor: {custoEmMoedas} moedas</p>
                <div className="benefits-actions">
                    <CustomButton label="Comprar benefício" onClick={onBuy} />
                </div>
            </div>
        </div>
    );
};

export default BenefitsCard;
