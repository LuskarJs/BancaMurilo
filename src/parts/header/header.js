import "./header.css"
import menuIcon from "../img/menu.png";
import notificationIcon from "../img/notificacao.png";
import Ract,{useState} from 'react';

function HeaderPage() {

    const [ShowMenu,isShowMenu] = useState(true)

    const AbreeFecha = () => {
        isShowMenu(!ShowMenu)
    }

    return (

        <header>
            <nav>
                <h1>Banca Do Murilo</h1>
                <ul className={` ${ShowMenu ? "hidden" : "show"}`}>
                    <li>inicio</li>
                    <li>Estoque</li>
                    <li>Relatorio</li>
                    <li>Configuração</li>
                    <li>Historico de Vendas</li>
                    <li>Sair</li>
                </ul>
                <div className="action-icons">
                    <figure>
                        <img src={notificationIcon} alt="icone de menu" />
                        <span>0</span>
                    </figure>
                    <figure onClick={AbreeFecha}>
                        <img src={menuIcon} alt="icone de menu" />
                    </figure>
                </div> 
            </nav>
        </header>

    )
}

export default HeaderPage;