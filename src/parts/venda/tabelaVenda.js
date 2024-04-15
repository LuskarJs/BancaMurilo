import React, {useState} from "react";
import carrinho from "../img/carrinho.png"


function TabelaCarrinho() {
    const [produtos, setProdutos] = useState([
        { id: 1, nome: 'Produto A', categoria: 'Categoria 1', horario: '09:00', quantidade: 1 },
        { id: 2, nome: 'Produto B', categoria: 'Categoria 2', horario: '10:30', quantidade: 2 },
        { id: 3, nome: 'Produto C', categoria: 'Categoria 1', horario: '12:15', quantidade: 3 },
      
    ]);

    const [totalItens, setTotalItens] = useState(produtos.reduce((total, produto) => total + produto.quantidade, 0));
    const [totalValor, setTotalValor] = useState(produtos.reduce((total, produto) => total + (produto.quantidade * produto.preco), 0));
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [valorRecebido, setValorRecebido] = useState('');
    const [troco, setTroco] = useState('');

    const handleRemoverProduto = (id) => {
        const confirmacao = window.confirm('Tem certeza que deseja remover esse item?');
        if (confirmacao) {
            setProdutos(produtos.filter(produto => produto.id !== id));
            setTotalItens(totalItens - 1);
        }
    };

    const handleQuantidadeChange = (id, newQuantidade) => {
        if (newQuantidade === 0) {
            const confirmacao = window.confirm('Deseja remover todas as unidades desse item?');
            if (confirmacao) {
                setProdutos(produtos.filter(produto => produto.id !== id));
                setTotalItens(totalItens - 1);
            }
        } else {
            setProdutos(produtos.map(produto => {
                if (produto.id === id) {
                    return { ...produto, quantidade: newQuantidade };
                }
                return produto;
            }));
        }
    };

    const handleMetodoPagamentoChange = (metodo) => {
        setMetodoPagamento(metodo);
        if (metodo === 'dinheiro') {
            setValorRecebido('');
            setTroco('');
        }
    };

    const handleValorRecebidoChange = (valor) => {
        const valorNumerico = parseFloat(valor);
        setValorRecebido(valorNumerico.toFixed(2));
        if (valorNumerico >= totalValor) {
            const trocoCalculado = (valorNumerico - totalValor).toFixed(2);
            setTroco(trocoCalculado);
        } else {
            setTroco('');
        }
    };


    return (
        <section>
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
         <div className="metodo-pagamento">
         <p>Método de Pagamento:</p>
         <label>
             Crédito
             <input type="radio" name="metodoPagamento" value="credito" onChange={() => handleMetodoPagamentoChange('credito')} />
         </label>
         <label>
             Débito
             <input type="radio" name="metodoPagamento" value="debito" onChange={() => handleMetodoPagamentoChange('debito')} />
         </label>
         <label>
             Pix
             <input type="radio" name="metodoPagamento" value="pix" onChange={() => handleMetodoPagamentoChange('pix')} />
         </label>
         <label>
             Dinheiro
             <input type="radio" name="metodoPagamento" value="dinheiro" onChange={() => handleMetodoPagamentoChange('dinheiro')} />
         </label>
         {metodoPagamento === 'dinheiro' && (
             <div className="troco">
                 <label>Valor Recebido:
                     <input type="text" value={valorRecebido} onChange={(e) => handleValorRecebidoChange(e.target.value)} />
                 </label>
                 {troco && <p>Troco: R$ {troco}</p>}
             </div>
         )}
     </div>
     </section>
    );
}

export default TabelaCarrinho;