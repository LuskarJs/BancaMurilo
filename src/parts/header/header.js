import "./header.css";
import { Link } from "react-router-dom";
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
                    <li>
                        <Link to="/">
                             inicio
                        </Link>         
                    </li>
                    <li>
                        <Link to="/Estoque">
                             Estoque
                        </Link>  
                    </li>
                    <li>
                        <Link to="/Relatorio">
                            Relatorio
                        </Link>
                    </li>
                    <li>Configuração</li>
                    <li>
                        <Link to="/HistoricoVendas">
                            Historico de Vendas
                        </Link>
                    </li>
                    <li>
                        <Link to="/Login">
                           Sair
                        </Link>             
                    </li>
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