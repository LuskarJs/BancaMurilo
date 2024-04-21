import React, { useState, useEffect } from 'react';
import { produtos } from "../data/data";
import SearchIcon from '../img/big-search-len.png'; 
import filtroIcon from '../img/filtro.png';
import HeaderPage from '../header/header';
import "./estoque.css";

function EstoquePage() {
    const [categorias, setCategorias] = useState([]); 
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(''); 
    const [produtosFiltrados, setProdutosFiltrados] = useState(produtos); 

    useEffect(() => {
        const categoriasUnicas = [...new Set(produtos.map(produto => produto.categoria))];
        setCategorias(categoriasUnicas);
    }, []);

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

    const handleAdicionarVenda = (produto) => {
        console.log(`Produto adicionado à venda: ${produto.nome}`);
    };

    return (
        <section className='EstoqueSection'> 
        <HeaderPage />
             <div className="title-estoque">
                <h4>Estoque</h4>
            </div>
            <div className="Search-input">
                <input type="text" placeholder="Procure por qualquer produto aqui" onChange={handlePesquisa} />
                <button>
                <figure>
                    <img src={SearchIcon} alt="Ícone de procura" />
                </figure>
                </button>
                <button>
                <figure>
                    <img src={filtroIcon} alt="Ícone de filtro" />
                </figure>
                </button>
            </div>
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
                    <img src={produto.img} alt="" />
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
                        Preço <span>{produto.precoVenda}</span>
                    </h6>
                    </div>
                    <button onClick={() => handleAdicionarVenda(produto)}>Adicionar a Venda</button>
                </li>
                ))}
            </ul>
        </section>
    )
}

export default EstoquePage;
