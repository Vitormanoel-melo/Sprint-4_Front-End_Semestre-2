import React from 'react'
import {Link} from 'react-router-dom'
import {fazLogout, usuarioLogado} from '../../services/authentication'

import Logo from '../../assets/img/logoSVG.svg'

import '../../assets/css/style.css'

function Header(){
    return(
        <header className="header-topo">
            <div className="conteudo display-jc-sb">
                <div className="logo-header display-jc-sb">
                    <Link to='/'><img src={Logo} alt="Logo do SP Medical Group"/></Link>
                    <Link to='/'>SP Medical Group</Link>
                </div>
                <nav className="menu-nav-header">
                    <ul className="display-jc-sb">
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/consultas/adm">Consultas</Link></li>
                        {
                            usuarioLogado() ?
                            <li><Link to="/" style={{color: 'blue'}}>Bem vindo !</Link></li> :
                            <li><Link to="/login">Login</Link></li>
                        }
                        <li><Link to="/login" onClick={() => fazLogout()}>Sair</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;