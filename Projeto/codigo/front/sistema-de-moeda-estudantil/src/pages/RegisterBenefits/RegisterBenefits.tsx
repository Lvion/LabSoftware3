import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const RegisterBenefits: React.FC = () => {
    const [benefitName, setBenefitName] = useState('');
    const [benefitDescription, setBenefitDescription] = useState('');
    const [benefitValue, setBenefitValue] = useState('');

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
                    <CustomButton label="Cadastrar benefício" onClick={() => { }} />
                </div>
            </div>
        </div>
    );
};

export default RegisterBenefits;