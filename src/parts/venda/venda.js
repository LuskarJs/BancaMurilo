import React, {useState} from "react";
import "./venda.css";
import carrinho from "../img/carrinho.png"
import SearchIcon from "../img/big-search-len.png";
import filtroIcon from "../img/filtro.png";
import produto from "../img/caixaseda.png";
import TabelaCarrinho from "./tabelaVenda";

function PageVenda() {
    const [totalItens, setTotalItens] = useState(0);
    const [produtos, setProdutos] = useState([]);

    const atualizarTotalItens = (quantidade) => {
        setTotalItens(quantidade);
    };

    return (
        <section className="venda-page">
            <div className="title-venda">
                <h4>Aréa de Venda</h4>
            </div>
             <div className="Search-input">
                <input type="text" placeholder="procure por qualquer produto aqui" />
                <button>
                    <figure>
                        <img src={SearchIcon} alt="icone de procura" />
                    </figure>
                </button>
                <button>
                    <figure>
                        <img src={filtroIcon} alt="icone filtro" />
                    </figure>
                </button>
            </div>
            <ul className="lista-categoiras">
                <li>Todos</li>
                <li>Bebidas</li>
                <li>cigarro</li>
            </ul>
            <TabelaCarrinho produtos={produtos} setProdutos={setProdutos} />
            <ul className="lista-produtos-venda">
                    <li className="card-estoque">
                        <figure>
                            <img src={produto} alt="" />
                        </figure>
                        <div>
                            <h3>Seda Zomo Marrom</h3>
                            <h4>Categoria: <span>tabacaria</span></h4>
                            <h5>Em Estoque: <span>42</span></h5>
                            <h6>Preço <span>42</span></h6>
                        </div>
                        <button>Adicionar a Venda</button>
                    </li>
                    <li className="card-estoque">
                        <figure>
                            <img src={produto} alt="" />
                        </figure>
                        <div>
                            <h3>Seda Zomo Marrom</h3>
                            <h4>Categoria: <span>tabacaria</span></h4>
                            <h5>Em Estoque: <span>42</span></h5>
                            <h6>Preço <span>42</span></h6>
                        </div>
                        <button>Adicionar a Venda</button>
                    </li>
                    <li className="card-estoque">
                        <figure>
                            <img src={produto} alt="" />
                        </figure>
                        <div>
                            <h3>Seda Zomo Marrom</h3>
                            <h4>Categoria: <span>tabacaria</span></h4>
                            <h5>Em Estoque: <span>42</span></h5>
                            <h6>Preço <span>42</span></h6>
                        </div>
                        <button>Adicionar a Venda</button>
                    </li>
                    <li className="card-estoque">
                        <figure>
                            <img src={produto} alt="" />
                        </figure>
                        <div>
                            <h3>Seda Zomo Marrom</h3>
                            <h4>Categoria: <span>tabacaria</span></h4>
                            <h5>Em Estoque: <span>42</span></h5>
                            <h6>Preço <span>42</span></h6>
                        </div>
                        <button>Adicionar a Venda</button>
                    </li>
                    <li className="card-estoque">
                        <figure>
                            <img src={produto} alt="" />
                        </figure>
                        <div>
                            <h3>Seda Zomo Marrom</h3>
                            <h4>Categoria: <span>tabacaria</span></h4>
                            <h5>Em Estoque: <span>42</span></h5>
                            <h6>Preço <span>42</span></h6>
                        </div>
                        <button>Adicionar a Venda</button>
                    </li>
                    <li className="card-estoque">
                        <figure>
                            <img src={produto} alt="" />
                        </figure>
                        <div>
                            <h3>Seda Zomo Marrom</h3>
                            <h4>Categoria: <span>tabacaria</span></h4>
                            <h5>Em Estoque: <span>42</span></h5>
                            <h6>Preço <span>42</span></h6>
                        </div>
                        <button>Adicionar a Venda</button>
                    </li>
            </ul>
            <div className="actions-buttons"> 
                <button>
                    <figure>
                        <img src={ carrinho} alt="icone carrinho de compras" />
                    </figure>
                    <p>Total de Itens: <span>{totalItens}</span></p>
                </button>
                <button> Finalizar Venda</button>
            </div>
        </section>
    )
}

export default PageVenda;