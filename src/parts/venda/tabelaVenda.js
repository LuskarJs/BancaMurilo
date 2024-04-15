import React, {useState, useEffect} from "react";
import carrinho from "../img/carrinho.png"


function TabelaCarrinho({ produtos, setProdutos }) {

    const [totalItens, setTotalItens] = useState(0);
    const [totalValor, setTotalValor] = useState(0);

    useEffect(() => {
        if (Array.isArray(produtos)) {
            const newTotalItens = produtos.reduce((total, produto) => total + produto.quantidade, 0);
            const newTotalValor = produtos.reduce((total, produto) => total + produto.quantidade * produto.preco, 0);
            setTotalItens(newTotalItens);
            setTotalValor(newTotalValor);
        }
    }, [produtos]);

    
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [valorRecebido, setValorRecebido] = useState("");
    const [troco, setTroco] = useState("");

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
            {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.categoria}</td>
                            <td>{produto.horario}</td>
                            <td>
                                <button onClick={() => handleQuantidadeChange(produto.id, produto.quantidade - 1)}>
                                    -
                                </button>
                                {produto.quantidade}
                                <button onClick={() => handleQuantidadeChange(produto.id, produto.quantidade + 1)}>
                                    +
                                </button>
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