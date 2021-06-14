import {Component} from 'react'

import './repositorio.css'

class Repositorio extends Component{
    constructor(props){
        super(props);

        this.state = {
            listaRepositorios : [],
            username: '',
        }
    };

    listarRepositorios = (event) =>{
        event.preventDefault();

        fetch(`https://api.github.com/users/${this.state.username}/repos`)

        .then(resposta => resposta.json())

        .then(dados => this.setState({ listaRepositorios : dados}))

        .catch(erro => console.log(erro))
    }

    atualizarEstado = (event) => {
        this.setState({username : event.target.value}, () => {
            console.log(this.state.username)
        })
    }

    componentDidMount(){

    }

    render(){
        return (
            <div>
                <main>
                    {/* <section> Sessão de listagem dos repositórios
                        <h2>Lista de Repositórios</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Id Repositório</th>
                                    <th>Nome</th>
                                    <th>Descricão</th>
                                    <th>Data de Criação</th>
                                    <th>Tamanho</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.listaRepositorios.map( (repositorio) =>{
                                        return(
                                            <tr>
                                                <td>{repositorio.id}</td>
                                                <td>{repositorio.name}</td>
                                                <td>{repositorio.description}</td>
                                                <td>{repositorio.created_at}</td>
                                                <td>{repositorio.size / 1000} mb</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </section> */}

                    <section className="pesquisar-usuario">
                        <div className="content centralizar">
                            <h2>Buscar Repositório</h2>
                            <form onSubmit={this.listarRepositorios} className="centralizar">
                                <div>
                                    <input
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.atualizarEstado}
                                        placeholder="Username"
                                    />

                                    <button type="submit" onClick={this.limparCampos} disabled={this.state.username == '' && 'none'}>
                                    Buscar</button>
                                </div>
                            </form>
                        </div>
                    </section>

                    <section className="listagem">
                        <div className="content">
                            <h2>Listagem de Repositórios do usuário: {this.state.username}</h2>
                            {
                                this.state.listaRepositorios.map( (repositorio) => {
                                    return(
                                      <div className="repositorio" key={repositorio.id}>
                                          <div className="dados">
                                            <p><strong>Id:</strong> {repositorio.id}</p>
                                          </div>
                                          <div className="dados">
                                            <p><strong>Nome:</strong> {repositorio.name}</p>
                                          </div>
                                          <div className="dados">
                                            <p><strong>Descrição:</strong> {repositorio.description}</p>
                                          </div>
                                          <div className="dados">
                                            <p><strong>Data de Criação:</strong> {repositorio.created_at}</p>
                                          </div>
                                          <div className="dados">
                                            <p><strong>Tamanho:</strong> {repositorio.size / 1000} mb</p>
                                          </div>
                                      </div>  
                                    )
                                }).reverse()
                            }
                        </div>
                    </section>

                </main>
            </div>
        )
    }
}

export default Repositorio;