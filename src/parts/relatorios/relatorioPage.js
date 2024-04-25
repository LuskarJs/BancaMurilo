import React, { useState } from 'react';
import "./relatorio.css";
import { motion } from "framer-motion";
import Header from '../header/header'; 
import { produtos } from '../data/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as XLSX from 'xlsx'; 

import { PDFDownloadLink } from '@react-pdf/renderer';
import RelatorioPDF from './RelatorioPDF'; 

function RelatoriosPage() {
    const [periodo, setPeriodo] = useState('hoje');
    const [relatorioProdutos, setRelatorioProdutos] = useState([]);
    const [relatorioProdutosMaisVendidos, setRelatorioProdutosMaisVendidos] = useState([]);
    const [relatorioProdutosSaidaPouco, setRelatorioProdutosSaidaPouco] = useState([]);
    const [exibirProdutosSaidaBaixa, setExibirProdutosSaidaBaixa] = useState(false);

    const calcularDadosRelatorios = () => {
        console.log("Período selecionado:", periodo);

        const relatorioTodosProdutos = produtos.map(produto => ({
            nome: produto.nome,
            vendas: produto.vendidoMes,
            precoVenda: produto.precoVenda,
            precoCompra: produto.precoCompra,
        }));
        setRelatorioProdutos(relatorioTodosProdutos);

        const produtosMaisVendidos = produtos.sort((a, b) => b.vendidoMes - a.vendidoMes).slice(0, 5); 
        setRelatorioProdutosMaisVendidos(produtosMaisVendidos);

        const produtosSaidaPouco = produtos.filter(produto => produto.quantidade < 10);
        setRelatorioProdutosSaidaPouco(produtosSaidaPouco);
        setExibirProdutosSaidaBaixa(produtosSaidaPouco.length > 0);
    };

    const handleChangePeriodo = (event) => {
        setPeriodo(event.target.value);
    };

    const handleGerarRelatorios = () => {
        calcularDadosRelatorios();
    };

    const handleBaixarRelatorio = (tipoRelatorio, detalhado) => {
        if (tipoRelatorio === 'produtosMaisVendidos') {
            if (detalhado) {
                handleBaixarRelatorioPDF(tipoRelatorio);
            } else {
                handleBaixarRelatorioExcel(tipoRelatorio);
            }
        } else if (tipoRelatorio === 'produtosSaidaPouco') {
            if (detalhado) {
                handleBaixarRelatorioPDF(tipoRelatorio);
            } else {
                handleBaixarRelatorioExcel(tipoRelatorio);
            }
        }
    };
    

    const handleBaixarRelatorioPDF = (relatorio) => {
        const nomeArquivo = `${relatorio}.pdf`;
        return (
            <PDFDownloadLink document={<RelatorioPDF dados={relatorio === 'produtosMaisVendidos' ? relatorioProdutosMaisVendidos : relatorioProdutosSaidaPouco} />} fileName={nomeArquivo}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Carregando documento...' : 'Baixar Relatório PDF'
                }
            </PDFDownloadLink>
        );
    };

    const handleBaixarRelatorioExcel = (relatorio) => {
        const dados = relatorio === 'produtosMaisVendidos' ? relatorioProdutosMaisVendidos : relatorioProdutosSaidaPouco;
        const nomeArquivo = `${relatorio}.xlsx`;

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(dados);
        XLSX.utils.book_append_sheet(wb, ws, relatorio);
        XLSX.writeFile(wb, nomeArquivo);
    };
    return (
        <motion.section 
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0 , opacity: 1}}
        transition={{ duration: 0.2 }}
        className='RelatorioSection'
        >
            <Header />
            <div className="relatorio-content">
                <div className='title-relatorio'>
                  <h1>Relatórios</h1>
                </div>

                <div className="filtro-periodo">
                    <select value={periodo} onChange={handleChangePeriodo}>
                        <option value="hoje">Hoje</option>
                        <option value="15dias">Últimos 15 Dias</option>
                        <option value="1mes">Último Mês</option>
                        <option value="todo">Todo o Período</option>
                    </select>
                    <button onClick={handleGerarRelatorios}>Gerar Relatórios</button>
                </div>           

                <div className="grafico-vendas">
                    <h2>Gráfico de Vendas Totais</h2>
                    <BarChart width={400} height={300} data={relatorioProdutos}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nome" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="vendas" fill="#8884d8" />
                    </BarChart>
                </div>

                <div className="tabela-produtos">
                    <h2>Relatório de Produtos Populares</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Vendas</th>
                                <th>Preço Venda</th>
                                <th>Preço Compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorioProdutos.map((produto, index) => (
                                <tr key={index}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.vendas}</td>
                                    <td>{produto.precoVenda}</td>
                                    <td>{produto.precoCompra}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grafico-mais-vendidos">
                    <h2>Gráfico de Produtos Mais Vendidos</h2>
                    <BarChart width={400} height={300} data={relatorioProdutosMaisVendidos}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nome" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="vendidoMes" fill="#82ca9d" />
                    </BarChart>
                </div>

                <div className="tabela-mais-vendidos">
                    <h2>Produtos Mais Vendidos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Vendas</th>
                                <th>Preço Venda</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorioProdutosMaisVendidos.map((produto, index) => (
                                <tr key={index}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.vendidoMes}</td>
                                    <td>{produto.precoVenda}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {exibirProdutosSaidaBaixa ? (
                    <div className="tabela-saida-baixa">
                        <h2>Produtos com Saída Baixa</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade em Estoque</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relatorioProdutosSaidaPouco.map((produto, index) => (
                                    <tr key={index}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.quantidade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Nenhum produto está com saída baixa no estoque.</p>
                )}
            </div>

            <div className='action-buttons'>
                    <button onClick={() => handleBaixarRelatorio('produtosMaisVendidos', false)}>Baixar Relatório de Produtos Mais Vendidos Simplificado</button>
                    <button onClick={() => handleBaixarRelatorio('produtosMaisVendidos', true)}>Baixar Relatório de Produtos Mais Vendidos Detalhado</button>
                    <button onClick={() => handleBaixarRelatorio('produtosSaidaPouco', false)}>Baixar Relatório de Produtos com Saída Baixa Simplificado</button>
                    <button onClick={() => handleBaixarRelatorio('produtosSaidaPouco', true)}>Baixar Relatório de Produtos com Saída Baixa Detalhado</button>
                </div>
        </motion.section>
    );
}

export default RelatoriosPage;
