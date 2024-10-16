import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import './Register.css';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [department, setDepartment] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const options = [
        { value: 'student', label: 'Aluno' },
        { value: 'professor', label: 'Professor' },
        { value: 'enterprise', label: 'Empresa Parceira' },
    ];

    const handleRegister = () => {
        // TODO: Implementar a lógica de cadastro
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Criar uma conta</h2>
                </div>
                <form>
                    <CustomInput
                        label="Nome"
                        type="text"
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <CustomInput
                        label="Selecione sua função"
                        type="select"
                        placeholder="Escolha uma opção"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        options={options}
                        required
                    />
                    {(selectedOption === 'student' || selectedOption === 'professor') && (
                        <CustomInput
                            label="CPF"
                            type="text"
                            placeholder="Digite seu CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />
                    )}
                    {selectedOption === 'student' && (
                        <>
                            <CustomInput
                                label="RG"
                                type="text"
                                placeholder="Digite seu RG"
                                value={rg}
                                onChange={(e) => setRg(e.target.value)}
                                required
                            />
                            <CustomInput
                                label="Curso"
                                type="text"
                                placeholder="Digite seu curso"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                            />
                        </>
                    )}
                    {(selectedOption === 'professor') && (
                        <CustomInput
                            label="Departamento"
                            type="text"
                            placeholder="Digite seu departamento"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        />
                    )}
                    <CustomInput
                        label="Email"
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <CustomInput
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <CustomButton label="Criar conta" onClick={handleRegister} />
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
