import React, { useContext, useEffect, useState } from 'react';
import { TbCoin } from "react-icons/tb";
import { UserContext } from '../../contexts/UserContext';
import Loading from '../../components/Loading/Loading';
import NavBar from '../NavBar/NavBar';
import './ProfessorPage.css';

const ProfessorPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [alunos, setAlunos] = useState([]);
    const [selectedAluno, setSelectedAluno] = useState('');
    const [quantidadeMoedas, setQuantidadeMoedas] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Buscar lista de alunos
        const fetchAlunos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/student/listar');
                const data = await response.json();
                setAlunos(data);
            } catch (error) {
                console.error('Erro ao carregar alunos', error);
            }
        };
        fetchAlunos();
    }, []);

    const handleTransferencia = async () => {
        setError('');
        setSuccess('');
        if (!user || !quantidadeMoedas || !selectedAluno) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        const quantidade = parseInt(quantidadeMoedas);
        if (user.data.saldoMoedas < quantidade) {
            setError("Saldo insuficiente.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/transacoes/transferir`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    professorEmail: user.data.email,
                    alunoId: selectedAluno,
                    quantidadeMoedas: quantidade,
                    descricao: descricao || "Transferência de moedas"
                }),
            });
            

            if (response.ok) {
                const newSaldo = user.data.saldoMoedas - quantidade;
                setUser({ ...user, data: { ...user.data, saldoMoedas: newSaldo } });
                setSuccess("Transferência realizada com sucesso!");
                setQuantidadeMoedas('');
                setSelectedAluno('');
                setDescricao('');
            } else {
                setError("Erro ao realizar a transferência.");
            }
        } catch (error) {
            console.error("Erro ao fazer transferência", error);
            setError("Erro ao fazer transferência.");
        }
    };

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
                    <div className='balance-text'>
                        <TbCoin size={30} /> Saldo: {user.data.saldoMoedas}
                    </div>
                </div>

                <div className='transfer-section'>
                    <h2>Transferir Moedas para Aluno</h2>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <select
                        value={selectedAluno}
                        onChange={(e) => setSelectedAluno(e.target.value)}
                        required
                    >
                        <option value="">Selecione um aluno</option>
                        {alunos.map((aluno) => (
                            <option key={aluno.id} value={aluno.id}>
                                {aluno.nome}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Quantidade de Moedas"
                        value={quantidadeMoedas}
                        onChange={(e) => setQuantidadeMoedas(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Descrição (opcional)"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <button onClick={handleTransferencia}>Transferir</button>
                </div>
            </div>
        </div>
    );
};

export default ProfessorPage;
