import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import './Login.css';

const LoginPage: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: Implementar a lógica de login
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <CustomButton label="Entrar" onClick={handleLogin} />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
