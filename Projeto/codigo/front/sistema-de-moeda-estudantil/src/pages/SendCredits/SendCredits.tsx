import { useState, useEffect, useContext } from 'react';
import NavBar from '../NavBar/NavBar';
import { UserContext } from '../../contexts/UserContext';
import Loading from '../../components/Loading/Loading';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

import './SendCredits.css';
import Api from '../../services/Api';

const SendBenefits = () => {
    const { user, setUser } = useContext(UserContext);
    const [alunos, setAlunos] = useState([]);
    const [selectedAluno, setSelectedAluno] = useState('');
    const [quantidadeMoedas, setQuantidadeMoedas] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const response = await Api.getAllStudents();
                setAlunos(response);
            } catch (error) {
                console.error('Erro ao carregar alunos', error);
            }
        };
        fetchAlunos();
    }, []);

    const handleSelectedAluno = (e: any) => {
        setSelectedAluno(e.target.value);
        setError('');
        setSuccess('');
    }

    const handleTransferencia = async () => {
        setError('');
        setSuccess('');
        if (!user || !quantidadeMoedas || !selectedAluno) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }
    
        const quantidade = parseInt(quantidadeMoedas);
        if ('saldoMoedas' in user.data && user.data.saldoMoedas < quantidade) {
            setError("Saldo insuficiente.");
            return;
        }
    
        try {
            const response = await Api.sendCredits(user.data.email, selectedAluno, quantidade, descricao);
    
            if (response.ok) {
                if ('saldoMoedas' in user.data) {
                    const newSaldo = user.data.saldoMoedas - quantidade;
                    setUser({ ...user, data: { ...user.data, saldoMoedas: newSaldo } });
                }
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
                        <h1>Enviar créditos</h1>
                    </div>
                </div>
                <div className='result-head-title'>
                    {error && <p className='error'>{error}</p>}
                    {success && <p className='success'>{success}</p>}
                </div>
                <div className='send-credits-form'>
                    <CustomInput
                        label="Selecione um aluno"
                        type="select"
                        placeholder="Escolha um aluno"
                        value={selectedAluno}
                        onChange={(e) => handleSelectedAluno(e)}
                        options={alunos.map((aluno: any) => ({ value: aluno.id, label: aluno.nome }))}
                        required
                    />
                    {selectedAluno && (
                        <>
                            <CustomInput
                                label="Quantidade de moedas"
                                type="number"
                                placeholder="Informe a quantidade de moedas"
                                value={quantidadeMoedas}
                                onChange={(e) => setQuantidadeMoedas(e.target.value)}
                                required
                            />
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Informe uma descrição"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </>
                    )}
                    <div className='action-buttons-container'>
                        <CustomButton label="Enviar créditos" onClick={handleTransferencia} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendBenefits;