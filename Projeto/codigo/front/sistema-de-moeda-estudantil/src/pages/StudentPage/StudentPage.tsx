import React, { useContext } from 'react';
import { TbCoin } from "react-icons/tb";
import { UserContext } from '../../contexts/UserContext';
import Loading from '../../components/Loading/Loading';
import NavBar from '../NavBar/NavBar';
import './StudentPage.css';

const StudentPage = () => {
    function hasSaldoMoedas(userData: any): userData is { saldoMoedas: number } {
        return 'saldoMoedas' in userData;
    }

    const { user } = useContext(UserContext);

    if (!user) {
        return <Loading />;
    }

    return (
        <div>
            <NavBar />
            <div className='main-content'>
                <div className='page-head-container'>
                    <div className='page-head-title'>
                        <h1>Olá, {user.data.nome}!</h1>
                    </div>
                    {hasSaldoMoedas(user.data) && (
                        <div className='ballance-text'>
                            <TbCoin size={30} /> {user.data.saldoMoedas}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentPage;
