import React from 'react'
import {Link} from 'react-router-dom'

import Logo from '../../assets/img/logoSVG.svg'

function Footer(){
    return(
        <div>
            <footer className="footer">
                <div className="conteudo display-jc-sb">
                    <div className="info-footer">
                        <a href="#__clinicas">Contate-nos</a>
                        <a href="#__clinicas">Trabalhe conosco</a>
                        <Link to='/login'>Conecte-se</Link>
                    </div>
                    <div className="logo-footer">
                        <Link to="/"><img src={Logo} alt="Logo do SP Medical Group" /></Link>
                    </div>
                    <div className="info-footer-direitos">
                        <p>Todos os direitos reservados</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;