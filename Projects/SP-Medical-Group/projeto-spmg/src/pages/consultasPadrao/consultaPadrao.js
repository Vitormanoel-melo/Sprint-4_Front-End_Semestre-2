import React, {Component} from 'react'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Consulta from '../../components/consulta/consulta'

import '../../assets/css/consulta.css'

class ConsultaPadrao extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header />
                <main>
                    <div className="pesquisar-consulta">
                        <div className="item-pesquisa">
                        </div>
                        <div className="item-pesquisa">
                            <h2 >Suas Consultas</h2>
                        </div>
                        <div className="item-pesquisa">
                            {/* <p>Pesquisar por...</p>
                            <select name="" id="">
                                <option value="">Escolha...</option>
                                <input type="text" placeholder="Pesquisar" />
                            </select> */}
                        </div>
                    </div>
                    <Consulta/>

                </main>
                <Footer />
            </div>
        )
    }
}

export default ConsultaPadrao;