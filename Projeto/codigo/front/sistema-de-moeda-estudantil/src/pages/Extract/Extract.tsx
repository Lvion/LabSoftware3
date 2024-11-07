import './Extract.css';
import NavBar from '../NavBar/NavBar';


interface StudentExtract {
    id: number;
    date: string;
    professor: string;
    description: string;
    value: number;
}

const studentExtract: StudentExtract[] = [
    {
        id: 1,
        date: '01/01/2021',
        professor: 'Professor 1',
        description: 'Aula de matemática',
        value: 10,
    },
    {
        id: 2,
        date: '02/01/2021',
        professor: 'Professor 2',
        description: 'Aula de português',
        value: 20,
    },
    {
        id: 3,
        date: '03/01/2021',
        professor: 'Professor 3',
        description: 'Aula de história',
        value: 30,
    },
    {
        id: 4,
        date: '04/01/2021',
        professor: 'Professor 4',
        description: 'Aula de geografia',
        value: 40,
    },
    {
        id: 5,
        date: '05/01/2021',
        professor: 'Professor 5',
        description: 'Aula de ciências',
        value: 50,
    },
    {
        id: 6,
        date: '06/01/2021',
        professor: 'Professor 6',
        description: 'Aula de física',
        value: 60,
    },
    {
        id: 7,
        date: '07/01/2021',
        professor: 'Professor 7',
        description: 'Aula de química',
        value: 70,
    },
    {
        id: 8,
        date: '08/01/2021',
        professor: 'Professor 8',
        description: 'Aula de biologia',
        value: 80,
    },
    {
        id: 9,
        date: '09/01/2021',
        professor: 'Professor 9',
        description: 'Aula de educação física',
        value: 90,
    },
    {
        id: 10,
        date: '10/01/2021',
        professor: 'Professor 10',
        description: 'Aula de artes',
        value: 100,
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
                                <th>Professor</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentExtract.map((extract) => (
                                <tr key={extract.id}>
                                    <td>{extract.date}</td>
                                    <td>{extract.professor}</td>
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