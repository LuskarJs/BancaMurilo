import React, {useState} from "react";
import carrinho from "../img/carrinho.png"


function TabelaCarrinho() {
    const [produtos, setProdutos] = useState([
        { id: 1, nome: 'Produto A', categoria: 'Categoria 1', horario: '09:00', quantidade: 1 },
        { id: 2, nome: 'Produto B', categoria: 'Categoria 2', horario: '10:30', quantidade: 2 },
        { id: 3, nome: 'Produto C', categoria: 'Categoria 1', horario: '12:15', quantidade: 3 },
      
    ]);

    const handleRemoverProduto = (id) => {
        setProdutos(produtos.filter(produto => produto.id !== id));
    };

    const handleQuantidadeChange = (id, newQuantidade) => {
        setProdutos(produtos.map(produto => {
            if (produto.id === id) {
                return { ...produto, quantidade: newQuantidade };
            }
            return produto;
        }));
    };

    return (
        <table className="tabela-venda">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Adicionado</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map(produto => (
                    <tr key={produto.id}>
                        <td>{produto.nome}</td>
                        <td>{produto.categoria}</td>
                        <td>{produto.horario}</td>
                        <td>
                            <button onClick={() => handleQuantidadeChange(produto.id, produto.quantidade - 1)}>-</button>
                            {produto.quantidade}
                            <button onClick={() => handleQuantidadeChange(produto.id, produto.quantidade + 1)}>+</button>
                        </td>
                        <td>
                            <button onClick={() => handleRemoverProduto(produto.id)}>
                                <figure>
                                    <img src={carrinho} alt="icone de carrinho" />
                                </figure>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TabelaCarrinho;