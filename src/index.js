import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './parts/login/login';
import PageVenda from './parts/venda/venda';
import App from "./App";
import "./index.css"
import EstoquePage from './parts/estoque/estoque';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/AreaVenda" element={<PageVenda />} />
        <Route path="/Estoque" element={<EstoquePage />} /> 
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);