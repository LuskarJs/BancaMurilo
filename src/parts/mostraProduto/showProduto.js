import './show.css';
import InterrogacaoIcon from "../img/sinal-de-interrogacao.png";
import xIcon from "../img/Close.png";
import seda from "../img/caixaseda.png";
import editar from "../img/troca.png";
import apagar from "../img/botao-apagar.png";
import React, { useState } from "react";


function ShowProduto() {

    const [isOpen,setisOpen] = useState(false);

    const OpenEClose = () => {
        setisOpen(true)
    }

    return (
        <section className={`cardSection ${isOpen ? "show" : "hidden" }`} >
            <div className="cardShow">
                <div className="top-action">
                    <figure>
                        <img src={InterrogacaoIcon} alt="para tirar duvida sobre a seção" />
                    </figure>
                    <figure 
                        onClick={OpenEClose}
                    >
                        <img src={xIcon} alt="x para fechar a janela" />
                    </figure>
                </div>
                <div className="infoCard">
                    <div className='imgCard'>
                        <figure>
                            <img src={seda} alt="imagem do produto" />
                        </figure>
                    </div>
                    <div className='titleCard'>
                        <h3>Seda Zomo Marrom</h3>
                    </div>
                    <ul>
                        <li>Codigo: <span>457</span></li>
                        <li>Preço: R$<span>4</span></li>
                        <li>Unidade: <span>45</span></li>
                        <li>Vendidas essa semana: <span>75</span></li>
                        <li>Vendidas Hoje: <span>4</span></li>
                        <li>Vendidas nesses Mês: <span>5</span></li>
                    </ul>
                    <div className='button-actions'>
                        <button>
                            <figure>
                                <img src={editar} alt="" />
                            </figure>
                            Editar
                        </button>
                        <button>
                            <figure>
                                <img src={apagar} alt="" />
                            </figure>
                        </button>
                    </div>
                    <p>Ver Relatorio Completo</p>
                </div>
            </div>
        </section>
    )
 }

 export default ShowProduto;