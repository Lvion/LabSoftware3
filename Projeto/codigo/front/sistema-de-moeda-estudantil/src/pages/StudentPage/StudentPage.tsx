import React, { useEffect, useState } from 'react';
import Api from '../../utils/Api';
import Loading from '../../components/Loading/Loading';
import NavBar from '../NavBar/NavBar';

interface Student {
    name: string;
    balance: number;
    code: string;
}

const mock = {
    name: 'João',
    balance: 100,
    code: '123456',
};

const StudentPage = () => {
    const [student, setStudent] = useState<Student>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            setStudent(student);
            setLoading(false);
        };

        fetchStudent();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className='side-bar'>
                <NavBar />
            </div>
            <h1>Olá, {student?.name}!</h1>
            <h2>Seu saldo é de {student?.balance} moedas.</h2>
            <h3>Seu código de estudante é {student?.code}.</h3>
        </div>
    );
}

export default StudentPage;
