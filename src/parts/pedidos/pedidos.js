import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import "./pedidos.css";

function HistoricoDeVendas() {
    const [vendasFeitas, setVendasFeitas] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('data');
    const [vendasFiltradas, setVendasFiltradas] = useState([]);

    useEffect(() => {
        const dummyVendasFeitas = [
            { id: 1, date: '2024-04-10', time: '10:30', product: 'Produto A', quantity: 3, totalPrice: 150, user: 'João' },
            { id: 2, date: '2024-04-11', time: '11:45', product: 'Produto B', quantity: 2, totalPrice: 100, user: 'Maria' },
            { id: 3, date: '2024-04-12', time: '09:15', product: 'Produto C', quantity: 1, totalPrice: 50, user: 'Pedro' },
            { id: 3, date: '2024-04-12', time: '09:15', product: 'Produto C', quantity: 1, totalPrice: 50, user: 'Pedro' },
            { id: 3, date: '2024-04-12', time: '09:15', product: 'Produto C', quantity: 1, totalPrice: 50, user: 'Pedro' },
            { id: 3, date: '2024-04-12', time: '09:15', product: 'Produto C', quantity: 1, totalPrice: 50, user: 'Pedro' },
            
        ];

        setVendasFeitas(dummyVendasFeitas);
        setVendasFiltradas(dummyVendasFeitas);
    }, []);

    useEffect(() => {
        if (filtro.trim() === '') {
            setVendasFiltradas(vendasFeitas);
        } else {
            const vendasFiltradasTemp = vendasFeitas.filter((venda) => {
                const filterLowerCase = filtro.toLowerCase();
                switch (tipoFiltro) {
                    case 'data':
                        return venda.date.toLowerCase().includes(filterLowerCase);
                    case 'hora':
                        return venda.time.toLowerCase().includes(filterLowerCase);
                    case 'produto':
                        return venda.product.toLowerCase().includes(filterLowerCase);
                    case 'usuario':
                        return venda.user.toLowerCase().includes(filterLowerCase);
                    default:
                        return true;
                }
            });
            setVendasFiltradas(vendasFiltradasTemp);
        }
    }, [filtro, tipoFiltro, vendasFeitas]);

    const handleFilterChange = (event) => {
        setFiltro(event.target.value);
    };

    const handleTipoFiltroChange = (event) => {
        setTipoFiltro(event.target.value);
    };

    const handleFilterSubmit = () => {
        if (filtro.trim() === '') {
            setVendasFiltradas(vendasFeitas);
        } else {
            const vendasFiltradasTemp = vendasFeitas.filter((venda) => {
                const filterLowerCase = filtro.toLowerCase();
                switch (tipoFiltro) {
                    case 'data':
                        return venda.date.toLowerCase().includes(filterLowerCase);
                    case 'hora':
                        return venda.time.includes(filterLowerCase);
                    case 'produto':
                        return venda.product.toLowerCase().includes(filterLowerCase);
                    case 'usuario':
                        return venda.user.toLowerCase().includes(filterLowerCase);
                    default:
                        return true;
                }
            });
            setVendasFiltradas(vendasFiltradasTemp);
        }
    };    

    return (
        <section className="historico-de-vendasPage">
            <Header />
            <h1>Histórico de Vendas</h1>
            <div className="filtro">
                <select value={tipoFiltro} onChange={handleTipoFiltroChange}>
                    <option value="data">Data</option>
                    <option value="hora">Hora</option>
                    <option value="produto">Produto</option>
                    <option value="usuario">Usuário</option>
                </select>
                <input
                    type="text"
                    placeholder={`Filtrar por ${tipoFiltro}...`}
                    value={filtro}
                    onChange={handleFilterChange}
                />
                <button onClick={handleFilterSubmit}>Filtrar</button>
            </div>
            <div className="vendas-feitas">
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço Total</th>
                            <th>Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendasFiltradas.map((venda) => (
                            <tr key={venda.id}>
                                <td>{venda.date}</td>
                                <td>{venda.time}</td>
                                <td>{venda.product}</td>
                                <td>{venda.quantity}</td>
                                <td>{venda.totalPrice}</td>
                                <td>{venda.user}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HistoricoDeVendas;
