import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import '../../assets/css/login.css'

import Logo from '../../assets/img/logoSVG.svg'
import LogoBranco from '../../assets/img/logo-branco.svg'

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email : '',
            senha : '',
            errorMessage: '',
            isLoading: false
        }
    }

    // Função que efetuará o login do usuário
    efetuarLogin = (event) => {
        // ignora o comportamento padrão do navegador ao submeter um formulário
        event.preventDefault()

        // define o state errorMessage como vazio e o state isLoading como true
        this.setState({errorMessage : '', isLoading : true})

        // faz a requisição de login passando email e senha no corpo da requisição
        axios.post('http://localhost:5000/api/login', {
            email: this.state.email,
            senha: this.state.senha
        })

        // Promisse retornada pela requisição
        .then(resposta => {
            // Se o status code da resposta for 200 - Ok
            if(resposta.status === 200){
                // armazenamos o token retornado no armazenamento local
                localStorage.setItem('login-user-acess', resposta.data.token);
                // define o state isLoading como fase
                this.setState({isLoading : false})
                // Chama a função para limpar os campos de login
                this.limparCampos()
                // empurra o usuário para a página home
                this.props.history.push('/');
            }
        })

        // Se ocorrer algum erro
        .catch(() =>{
            // Define o valor "E-mail ou senha inválidos!" para o state errorMessage
            this.setState({errorMessage : 'E-mail ou senha inválidos!'})
            // Define o state isLoading como false
            this.setState({isLoading : false})
        })

    }


    // função que limpa os states email e senha
    limparCampos = () => {
        this.setState({ email: '', senha: '' })
    }

    // Função que atualiza os states email e senha
    atualizaEstado = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        return(
            <main>
                <section className="login">
                    <div className="imagem-login"></div>
                    
                    <div className="campos-login">
                        <div className="content-login">
                            <div className="logo">
                                <Link to='/'>
                                    <picture>
                                        {/* <source media="(max-width: 47.93em)" srcset="img/Banner576.jpg" /> */}
                                        <source media="(max-width: 991px)" srcSet={LogoBranco} />
                                        <source media="(max-width: 1920px)" srcSet={Logo} />
                                        <img src={Logo} alt="Logo do SP Medical Group" />
                                    </picture>
                                </Link>
                                <p>Seja Bem vindo!</p>
                                <p>Faça login para acessar sua conta</p>
                            </div>
            
                            <form onSubmit={this.efetuarLogin} className="campos">
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.atualizaEstado}
                                />

                                <input 
                                    type="password"
                                    placeholder="Senha"
                                    name="senha"
                                    value={this.state.senha}
                                    onChange={this.atualizaEstado}
                                />

                                {
                                    this.state.isLoading === true &&
                                    <button disabled={'none'} type="submit">Loading...</button>
                                }

                                {
                                    this.state.isLoading === false &&
                                    <button disabled=
                                        {
                                            this.state.email === '' || this.state.senha === '' ? 'none' : '' 
                                        } 
                                            type="submit">
                                            LOGIN
                                    </button>
                                }

                            </form>

                            <div className="mensagem-erro_login">
                                <p>{this.state.errorMessage}</p>                                
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Login;