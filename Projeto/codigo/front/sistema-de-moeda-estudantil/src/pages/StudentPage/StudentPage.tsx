import React, { useEffect, useState } from 'react';
import { TbCoin } from "react-icons/tb";
import Api from '../../utils/Api';
import Loading from '../../components/Loading/Loading';
import NavBar from '../NavBar/NavBar';
import './StudentPage.css';


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
            setStudent(mock);
            setLoading(false);
        };

        fetchStudent();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <NavBar />
            <div className='main-content'>
                <div className='page-head-container'>
                    <div className='page-head-title'>
                        <h1>Olá, {student?.name}!</h1>
                    </div>
                    <div className='ballance-text'>
                        <TbCoin size={30} /> {student?.balance}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentPage;
