import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { users } from '../data/data';
import "./login.css";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === users.user && password === users.senha) {
            Cookies.set('loggedIn', 'true');
            Cookies.set('userProfile', username); // Modificado para receber apenas o username
            window.location.href = '/';
        } else {
            setError('Usuário ou senha incorretos.');
        }
    };

    return (
        <section className="login">
            <form onSubmit={handleLogin}>
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
