import React, { useContext, useState } from 'react';
import './Extract.css';
import NavBar from '../NavBar/NavBar';
import { UserContext } from '../../contexts/UserContext';
import { Transactions } from '../../types/Transactions';
import { Professor } from '../../types/Professor';

const Extract = () => {
    const { user } = useContext(UserContext);
    const studentExtract: Transactions[] = user && user.data && 'transacoes' in user.data ? user.data.transacoes : [];

    return (
        <div>
            <NavBar />
            <div className='main-content'>
                <div className="extract-title">
                    <h1>Seu extrato</h1>
                </div>
                <div className='extract-content'>
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Professor</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentExtract.map((extract) => (
                                <tr key={extract.id}>
                                    <td>{extract.data}</td>
                                    <td>{extract.descricao}</td>
                                    <td>{extract.nomeProfessor}</td>
                                    <td>{extract.quantidadeMoedas}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Extract;