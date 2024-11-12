import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import NavBar from '../NavBar/NavBar';
import Loading from '../../components/Loading/Loading';
import { UserContext } from '../../contexts/UserContext';
import Api from '../../services/Api';
import './ProfileEdit.css';

const ProfileEditPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(Number);

    const { user, setUser } = useContext(UserContext);

    if (!user) {
        return <Loading />;
    }

    const userTypesMap: Record<number, string> = {
        1: 'student',
        2: 'enterprise',
        3: 'professor'
    };

    useEffect(() => {
        setName(user.data.nome);
        setEmail(user.data.email);
        setUserType(user.userType);
    }, [user]);

    const handleSave = async () => {
        try {
            const convertedUserType = userTypesMap[userType];

            const response = await Api.updateUser(convertedUserType, {
                nome: name,
                email: email,
                senha: password,
            });

            if (response.ok) {
                alert('Dados atualizados com sucesso');

                setUser({
                    ...user,
                    data: {
                        ...(user.data as any),
                        nome: name,
                    },
                });

            } else {
                alert('Erro ao atualizar dados.');
            }
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.')) {
            try {
                const convertedUserType = userTypesMap[userType];
                const response = await Api.deleteAccount(convertedUserType, email);

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
        <div>
            <NavBar />
            <div className='main-content'>
                <div className='page-head-container'>
                    <div className='page-head-title'>
                        <h1>Editar perfil</h1>
                    </div>
                </div>
                <div className='profile-edit-form'>
                    <CustomInput
                        label="Nome"
                        type="text"
                        placeholder="Digite seu nome"
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
                    />
                    <CustomInput
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='action-buttons-container'>
                        <CustomButton label="Salvar alterações" onClick={handleSave} />
                        <CustomButton label="Excluir conta" onClick={handleDeleteAccount} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditPage;
