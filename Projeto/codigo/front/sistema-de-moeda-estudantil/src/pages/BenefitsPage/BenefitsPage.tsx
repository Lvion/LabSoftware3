import React, { useEffect } from 'react';
import BenefitsCard from '../../components/BenefitsCard/BenefitsCard';
import Api from '../../services/Api';
import { Benefit } from '../../types/Benefits';
import NavBar from '../NavBar/NavBar';
import { UserContext } from '../../contexts/UserContext';
import './BenefitsPage.css';

const BenefitsPage = () => {
    const [benefits, setBenefits] = React.useState<Benefit[]>([]);
    const { user, setUser } = React.useContext(UserContext);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    useEffect(() => {
        const fetchBenefits = async () => {
            try {
                const response = await Api.getBenefits();
                setBenefits(response);
            } catch (error) {
                console.error('Erro ao buscar os benefícios:', error);
            }
        };

        fetchBenefits();
    }, []);

    const handleBuyBenefit = async (benefitId: number, benefitCost: number) => {
        setError('');
        setSuccess('');

        if (user && user.data.saldoMoedas < benefitCost) {
            setError('Saldo insuficiente para comprar este benefício.');
            return;
        }

        try {
            const response = await Api.buyBenefit(user.data.email, benefitId);

            if (response.ok) {
                const newSaldo = user.data.saldoMoedas - benefitCost;
                setUser({ ...user, data: { ...user.data, saldoMoedas: newSaldo } });
                setSuccess('Benefício comprado com sucesso!');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || 'Erro ao comprar o benefício.');
            }
        } catch (error) {
            console.error('Erro ao comprar o benefício:', error);
            setError('Erro ao comprar o benefício. Tente novamente.');
        }
    };

    return (
        <div className="main-content">
            <NavBar />
            <div className="head-title">
                <h1>Benefícios disponíveis</h1>
            </div>
            <div className="result-messages">
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
            <div className="benefits-content">
                {benefits.map((benefit) => (
                    <BenefitsCard
                        key={benefit.id}
                        nome={benefit.nome}
                        descricao={benefit.descricao}
                        custoEmMoedas={benefit.custoEmMoedas}
                        imagem={benefit.imagem}
                        onBuy={() => handleBuyBenefit(benefit.id, benefit.custoEmMoedas)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BenefitsPage;
