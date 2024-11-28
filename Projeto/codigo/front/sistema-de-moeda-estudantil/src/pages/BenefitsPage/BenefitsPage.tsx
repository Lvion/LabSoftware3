import { useEffect, useState, useContext } from 'react';
import BenefitsCard from '../../components/BenefitsCard/BenefitsCard';
import Api from '../../services/Api';
import { Benefit } from '../../types/Benefits';
import NavBar from '../NavBar/NavBar';
import { UserContext } from '../../contexts/UserContext';
import './BenefitsPage.css';
import ModalOverlay from '../../components/ModalOverlay/ModalOverlay';
import { TbCoin } from 'react-icons/tb';

const BenefitsPage = () => {
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

    function getSaldoMoedas(userData: any): number {
        return userData.saldoMoedas;
    }

    function hasSaldoMoedas(userData: any): userData is { saldoMoedas: number } {
        return 'saldoMoedas' in userData;
    }

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

    const handleBuyBenefit = (benefit: Benefit) => {
        setError('');
        setSuccess('');

        if (getSaldoMoedas(user?.data) < benefit.custoEmMoedas) {
            setError('Saldo insuficiente para comprar este benefício.');
            return;
        }

        setSelectedBenefit(benefit);
        setIsModalOpen(true);
    };

    const handleConfirmBuy = async () => {
        if (!selectedBenefit) return;

        try {
            const response = await Api.buyBenefit(user.data.email, selectedBenefit.id);

            if (response.ok) {
                const newSaldo = getSaldoMoedas(user?.data) - selectedBenefit.custoEmMoedas;
                setUser({ ...user, data: { ...user?.data, saldoMoedas: newSaldo } });
                setSuccess('Benefício comprado com sucesso!');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || 'Erro ao comprar o benefício.');
            }
        } catch (error) {
            console.error('Erro ao comprar o benefício:', error);
            setError('Erro ao comprar o benefício. Tente novamente.');
        } finally {
            setIsModalOpen(false);
            setSelectedBenefit(null);
        }
    };

    const handleCancelBuy = () => {
        setIsModalOpen(false);
        setSelectedBenefit(null);
    };

    return (
        <div className="main-content">
            <NavBar />
            <div className='head-container'>
                <div className="head-title">
                    <h1>Benefícios disponíveis</h1>
                </div>
                {hasSaldoMoedas(user.data) && (
                    <div className='ballance-text'>
                        <TbCoin size={30} /> {user.data.saldoMoedas}
                    </div>
                )}
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
                        onBuy={() => handleBuyBenefit(benefit)}
                    />
                ))}
            </div>
            {isModalOpen && selectedBenefit && (
                <ModalOverlay
                    title="Confirmar Compra"
                    description={`Deseja comprar o benefício "${selectedBenefit.nome}" por ${selectedBenefit.custoEmMoedas} moedas?`}
                    onConfirm={handleConfirmBuy}
                    onCancel={handleCancelBuy}
                    confirmText="Confirmar"
                    cancelText="Cancelar"
                />
            )}
        </div>
    );
};

export default BenefitsPage;
