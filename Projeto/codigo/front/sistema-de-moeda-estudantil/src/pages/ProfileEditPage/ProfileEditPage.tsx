import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import './ProfileEdit.css';  

const ProfileEditPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
            setName(user.name);
            setUserType(user.userType);
            setEmail(user.email);
        }
    }, []);

    const handleSave = async () => {
        try {
            const convertedUserType = userType === 'enterprise' ? 'empresa' : userType === 'student' ? 'aluno' : userType;

            const response = await fetch(`http://localhost:8080/api/${convertedUserType}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: name,
                    email: email,
                    senha: password,
                }),
            });

            if (response.ok) {
                alert('Dados atualizados com sucesso');
            } else {
                alert('Erro ao atualizar dados.');
            }
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.')) {
            try {
                const convertedUserType = userType === 'enterprise' ? 'empresa' : userType === 'student' ? 'aluno' : userType;
                const response = await fetch(`http://localhost:8080/api/${convertedUserType}/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                });

                if (response.ok) {
                    alert('Conta excluída com sucesso');
                    localStorage.removeItem('user');
                    navigate('/login');
                } else {
                    alert('Erro ao excluir a conta.');
                }
            } catch (error) {
                console.error('Erro ao excluir a conta:', error);
            }
        }
    };

    return (
        <div className="profile-edit-container">

            <div className="profile-edit-card">
                <div className="profile-edit-header">
                    <h2>Editar Perfil</h2>
                </div>
                <form>
                    <CustomInput
                        label="Nome"
                        type="text"
                        placeholder="Alterar nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <CustomInput
                        label="Email"
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        readOnly
                    />
                    <CustomInput
                        label="Senha"
                        type="password"
                        placeholder="Digite sua nova senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <CustomButton label="Salvar" onClick={handleSave} />
                    <CustomButton label="Sair" onClick={handleLogout} />
                    <CustomButton label="Excluir Conta" onClick={handleDeleteAccount} /> 
                </form>
            </div>
        </div>
    );
};

export default ProfileEditPage;
