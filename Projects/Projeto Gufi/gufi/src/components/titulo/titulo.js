import {Component} from 'react'

class Titulo extends Component{
    render(){
        return(
            <h2 className="conteudoPrincipal-cadastro-titulo" >{this.props.tituloSection}</h2>
        )
    }
}

export default Titulo;