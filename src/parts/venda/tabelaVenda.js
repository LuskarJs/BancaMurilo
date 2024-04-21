import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function TabelaCarrinho({ produtos, setProdutos, onClose, onFinalizarVenda }) {
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [valorRecebido, setValorRecebido] = useState("");
  const [troco, setTroco] = useState("");

  useEffect(() => {
    // Salvar produtos selecionados no cookie ao renderizar a página
    Cookies.set("produtosSelecionados", JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    // Carregar produtos selecionados do cookie ao renderizar a página
    const produtosSalvos = JSON.parse(Cookies.get("produtosSelecionados") || "[]");
    if (produtosSalvos) {
      setProdutos(produtosSalvos);
    }
  }, []);

  const handleRemoverProduto = (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja remover esse item?');
    if (confirmacao) {
      setProdutos(produtos.filter(produto => produto.id !== id));
    }
  };

  const handleQuantidadeChange = (id, newQuantidade) => {
    setProdutos(produtos.map(produto => {
      if (produto.id === id) {
        return { ...produto, quantidade: newQuantidade };
      }
      return produto;
    }));
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
    setValorRecebido(valorNumerico);
    const totalValor = produtos.reduce((total, produto) => total + produto.quantidade * produto.precoVenda, 0);
    if (valorNumerico >= totalValor) {
      const trocoCalculado = (valorNumerico - totalValor);
      setTroco(trocoCalculado);
    } else {
      setTroco('');
    }
  };

  const handleFinalizarVenda = () => {
    alert("Venda finalizada!");
    onFinalizarVenda();
    onClose();
  };

  const handleCancelarVenda = () => {
    // Limpar produtos selecionados e fechar a modal
    setProdutos([]);
    onClose();
  };

  return (
    <section className="sectionTabela">
      <table className="tabela-venda">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>
                <button onClick={() => handleQuantidadeChange(produto.id, produto.quantidade - 1)}>-</button>
                {produto.quantidade}
                <button onClick={() => handleQuantidadeChange(produto.id, produto.quantidade + 1)}>+</button>
              </td>
              <td>R$ {produto.precoVenda}</td>
              <td>
                <button onClick={() => handleRemoverProduto(produto.id)}>Remover</button>
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
              <input type="number" value={valorRecebido} onChange={(e) => handleValorRecebidoChange(e.target.value)} />
            </label>
            {troco !== '' && <p>Troco: R$ {troco}</p>}
          </div>
        )}
      </div>
      <button onClick={handleFinalizarVenda}>Finalizar Venda</button>
      <button onClick={handleCancelarVenda}>Cancelar Venda</button>
      <button onClick={onClose}>Voltar</button>
    </section>
  );
}

export default TabelaCarrinho;
