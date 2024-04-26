import "./index.css";
import App from "./App";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './parts/login/login';
import PageVenda from './parts/venda/venda';
import EstoquePage from './parts/estoque/estoque';
import RelatoriosPage from "./parts/relatorios/relatorioPage";
import HistoricoDeVendas from "./parts/pedidos/pedidos";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/AreaVenda" element={<PageVenda />} />
        <Route path="/Estoque" element={<EstoquePage />} /> 
        <Route path="/Relatorio" element={<RelatoriosPage />} /> 
        <Route path="/HistoricoVendas" element={<HistoricoDeVendas />} /> 
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);