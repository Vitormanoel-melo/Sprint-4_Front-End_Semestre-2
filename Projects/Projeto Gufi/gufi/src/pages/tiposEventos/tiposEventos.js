import {Component} from 'react'

import logo from '../../assets/img/logo.png'

import Rodape from '../../components/rodape/rodape'

import Titulo from '../../components/titulo/titulo'

class TiposEventos extends Component{
    constructor(prop){
        super(prop);

        this.state = {
            // nomeEstado : valorInicial
            listaTiposEventos : [],
            titulo : '',
            idTipoEventoAlterado : 0,
            tituloSeccao: 'Lista Tipos de Eventos'
        }
    }

    buscarTiposEventos = () =>{
        console.log('Chamada para a API')

        // Faz a chamada para a API usando o fetch
        fetch('http://localhost:5000/api/tiposeventos', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        // Define o tipo de dado do retorno da requisição como (JSON)
        // O método .json() retorna um objeto java script
        // Em outras palavras, define o tipo de dado de retorno da requisição
        .then(resposta => resposta.json())

        // e atualiza o state listaTiposEventos com os dados obtidos
        .then(dados => this.setState({ listaTiposEventos : dados }))
        // .then(data => console.log(data))

        // Caso ocorra algum erro, mostra no console do navegador
        .catch(erro => console.log(erro))
    }

    // Atualiza o state titulo com o valor do input
    atualizaEstadoTitulo = async (event) => {
        //             NomeEstado :     ValorInput
        await this.setState({ titulo : event.target.value });
        console.log(this.state.titulo)
    }
    
    // Função responsável por cadastrar um tipo de evento
    cadastrarTipoEvento = (event) => {
        // Ignora o comportamento padrão do navegador
        event.preventDefault();

        // Caso algum Tipo de Evento seja selecionado para a edição,
        if(this.state.idTipoEventoAlterado !== 0){

            // faz a chamada para a API usando o fetch e passando o id do tipo evento que será atualizado na URL da requisição
            fetch('http://localhost:5000/api/tiposeventos/' + this.state.idTipoEventoAlterado, {
                // Define o método da requisição ( PUT )
                method: 'PUT',

                // Define o corpo da requisição especificando o tipo JSON
                body: JSON.stringify({ tituloTipoEvento : this.state.titulo }),

                // Define o cabeçalho da requisição
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            .then(resposta => {
                // Caso a requisição retorne um status code 204,
                if(resposta.status === 204) {  
                    console.log(
                        // Exibe no console do navegador a mensagem 'Tipo de Evento x atualizado!' onde x é o ID do Tipo de Evento que foi atualizado
                        'Tipo de Evento ' + this.state.idTipoEventoAlterado + ' atualizado!',
                        // e informa qual é o seu novo título
                        'Seu novo título agora é: ' + this.state.titulo
                    )
                }
            })

            // Caso ocorra algum erro, exibe este erro no console do navegador
            .catch(erro => console.log(erro))
            
            // Então atualizaa lista Tipos de Eventos sem o usuárío precisar executar outra ação    
            .then(this.buscarTiposEventos)

            // Faz a chamada para a função limpar campos
            .then(this.limparCampos)
        }
        else
        {

        // Cadastro

        // Faz a chamada para a API usando fetch
        fetch('http://localhost:5000/api/tiposeventos', {
            // Define o método da requisição (POST)
            method : 'POST',

            // Define o corpo da requisição especificando o tipo (JSON)
            // Em outras palavras, converte o state para uma string JSON
            body : JSON.stringify( { tituloTipoEvento : this.state.titulo }),

            // Define o cabeçalho da requisição
            headers : {
                "Content-Type" : "application/json"
            }
        })
        
        // Exibe no console do navegador a mensagem "Tipo de Evento cadastrado"
        .then(console.log('Tipo de Evento cadastrado'))

        // Caso ocorra algum erro, exibe este erro no console do navegador
        .catch(erro => console.log(erro))
        
        .then(this.buscarTiposEventos)

        // Faz a chamada para a função limpar campos
        .then(this.limparCampos)
        }
    }

    // chama a função buscarTiposEventos assim que o componente é renderizado
    componentDidMount(){
        this.buscarTiposEventos();
    }

    // Recebe um tipo de evento da lista
    buscarTipoEventoPorId = (tipoEvento) => {
        this.setState({
            // Atualiza o state idTipoEventoAlterado com o valor do ID do Tipo de Evento recebido
            idTipoEventoAlterado : tipoEvento.idTipoEvento,
            // e o state titulo com o valor do titulo do Tipo de Evento recebido
            titulo : tipoEvento.tituloTipoEvento
        }, () => {
            console.log(
                // Exibe no console do navegador o valor do ID do Tipo de Evento recebido
                'O Tipo de Evento ' + tipoEvento.idTipoEvento + ' foi selecionado',
                // e o valor do state idTipoEventoAlterado
                'agora o valor do state idTipoEventoAlteradio é: ' + this.state.idTipoEventoAlterado,
                // e o valor do state titulo
                'e o valor do state titulo é: ' + this.state.titulo
            )  
        })
    }

    // Função responsável por excluir um tipo de evento
    // Sintaxe de campos de classe
    excluirTipoEvento = (tipoEvento) => {
        // Exibe no console o id do tipo de evento recebido
        console.log('Tipo de Evento '+ tipoEvento.idTipoEvento + ' foi selecionado!')

        // Faz a chamada para a API utilizando o fetch passando o id do Tipo de Evento recebido na URL da requisição
        fetch('http://localhost:5000/api/tiposeventos/' + tipoEvento.idTipoEvento, {
            // Define o método da requisição ( DELETE )
            method : 'DELETE'
        })

        // Caso a requisição retorne um status code 204,
        .then(resposta => {
            if(resposta.status === 204){
                // Exibe no console do navegador a mensagem 'Tipo de Evento x excluído' oned x é o ID do Tipo de Evento excluído
                console.log('Tipo de Evento' + tipoEvento.idTipoEvento + ' excluído!')
            }
        })

        // Caso ocorra algum erro, exibe este erro no console do navegador
        .catch(erro => console.log(erro))

        // Atualiza a lista de Tipos de Evento
        .then(this.buscarTiposEventos)
    }

    // Reseta os states titulo e idTipoEventoAlterado
    limparCampos = () => {
        this.setState({titulo: '', idTipoEventoAlterado : 0 })

        // Exibe no console do navegador a mensagem 'Os states foram resetados!'
        console.log('Os states foram resetados!')
    }

    render(){
        return(
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                    <img src={logo} alt="Logo da Gufi" />

                    <nav className="cabecalhoPrincipal-nav">
                        Administrador
                    </nav>
                    </div>
                </header>
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro"> {/* Section de listagem de tipos eventos*/}
                        {/* Lista de tipos de eventos */}
                        <Titulo tituloSection={this.state.tituloSeccao}/>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead> {/* Cabeçalho */}
                                    <tr> {/* Colunas do cabeçalho */}
                                        <th>#</th> {/* Cabeçalho */}
                                        <th>Título</th> {/* Títulos */}
                                        <th>Ações</th> {/* Ações */}
                                    </tr>
                                </thead>
                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.listaTiposEventos.map( (tipoEvento) =>{
                                            return (
                                                <tr key={tipoEvento.idTipoEvento}>
                                                    <td>{tipoEvento.idTipoEvento}</td>
                                                    <td>{tipoEvento.tituloTipoEvento}</td>

                                                    {/* Faz a chamada da função buscarTipoEventoPorId passando o tipo de 
                                                    evento selecionado */}
                                                    <td><button onClick={() => this.buscarTipoEventoPorId(tipoEvento)} >Editar
                                                    </button>

                                                    <button className onClick={() => this.excluirTipoEvento(tipoEvento)} >Exluir
                                                    </button></td>
                                                </tr>
                                            )
                                        } )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="container" id="conteudoPrincipal-cadastro">
                        {/* Cadastro de tipo de evento */}
                        <Titulo tituloSection="Cadastro de Tipo de Evento"/>

                        {/* Formulário de cadastro de Tipo de Evento */}
                        <form onSubmit={this.cadastrarTipoEvento}>
                            <div className="container">
                                <input 
                                    id="nome-tipo-evento"
                                    type="text"
                                    value={this.state.titulo}
                                    onChange={this.atualizaEstadoTitulo}
                                    placeholder="Título do Tipo de Evento"
                                />
                                {/* <button type="submit" >Cadastrar</button> */}
                                

                                {/* Estrutura do if ternário */}
                                {/* condição ? faço algo, caso seja verdadeiro : faço algo, caso seja falso */}
                                
                                {/* {
                                    this.state.idTipoEventoAlterado === 0 ? 
                                    <button type="submit" >Cadastrar</button> : 
                                    <button type="submit" >Atualizar</button>
                                } */}

                                {/* Outra forma, com o IF ternário e o disabled ao mesmo tempo */}
                                {
                                    <button 
                                            className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                            type="submit" disabled={this.state.titulo === '' ? 'none' : '' } >
                                        {
                                            this.state.idTipoEventoAlterado === 0 ? 'Cadastrar' : 'Atualizar'
                                        }
                                    </button>
                                }

                                <button
                                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                    type="button" onClick={this.limparCampos}>
                                    Cancelar
                                </button>

                            </div>
                        </form>
                        
                        {/* Caso algum Tipo de Evento tenha sido selecionado para edição, exibe a mensagem de feedback para o usuário */}

                        {
                            this.state.idTipoEventoAlterado !== 0 &&
                            <div>
                                <p>O tipo de evento {this.state.idTipoEventoAlterado} está sendo editado</p>
                                <p>Clique em Cancelar caso queira cancelar a operação antes de cadastrar um novo tipo de evento.</p>
                            </div>
                        }
                        
                    </section>
                </main>
                <Rodape/>
            </div>
        )
    }
}

export default TiposEventos;