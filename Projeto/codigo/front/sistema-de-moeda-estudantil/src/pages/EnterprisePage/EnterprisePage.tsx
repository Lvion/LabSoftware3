import React, { useContext } from 'react';
import { TbCoin } from "react-icons/tb";
import { UserContext } from '../../contexts/UserContext';
import Loading from '../../components/Loading/Loading';
import NavBar from '../NavBar/NavBar';
import './EnterprisePage.css';

const EnterprisePage = () => {
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
                </div>
            </div>
        </div>
    );
}

export default EnterprisePage;
