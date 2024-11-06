import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { IoMdArrowBack } from "react-icons/io";

import Api from '../../utils/Api';

import './Register.css';
interface Instituicao {
    id: string;
    nome: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [endereco, setEndereco] = useState('');
    const [department, setDepartment] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedInstituicao, setSelectedInstituicao] = useState('');
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [error, setError] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const fetchInstituicoes = async () => {
        const data = await Api.getInstitutions();
        setInstituicoes(data);
    };

    useEffect(() => {
        if (selectedOption === 'student') {
            fetchInstituicoes();
        }
    }, [selectedOption]);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        let payload = {};

        if (selectedOption === 'student') {
            payload = {
                nome: name,
                cpf: cpf,
                rg: rg,
                curso: course,
                email: email,
                senha: password,
                instituicaoId: selectedInstituicao,
                endereco: endereco,
            };
        } else if (selectedOption === 'enterprise') {
            payload = {
                nome: name,
                email: email,
                senha: password,
            };
        } else {
            console.error('Opção selecionada inválida!');
            return;
        }

        try {
            const response = await Api.register(selectedOption, payload);
            if (response.status === 200) {
                navigate('/login');

            } else {
                setError('Erro ao registrar. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            setError('Erro ao registrar. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Criar uma conta</h2>
                </div>
                {error && (
                    <div className="register-error">
                        {error}
                    </div>
                )}
                <form onSubmit={handleRegister}>
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
                        options={[
                            { value: 'student', label: 'Aluno' },
                            { value: 'enterprise', label: 'Empresa Parceira' },
                        ]}
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
                            <CustomInput
                                label="Endereço"
                                type="text"
                                placeholder="Digite seu endereço"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                required
                            />
                            <CustomSelect
                                label="Instituição"
                                value={selectedInstituicao}
                                onChange={(e) => setSelectedInstituicao(e.target.value)}
                                options={instituicoes.map((instituicao) => ({
                                    value: instituicao.id,
                                    label: instituicao.nome
                                }))}
                                required
                            />
                        </>
                    )}
                    {selectedOption === 'professor' && (
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
                    <CustomButton label="Criar conta" onClick={() => handleRegister} />
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
