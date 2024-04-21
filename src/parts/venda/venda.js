import React, { useState, useEffect } from "react";
import "./venda.css";
import carrinho from "../img/carrinho.png";
import SearchIcon from "../img/big-search-len.png";
import filtroIcon from "../img/filtro.png";
import { produtos } from "../data/data";
import HeaderPage from "../header/header";
import TabelaCarrinho from "./tabelaVenda";
import Cookies from "js-cookie";

function PageVenda() {
  const [totalItens, setTotalItens] = useState(0);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [vendaFinalizada, setVendaFinalizada] = useState(false);

  useEffect(() => {
    // Carregar produtos salvos no cookie ao iniciar
    const produtosSalvos = Cookies.get("produtosSelecionados");
    if (produtosSalvos) {
      setProdutosSelecionados(JSON.parse(produtosSalvos));
    }
  }, []);

  const handleAdicionarVenda = (produto) => {
    const produtoExistente = produtosSelecionados.find((p) => p.codigo === produto.codigo);
    if (produtoExistente) {
      const novosProdutosSelecionados = produtosSelecionados.map((p) =>
        p.codigo === produto.codigo ? { ...p, quantidade: p.quantidade + 1 } : p
      );
      setProdutosSelecionados(novosProdutosSelecionados);
    } else {
      const novoProduto = { ...produto, quantidade: 1 };
      setProdutosSelecionados([...produtosSelecionados, novoProduto]);
    }
    setTotalItens(totalItens + 1);
  };
  
  const handlePesquisa = (event) => {
    setTermoPesquisa(event.target.value);
  };

  const handleSelecionarCategoria = (categoria) => {
    setCategoriaSelecionada(categoria);
  };

  const handleFinalizarVenda = () => {
    setVendaFinalizada(true);
  };

  const handleResetVenda = () => {
    setProdutosSelecionados([]);
    setTotalItens(0);
    setVendaFinalizada(false);
    Cookies.remove("produtosSelecionados");
  };

  const categorias = [...new Set(produtos.map((produto) => produto.categoria))];

  const produtosFiltrados = produtos.filter((produto) => {
    const termo = termoPesquisa.toLowerCase();
    const categoria = categoriaSelecionada.toLowerCase();
    return (
      (produto.nome.toLowerCase().includes(termo) ||
        produto.codigo.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)) &&
      (categoria === "todos" || produto.categoria.toLowerCase() === categoria)
    );
  });

  return (
    <section className="venda-page">
      < HeaderPage />
      <div className="title-venda">
        <h4>Área de Venda</h4>
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
      {vendaFinalizada ? (
        <TabelaCarrinho produtos={produtosSelecionados} setProdutos={setProdutosSelecionados} onClose={handleResetVenda} onFinalizarVenda={handleFinalizarVenda} />
      ) : (
        <div className="actions-buttons">
          {produtosSelecionados.length > 0 && (
            <>
              <button>
                <figure>
                  <img src={carrinho} alt="Ícone carrinho de compras" />
                </figure>
                <p>Total de Itens: <span>{totalItens}</span></p>
              </button>
              <button onClick={handleFinalizarVenda}>Finalizar Venda</button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default PageVenda;
