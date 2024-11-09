import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { UserContext } from '../../contexts/UserContext';
import './Login.css';

const LoginPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setUserType(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    userType: userType,
                }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                console.log(userData);
                if (userType === 'student') {
                    navigate('/student');
                }
            } else if (response.status === 401) {
                setError("Usuário ou senha inválidos");
            }
        } catch (error) {
            console.error('Erro ao fazer login', error);
            setError('Erro ao fazer login');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin}>
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
                    <CustomInput
                        label="Tipo de usuário"
                        type="select"
                        placeholder="Escolha uma opção"
                        value={userType}
                        onChange={handleSelectChange}
                        options={[
                            { value: 'student', label: 'Aluno' },
                            { value: 'professor', label: 'Professor' },
                            { value: 'enterprise', label: 'Empresa Parceira' },
                        ]}
                        required
                    />

                    <div className='register-text-container'>
                        <p>Não possui uma conta? <a href='/register'>Cadastre-se</a></p>
                    </div>

                    <CustomButton label="Entrar" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
