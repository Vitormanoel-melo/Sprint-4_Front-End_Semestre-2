import React, {Component} from 'react';
import axios from 'axios'
import {parseJwt, usuarioAutenticado} from '../../services/auth'

import '../../assets/css/login.css'
import logo from '../../assets/img/logo.png'

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            isLoading: false
        }
    }

    // Função que faz a chamada para a API para realizar o login
    efetuaLogin = (event) => {
        // Ignora o comportamento padrão no navegador (recarregar a página, por exemplo)
        event.preventDefault()

        // Remove a frase de erro do state erroMensagem e define que a requisição está em andamento
        this.setState({ erroMensagem : '', isLoading : true })

        // Define a URL e o corpo da requisição
        axios.post('http://localhost:5000/api/login', {
            email: this.state.email, 
            senha: this.state.senha
        })

        .then(resposta => {
            // Caso o Status Code seja 200
            if(resposta.status === 200){
                // salva o valor do token no localStorage
                localStorage.setItem('usuario-login', resposta.data.token)
                // exibe no console do navegador valor do token 
                // console.log('Meu token é: ' + resposta.data.token)
                // e define que a requisição terminou
                this.setState({ isLoading : false })

                // Define a variável base64 que vai receber o payload do token
                let base64 = localStorage.getItem('usuario-login').split('.')[1];
                // Exibe no console o valor presente na variável base64
                console.log(base64)
                // Exibe no console o valor decodificado de base64 para string
                console.log(window.atob(base64));
                // Exibe no console o valor convertido de string para JSON
                console.log(JSON.parse(window.atob(base64)))
                // Exibe no console apenas o valor do tipo de usuário convertido de string para JSON
                console.log(JSON.parse(window.atob(base64)).role)

                // Exibe no console todos os dados do token convertido para objeto
                console.log(parseJwt())

                // Exibe apenas a role do tipo de usuário logado
                console.log(parseJwt().role)

                // Verifica se o tipo de usuário logado é Administrador
                // Se for, redireciona para a página Tipos Eventos
                if(parseJwt().role === "1"){
                    // console.log(this.props)
                    // Exibe no console do navegador um booleano informando se o usuário está logado ou não
                    console.log(usuarioAutenticado())
                    this.props.history.push('/tiposeventos');
                }
                // Se não for, redireciona para a página home
                else {
                    this.props.history.push('/');
                }
            }
        })

        // Caso haja algum erro
        .catch(() => {
            // define o valor do state erroMensagem com a mensagem personalizada e define que a requisição terminou
            this.setState({ erroMensagem : 'E-mail ou senha inválidos! Tente novamente.', isLoading : false })
        })
    }

    // Função genérica que atualiza o state de acordo com o input
    // pode ser reutilizada em vários inputs diferents
    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name] : campo.target.value })
    }

    render(){
        return(
            <div>
                <main>
                    <section className="container-login flex">
                        <div className="img__login"><div className="img__overlay"></div></div>

                        <div className="item__login">
                            <div className="row">
                                <div className="item">
                                    <img src={logo} className="icone__login" alt="logo da Gufi" />
                                </div>
                                <div className="item" id="item__title">
                                    <p className="text__login" id="item__description">Bem vindo(a)! Faça login para acessar sua conta.</p>
                                </div>
                                {/* Faz a chamada para a função de login quando o botão é pressionado */}
                                <form onSubmit={this.efetuaLogin}>
                                    <div className="item">
                                        <input
                                            // Email
                                            type="text"
                                            name="email"
                                            // Define que o input email recebe o valor do state email
                                            value={this.state.email}
                                            // Faz a chamada para a função que atualiza o state, conforme o usuário altera o valor do input
                                            onChange={this.atualizaStateCampo}
                                            placeholder="username"
                                            className="input__login"
                                            id="login__email"
                                        />
                                    </div>
                                    <div className="item">
                                        <input
                                            // Email
                                            type="password"
                                            name="senha"
                                            // Define que o input senha recebe o valor do state email
                                            value={this.state.senha}
                                            // Faz a chamada para a função que atualiza o state, conforme o usuário altera o valor do input
                                            onChange={this.atualizaStateCampo}
                                            placeholder="senha"
                                            className="input__login"
                                            id="login__password"
                                        />
                                    </div>
                                    {/* Exibe a mensagem de erro ao tentar logar com credenciais inválidas */}
                                    <p style={{color : 'red', textAlign : 'center'}}>{this.state.erroMensagem}</p>

                                    {/* 
                                        Verifica se a requisição está em andamento, se estiver, desabilita o click do botão
                                    */}

                                    {
                                        // Caso isLoading seja true, renderiza o botão desabilitado com o texto 'Loading...'
                                        this.state.isLoading === true &&
                                        <div className="item">
                                            <button className="btn btn__login" id="btn__login" type="submit" disabled>Loading...</button>
                                        </div>
                                    }

                                    {
                                        // Caso seja false, renderiza o botão habilitado com o texto 'login'
                                        this.state.isLoading === false &&
                                        <div className="item">
                                            <button 
                                                className="btn btn__login" id="btn__login"
                                                type="submit" 
                                                disabled={ this.state.email === '' || this.state.senha === '' ? 'none' : ''}>
                                            
                                                Login
                                            </button>
                                        </div>
                                    }

                                    {/* <button type="submit">
                                        Login
                                    </button> */}
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default Login;