import React, { useState, useEffect } from 'react';
import { produtos } from "../data/data";
import addButton from '../img/botao-adicionar.png'; 
import {motion} from 'framer-motion';
import filtroIcon from '../img/filtro.png';
import HeaderPage from '../header/header';
import Modal from './modal';
import "./estoque.css";

function EstoquePage() {
    const [categorias, setCategorias] = useState([]); 
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(''); 
    const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);
    const [filtroAtivo, setFiltroAtivo] = useState(false);
    const [filtroSelecionado, setFiltroSelecionado] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const categoriasUnicas = [...new Set(produtos.map(produto => produto.categoria))];
        setCategorias(categoriasUnicas);
    }, []);

    useEffect(() => {
        const applyFilter = () => {
            switch (filtroSelecionado) {
                case 'ultimos-adicionados':
                    setProdutosFiltrados(produtos.slice().reverse());
                    break;
                case 'ordem-alfabetica':
                    setProdutosFiltrados(produtos.slice().sort((a, b) => a.nome.localeCompare(b.nome))); 
                    break;
                case 'mais-vendido':
                    break;
                case 'menos-vendido':
                    break;
                case 'estoque-baixo':
                    setProdutosFiltrados(produtos.filter(produto => produto.quantidade < 10)); 
                    break;
                default:
                    setProdutosFiltrados(produtos); 
                    break;
            }
        };

        if (filtroSelecionado !== '') {
            applyFilter();
        }
    }, [filtroSelecionado]);

    const handlePesquisa = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProdutos = produtos.filter(produto => produto.nome.toLowerCase().includes(searchTerm));
        setProdutosFiltrados(filteredProdutos);
    };

    const handleSelecionarCategoria = (categoria) => {
        setCategoriaSelecionada(categoria);
        const filteredProdutos = produtos.filter(produto => produto.categoria.toLowerCase() === categoria.toLowerCase());
        setProdutosFiltrados(filteredProdutos);
    };

    const handleFiltroIconClick = () => {
        setFiltroAtivo(!filtroAtivo);
    };

    const handleFiltroChange = (event) => {
        const { value } = event.target;
        setFiltroSelecionado(value);
    };

    const handleConfirmarFiltro = () => {
        console.log('Filtro selecionado:', filtroSelecionado);
        setFiltroAtivo(false);
    };

    const handleAdicionarVenda = (produto) => {
        console.log(`Produto adicionado à venda: ${produto.nome}`);
    };

    const abrirModal = () => {
        setShowModal(true);
    };

    return (
        <motion.section className='EstoqueSection'
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0 , opacity: 1}}
        transition={{ duration: 0.2 }}> 
            <HeaderPage />
             <div className="title-estoque">
                <h4>Estoque</h4>
            </div>
            <div className="Search-input">
                <input type="text" placeholder="Procure por qualquer produto aqui" onChange={handlePesquisa} />
                <button onClick={abrirModal}>
                    <figure>
                        <img src={addButton} alt="Ícone de procura" />
                    </figure>
                </button>
                <button onClick={handleFiltroIconClick}>
                    <figure>
                        <img src={filtroIcon} alt="Ícone de filtro" />
                    </figure>
                </button>
            </div>
            {filtroAtivo && (
                <div className="filtro-container">
                    <label>Filtrar por:</label>
                    <select value={filtroSelecionado} onChange={handleFiltroChange}>
                        <option value="">Selecione...</option>
                        <option value="ultimos-adicionados">Últimos Adicionados</option>
                        <option value="ordem-alfabetica">Ordem Alfabética</option>
                        <option value="mais-vendido">Mais Vendido</option>
                        <option value="menos-vendido">Menos Vendido</option>
                        <option value="estoque-baixo">Menos de 10 em Estoque</option>
                    </select>
                    <button onClick={handleConfirmarFiltro}>Confirmar</button>
                </div>
            )}
            <ul className="lista-categorias">
                {categorias.map((categoria, index) => (
                <li
                    key={index}
                    onClick={() => handleSelecionarCategoria(categoria)}
                    className={categoriaSelecionada.toLowerCase() === categoria.toLowerCase() ? "selected" : ""}
                >
                    {categoria}
                </li>
                ))}
            </ul>
            <ul className="lista-produtos-venda">
                {produtosFiltrados.map((produto) => (
                <li className="card-estoque" key={produto.codigo}>
                    <figure>
                    <img src={produto.img} alt={produto.nome} />
                    </figure>
                    <div>
                    <h3>{produto.nome}</h3>
                    <h4>
                        Categoria: <span>{produto.categoria}</span>
                    </h4>
                    <h5>
                        Em Estoque: <span>{produto.quantidade}</span>
                    </h5>
                    <h6>
                        Preço R$: <span>{produto.precoVenda}</span>
                    </h6>
                    </div>
                    <button onClick={() => handleAdicionarVenda(produto)}>Adicionar a Venda</button>
                </li>
                ))}
            </ul>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </motion.section>
    )
}

export default EstoquePage;
