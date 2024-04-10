import "./login.css"

function LoginPage() {

    return (
        <section className="login">
            <form>
                <div className="title-login">
                    <h2>Faça Login Aqui</h2>
                </div>
                <div className='content-form'>
                    <div className='input-label'>
                        <label>Login</label>
                        <input type="text" placeholder="Digite Seu Login" />
                        <small>Digite um login valido</small>
                    </div>
                    <div className='input-label'>
                        <label>Senha</label>
                        <input type="password" placeholder="Digite Sua senha" />
                        <small>Digite um senha valida</small>
                    </div>
                    <div className="button-action">
                        <button>Fazer Login</button>
                    </div>
                </div>
                <div className='forget'>
                    <span></span>
                    <p>Esqueci Senha</p>
                    <span></span>
                </div>
            </form>
        </section>
    )
}

export default LoginPage;