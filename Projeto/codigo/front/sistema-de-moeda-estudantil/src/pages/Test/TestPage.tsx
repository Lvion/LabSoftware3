import React, { useState } from 'react';
import './TestPage.css';


interface Item {
    id: number;
    nome: string;
}

const TestPage: React.FC = () => {
    const initialItems: Item[] = [
        { id: 1, nome: 'Item 1' },
        { id: 2, nome: 'Item 2' },
        { id: 3, nome: 'Item 3' },
        { id: 4, nome: 'Item 4' },
        { id: 5, nome: 'Item 5' }
    ];

    const [selectedItem, setSelectedItem] = useState<string>('');  

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(e.target.value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Página de Teste/Login bem sucedido</h1>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="item-select" style={{ marginRight: '10px' }}>Selecione um Item:</label>
                <select
                    id="item-select"
                    value={selectedItem}
                    onChange={handleSelectChange}
                    style={{ padding: '10px', fontSize: '16px' }}
                >
                    <option value="">Selecione uma opção</option>
                    {initialItems.map((item) => (
                        <option key={item.id} value={item.id.toString()}>
                            {item.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h3>Item Selecionado:</h3>
                <p>{selectedItem ? `Você selecionou o item com ID: ${selectedItem}` : 'Nenhum item selecionado'}</p>
            </div>

            <button
                onClick={() => alert(`Item selecionado: ${selectedItem}`)}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            >
                Testar Seleção
            </button>
        </div>
    );
};

export default TestPage;
