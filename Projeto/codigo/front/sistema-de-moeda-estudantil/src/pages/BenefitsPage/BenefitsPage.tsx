import React, { useEffect } from 'react';
import BenefitsCard from '../../components/BenefitsCard/BenefitsCard';
import Api from '../../services/Api';
import { Benefit } from '../../types/Benefits';
import NavBar from '../NavBar/NavBar';
import './BenefitsPage.css';

const BenefitsPage = () => {
    const [benefits, setBenefits] = React.useState<Benefit[]>([]);

    useEffect(() => {
        const fetchBenefits = async () => {
            try {
                const response = await Api.getBenefits();
                setBenefits(response);
            } catch (error) {
                console.error("Erro ao buscar os benefícios:", error);
            }
        };

        fetchBenefits();
    }, []);

    return (
        <div className='main-content'>
            <NavBar />
            <div className='head-title'>
                <h1>Benefícios disponíveis</h1>
            </div>
            <div className='benefits-content'>
                {benefits.map((benefit) => (
                    <BenefitsCard
                        nome={benefit.nome}
                        descricao={benefit.descricao}
                        custoEmMoedas={benefit.custoEmMoedas}
                    />
                ))}
            </div>
        </div>
    );
};

export default BenefitsPage;