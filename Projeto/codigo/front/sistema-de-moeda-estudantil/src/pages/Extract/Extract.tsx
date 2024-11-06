import './Extract.css';
import NavBar from '../NavBar/NavBar';


interface StudentExtract {
    id: number;
    date: string;
    description: string;
    value: number;
}

const studentExtract: StudentExtract[] = [
    {
        id: 1,
        date: '01/01/2021',
        description: 'Crédito',
        value: 100,
    },
    {
        id: 2,
        date: '02/01/2021',
        description: 'Crédito',
        value: 10,
    },
    {
        id: 3,
        date: '03/01/2021',
        description: 'Crédito',
        value: 50,
    },
    {
        id: 4,
        date: '04/01/2021',
        description: 'Crédito',
        value: 20,
    },
];

const Extract = () => {
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
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentExtract.map((extract) => (
                                <tr key={extract.id}>
                                    <td>{extract.date}</td>
                                    <td>{extract.description}</td>
                                    <td>{extract.value}</td>
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