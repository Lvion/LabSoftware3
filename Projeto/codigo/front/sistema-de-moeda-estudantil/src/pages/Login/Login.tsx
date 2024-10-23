import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import './Login.css';

const LoginPage: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('student');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            event.preventDefault();
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password,
                    userType: userType,
                }),
            });

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify({ email, name, userType }));
                alert('Login feito com sucesso!');
                navigate('/test');
            } else {
                alert('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                <form>
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
                        label="Tipo de Usuário"
                        type="select"
                        placeholder="Escolha uma opção"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        options={[
                            { value: 'student', label: 'Aluno' },
                            { value: 'professor', label: 'Professor' },
                            { value: 'enterprise', label: 'Empresa Parceira' },
                        ]}
                        required
                    />

                    <CustomButton label="Entrar" onClick={handleLogin} />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
