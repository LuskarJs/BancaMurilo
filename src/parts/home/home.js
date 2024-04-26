    import "./home.css";
    import React, { useState, useEffect } from "react";
    import HeaderPage from "../header/header";
    import SearchIcon from "../img/big-search-len.png";
    import filtroIcon from "../img/filtro.png";
    import InterrogacaoIcon from "../img/sinal-de-interrogacao.png";
    import ShowProduto from "../mostraProduto/showProduto";
    import { produtos } from "../data/data";
    import caixa from "../img/caixa-registradora.png"
    import { Link } from "react-router-dom";
    import { motion } from "framer-motion";
    import Cookies from 'js-cookie';

    function HomePage() {
        const [produtoSelecionado, setProdutoSelecionado] = useState(null); 
        const [termoPesquisa, setTermoPesquisa] = useState("");

        const [showModal, setShowModal] = useState(false); 
        const [userData, setUserData] = useState({
            name: '',
            email: '',
            initialCash: '',
            entryTime: '', 
        });

        useEffect(() => {
            const loggedIn = Cookies.get('loggedIn');
            const userProfile = Cookies.get('userProfile'); 
            
            if (loggedIn || userProfile) {
                setShowModal(true);
            } else {
                setUserData(userProfile);
            }
        }, []);

        const handleUserDataChange = (e) => {
            const { name, value } = e.target;
            setUserData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        };

        const formatEntryTime = () => {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };
    
        const handleSaveUserData = () => {
            const formattedEntryTime = formatEntryTime();
            const userDataWithTime = { ...userData, entryTime: formattedEntryTime };
            setUserData(userDataWithTime); // Atualiza o estado de entryTime
            Cookies.set('userProfile', JSON.stringify(userDataWithTime), { expires: 365 });
            setShowModal(false);
        };

        const handleVerMais = (produto) => {
            setProdutoSelecionado(produto);
        };

        const handleCloseProduto = () => {
            setProdutoSelecionado(null);
        };

        const handleDeleteProduto = (codigo) => {
            const novosProdutos = produtos.filter((produto) => produto.codigo !== codigo);
            console.log("Produto com código", codigo, "excluído.");
        };

        const handleEditProduto = (produtoEditado) => {
            const novosProdutos = produtos.map((produto) => {
                if (produto.codigo === produtoEditado.codigo) {
                    return produtoEditado;
                }
                return produto;
            });
            console.log("Produto editado:", produtoEditado);
        };

        const handlePesquisa = (event) => {
            setTermoPesquisa(event.target.value);
        };

        const produtosFiltrados = produtos.filter(
            (produto) =>
                produto?.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                produto?.codigo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                produto?.categoria.toLowerCase().includes(termoPesquisa.toLowerCase())
        );
        
        return (

            <motion.section 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0 , opacity: 1}}
            transition={{ duration: 0.2 }}
            className="home" >
                    <Link to="/AreaVenda">
                <button className="registradora">
                        <figure>
                        <img src={caixa} alt="caixa registradora" />
                        </figure>
                </button>
                    </Link>
                <HeaderPage />
                <div className="Profile-caixa">
                    <div>
                        <h2>Caixa: <span>{userData.name}</span></h2>
                        <h2>Caixa inicial R$: <span>{userData.initialCash}</span></h2>
                    </div>
                    <div>
                        <h3>Entrada: <span>{userData.entryTime}</span></h3>
                        <h3>Vendas total :<span>0</span></h3>
                    </div>
                </div>

            <div className="Search-input">
                <input type="text" placeholder="procure por qualquer produto aqui" onChange={handlePesquisa} />
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

            <section className="EstoqueSection">
                <div className="title-estoque">
                    <h3>Ultimos Produtos Adicionados</h3>
                    <figure>
                        <img src={InterrogacaoIcon} alt="sinal de interrogacao para tirar duvidas" />
                    </figure>
                </div>
                <ul>
                    {produtosFiltrados.map((produto) => (
                        <li className="card-estoque" key={produto.codigo}>
                            <figure>
                                <img src={produto?.img} alt={`Imagem de ${produto.nome}`} />
                            </figure>
                            <div>
                                <h3>{produto.nome}</h3>
                                <h4>Tipo: <span>{produto.categoria}</span></h4>
                                <h5>Em Estoque: <span>{produto.quantidade}</span></h5>
                            </div>
                            <button onClick={() => handleVerMais(produto)}>Ver Mais</button>
                        </li>
                    ))}
                </ul>
            </section>
            
            <ShowProduto produto={produtoSelecionado} onClose={handleCloseProduto} onDelete={handleDeleteProduto} onEdit={handleEditProduto} /> 

            {showModal && (
                <div className="modal">
                    <h2>Complete seu perfil</h2>
                    <div className="input-valor">
                        <label>Nome:</label>
                        <input type="text" name="name" value={userData.name} onChange={handleUserDataChange} />
                    </div>
                    <div className="input-valor">
                        <label>Email:</label>
                        <input type="email" name="email" value={userData.email} onChange={handleUserDataChange} />
                    </div>
                    <div className="input-valor">
                        <label>Valor do Caixa Inicial:</label>
                        <input type="number" name="initialCash" value={userData.initialCash} onChange={handleUserDataChange} />
                    </div>
                    <button onClick={handleSaveUserData}>Salvar</button>
                </div>
            )}
            
            <section className="HistoricoSection">
                <div className='title-vendas'>
                    <h2>Historico de Vendas</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Cliente</th>
                            <th>Produtos Vendidos</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01/03/2024</td>
                            <td>09:30</td>
                            <td>Cliente A</td>
                            <td>Produto 1, Produto 2</td>
                            <td>R$ 150,00</td>
                        </tr>
                        <tr>
                            <td>02/03/2024</td>
                            <td>15:45</td>
                            <td>Cliente B</td>
                            <td>Produto 3, Produto 4</td>
                            <td>R$ 200,00</td>
                        </tr>
                        <tr>
                            <td>02/03/2024</td>
                            <td>15:45</td>
                            <td>Cliente B</td>
                            <td>Produto 3, Produto 4</td>
                            <td>R$ 200,00</td>
                        </tr>
                        <tr>
                            <td>02/03/2024</td>
                            <td>15:45</td>
                            <td>Cliente B</td>
                            <td>Produto 3, Produto 4</td>
                            <td>R$ 200,00</td>
                        </tr>
                        <tr>
                            <td>02/03/2024</td>
                            <td>15:45</td>
                            <td>Cliente B</td>
                            <td>Produto 3, Produto 4</td>
                            <td>R$ 200,00</td>
                        </tr>
                        <tr>
                            <td>02/03/2024</td>
                            <td>15:45</td>
                            <td>Cliente B</td>
                            <td>Produto 3, Produto 4</td>
                            <td>R$ 200,00</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <div className="resumo-desempenho-vendas">
                <h3>Resumo de Desempenho de Vendas</h3>
                <div className="dados-vendas">
                        <div class="item-venda">
                            <h4>Total de Vendas</h4>
                            <p>100</p>
                        </div>
                        <div class="item-venda">
                            <h4>Total de Receitas</h4>
                            <p>R$ 10.000,00</p>
                        </div>
                        <div class="item-venda">
                            <h4>Média de Vendas Diárias</h4>
                            <p>10 vendas/dia</p>
                        </div>
                        <div class="item-venda">
                            <h4>Total de Despesas</h4>
                            <p>R$ 2.000,00</p>
                        </div>
                        <div class="item-venda">
                            <h4>Lucro Líquido</h4>
                            <p>R$ 8.000,00</p>
                        </div>
                        <div class="item-venda">
                            <h4>Porcentagem de Margem de Lucro</h4>
                            <p>80%</p>
                        </div>
                        <div class="item-venda">
                            <h4>Total de Clientes</h4>
                            <p>50</p>
                        </div>
                    </div>
                </div>
        </motion.section>
        
        
    );
}

export default HomePage; 