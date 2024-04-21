import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { users } from '../data/data';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <section className="login">
      <form >
        <div className="title-login">
          <h2>Faça Login Aqui</h2>
        </div>
        <div className='content-form'>
          <div className='input-label'>
            <label>Login</label>
            <input
              type="text"
              placeholder="Digite Seu Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small>Digite um login válido</small>
          </div>
          <div className='input-label'>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small>Digite uma senha válida</small>
          </div>
          {error && <div>{error}</div>}
          <div className="button-action">
            <button type="submit">Fazer Login</button>
          </div>
        </div>
        <div className='forget'>
          <span></span>
          <p>Esqueci Senha</p>
          <span></span>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
