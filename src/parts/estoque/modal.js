import React, { useState } from 'react';

function Modal({ onClose }) {
  const [produto, setProduto] = useState({
    imagem: '',
    nome: '',
    categoria: '',
    quantidade: 0,
    precoCompra: 0,
    precoRevenda: 0
  });

  const [campoVazio, setCampoVazio] = useState(false); // Estado para controlar se há campo vazio

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduto({ ...produto, imagem: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Verifica se algum campo obrigatório está vazio
    if (!produto.imagem || !produto.nome || !produto.categoria || produto.quantidade === 0 || produto.precoCompra === 0 || produto.precoRevenda === 0) {
      setCampoVazio(true);
      return;
    }
    // Aqui você pode adicionar a lógica para salvar o produto
    console.log('Produto salvo:', produto);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <label>Imagem:</label>
          <input type="file" name="imagem" onChange={handleImagemChange} />
          {produto.imagem && <img src={produto.imagem} alt="Preview da imagem" style={{ width: '180px', height: '90px', borderRadius: "5px" }} />}
        </div>
        <div>
          <label>Nome do Produto:</label>
          <input type="text" name="nome" value={produto.nome} onChange={handleChange} />
        </div>
        <div>
          <label>Categoria:</label>
          <input type="text" name="categoria" value={produto.categoria} onChange={handleChange} />
        </div>
        <div>
          <label>Quantidade:</label>
          <input type="number" name="quantidade" value={produto.quantidade} onChange={handleChange} />
        </div>
        <div>
          <label>Preço de Compra:</label>
          <input type="number" name="precoCompra" value={produto.precoCompra} onChange={handleChange} />
        </div>
        <div>
          <label>Preço de Revenda:</label>
          <input type="number" name="precoRevenda" value={produto.precoRevenda} onChange={handleChange} />
        </div>
        {campoVazio && <small>Preencha todos os campos obrigatórios</small>}
        <div className='actions-buttons'>
          <button onClick={handleSave}>Salvar Produto</button>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
