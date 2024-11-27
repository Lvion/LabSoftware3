import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Api from '../../services/Api';
import './RegisterBenefits.css';

const RegisterBenefits: React.FC = () => {
    const [benefitName, setBenefitName] = useState('');
    const [benefitDescription, setBenefitDescription] = useState('');
    const [benefitValue, setBenefitValue] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [benefitImage, setBenefitImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setBenefitImage(e.target.files[0]);
        }
    };


    const handleRegisterBenefit = async () => {
        setError('');
        setSuccess('');
        const storedData = localStorage.getItem('user');

        if (!benefitName.trim() || !benefitDescription.trim() || !benefitValue.trim()) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        if (!storedData) {
            setError('Usuário não encontrado. Faça login novamente.');
            return;
        }

        const empresaData = JSON.parse(storedData).data;
        const empresaId = empresaData.id;

        if (!empresaId) {
            setError('Usuário não encontrado. Faça login novamente.');
            return;
        }

        const formData = new FormData();
        formData.append('nome', benefitName);
        formData.append('descricao', benefitDescription);
        formData.append('custoEmMoedas', benefitValue);
        if (benefitImage) {
            formData.append('imagem', benefitImage);
        }

        try {
            const response = await fetch(`http://localhost:8080/api/vantagens/registrar?empresaId=${empresaId}`, {
                method: 'POST',
                body: formData,
            });


            if (response.ok) {
                setSuccess('Benefício cadastrado com sucesso!');
                setBenefitName('');
                setBenefitDescription('');
                setBenefitValue('');
                setBenefitImage(null);
            } else {
                setError('Erro ao enviar os dados. Verifique os campos e tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            setError('Erro ao enviar os dados. Verifique os campos e tente novamente.');
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
                {error && <div className='error-message'>{error}</div>}
                {success && <div className='success-message'>{success}</div>}
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
                    <CustomInput
                        label="Imagem do benefício"
                        type="file"
                        placeholder="Selecione uma imagem"
                        onChange={handleImageChange}
                        required
                    />

                    <CustomButton label="Cadastrar benefício" onClick={handleRegisterBenefit} />
                </div>
            </div>
        </div>
    );
};

export default RegisterBenefits;
