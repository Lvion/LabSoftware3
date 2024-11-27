import React, { useContext, useEffect, useState } from 'react';
import { TbCoin } from "react-icons/tb";
import { UserContext } from '../../contexts/UserContext';
import BenefitsCard from '../../components/BenefitsCard/BenefitsCard';
import Loading from '../../components/Loading/Loading';
import NavBar from '../NavBar/NavBar';
import Api from '../../services/Api';
import './StudentPage.css';

const StudentPage = () => {
    function hasSaldoMoedas(userData: any): userData is { saldoMoedas: number } {
        return 'saldoMoedas' in userData;
    }

    const { user } = useContext(UserContext);
    const [advantages, setAdvantages] = useState([]);

    useEffect(() => {
        if (user) {
            Api.getStudentAdvantages(user.data.email)
                .then((data) => {
                    setAdvantages(data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar vantagens:', error);
                });
        }
    }, [user]);

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
                <div className='advantages-list'>
                    <div className='advantages-text'>
                        <h2>Vantagens Adquiridas</h2>
                    </div>
                    <div className='advantages-cards'>
                        {advantages.length > 0 ? (
                            advantages.map((advantage: any) => (
                                <BenefitsCard
                                    key={advantage.id}
                                    nome={advantage.vantagem.nome}
                                    descricao={advantage.vantagem.descricao}
                                    custoEmMoedas={advantage.vantagem.custoEmMoedas}
                                    imagem={advantage.vantagem.imagem}
                                />
                            ))
                        ) : (
                            <p>Você ainda não adquiriu nenhuma vantagem.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPage;
