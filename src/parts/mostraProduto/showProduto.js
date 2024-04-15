import './show.css';
import InterrogacaoIcon from "../img/sinal-de-interrogacao.png";
import xIcon from "../img/Close.png";
import editar from "../img/troca.png";
import apagar from "../img/botao-apagar.png";
import React, { useState } from "react";

function ShowProduto({ produto, onClose, onDelete, onEdit }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...produto });

    const close = () => {
        setIsOpen(false);
        onClose();
    };

    React.useEffect(() => {
        if (produto) {
            setIsOpen(true);
        }
    }, [produto]);

    const handleDelete = () => {
        onDelete(produto.codigo);
        close();
    };

    const handleEdit = () => {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
            onEdit(editedProduct);
            close();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    return (
        <section className={`cardSection ${isOpen ? "show" : "hidden"}`}>
            <div className="cardShow">
                <div className="top-action">
                    <figure>
                        <img src={InterrogacaoIcon} alt="para tirar duvida sobre a seção" />
                    </figure>
                    <figure onClick={close}>
                        <img src={xIcon} alt="x para fechar a janela" />
                    </figure>
                </div>
                <div className="infoCard">
                    <div className="imgCard">
                        <figure>
                            <img src={produto?.img} alt="imagem" />
                        </figure>
                    </div>
                    <div className="titleCard">
                        <h3>{isEditing ? <input type="text" name="nome" value={editedProduct?.nome} onChange={handleChange} /> : produto?.nome}</h3>
                    </div>
                    <ul>
                        <li>
                            Código: <span>{isEditing ? <input type="text" name="codigo" value={editedProduct?.codigo} onChange={handleChange} /> : produto?.codigo}</span>
                        </li>
                        <li>
                            Preço de Compra: R$<span>{isEditing ? <input type="text" name="precoCompra" value={editedProduct?.precoCompra} onChange={handleChange} /> : produto?.precoCompra}</span>
                        </li>
                        <li>
                            Preço de Venda: R$<span>{isEditing ? <input type="text" name="precoVenda" value={editedProduct?.precoVenda} onChange={handleChange} /> : produto?.precoVenda}</span>
                        </li>
                        <li>
                            Quantidade em Estoque: <span>{isEditing ? <input type="text" name="quantidade" value={editedProduct?.quantidade} onChange={handleChange} /> : produto?.quantidade}</span>
                        </li>
                        <li>Vendidas essa semana: <span>75</span></li>
                        <li>Vendidas Hoje: <span>4</span></li>
                        <li>Vendidas nesse Mês: <span>5</span></li>
                    </ul>
                    <div className="button-actions">
                        <button onClick={handleEdit}>
                            <figure>
                                <img src={editar} alt="" />
                            </figure>
                            {isEditing ? "Salvar" : "Editar"}
                        </button>
                        <button onClick={handleDelete}>
                            <figure>
                                <img src={apagar} alt="" />
                            </figure>
                        </button>
                    </div>
                    <p>Ver Relatorio Completo</p>
                </div>
            </div>
        </section>
    );
}


 export default ShowProduto;