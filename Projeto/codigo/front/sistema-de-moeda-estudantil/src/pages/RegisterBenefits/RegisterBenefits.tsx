import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Api from '../../services/Api';

const RegisterBenefits: React.FC = () => {
    const [benefitName, setBenefitName] = useState('');
    const [benefitDescription, setBenefitDescription] = useState('');
    const [benefitValue, setBenefitValue] = useState('');

    const handleRegisterBenefit = async () => {
        const storedData = localStorage.getItem('user');

        if (!storedData) {
            alert("Empresa não encontrada no localStorage. Por favor, faça login novamente.");
            return;
        }

        const empresaData = JSON.parse(storedData).data;
        const empresaId = empresaData.id;

        if (!empresaId) {
            alert("ID da empresa não encontrado. Verifique os dados de login.");
            return;
        }

        const benefitData = {
            nome: benefitName,
            descricao: benefitDescription,
            custoEmMoedas: parseInt(benefitValue)
        };

        try {
            const response = await Api.registerBenefit(empresaId, benefitData);
            if (response.ok) {
                alert("Benefício registrado com sucesso!");
                setBenefitName('');
                setBenefitDescription('');
                setBenefitValue('');
            } else {
                alert("Erro ao registrar o benefício.");
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Erro ao registrar o benefício.");
        }
    };


    return (
        <div>
            <NavBar />
            <div className='main-content'>
                <div className='page-head-container'>
                    <div className='page-head-title'>
                        <h1>Registrar benefícios</h1>
                    </div>
                </div>
                <div className='benefits-form'>
                    <CustomInput
                        label="Nome do benefício"
                        type="text"
                        placeholder="Digite o nome do benefício"
                        value={benefitName}
                        onChange={(e) => setBenefitName(e.target.value)}
                        required
                    />
                    <CustomInput
                        label="Descrição"
                        type="text"
                        placeholder="Digite a descrição do benefício"
                        value={benefitDescription}
                        onChange={(e) => setBenefitDescription(e.target.value)}
                        required
                    />
                    <CustomInput
                        label="Valor em moedas"
                        type="number"
                        placeholder="Digite o valor em moedas"
                        value={benefitValue}
                        onChange={(e) => setBenefitValue(e.target.value)}
                        required
                    />
                    <CustomButton label="Cadastrar benefício" onClick={handleRegisterBenefit} />
                </div>
            </div>
        </div>
    );
};

export default RegisterBenefits;
