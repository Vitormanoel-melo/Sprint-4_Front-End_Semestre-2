import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import {parseJwt} from '../../services/authentication'

class Consulta extends Component{
    constructor(props){
        super(props)

        this.state = {
            listaConsultas : [],
            idConsultaAlterada : 0,
            descricao : '',
            mensagemSucesso : 'Consulta',
            idMensagemSucesso : ''
        }
    }

    // busca todas as consultas
    buscarConsultas = () => {

        // Define a url da requisição
        let url = 'http://localhost:5000/api/consultas'

        // Se a role do usuário for diferente de administrador muda o endereço da url
        if(parseJwt().role !== 'administrador'){
            url = 'http://localhost:5000/api/consultas/minhas'
        }

        // Faz a requisição passando a url e o token do usuário
        axios(url, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        // Promise retornada pela requisição
        .then(resposta => {
            // Se o status da resposta for 200 - Ok
            if(resposta.status === 200){
                // Armazena os dados da resposta no state listaConsultas
                this.setState({ listaConsultas : resposta.data})
            }
        })

        // Se der algum erro
        .catch(erro => {
            // escreve no console do navegador este erro.
        })
    }

    // Função que atualiza os estados
    atualizaEstado = async (event) => {
        // Pega o name de onde foi executado a função e adiciona o valor
        await this.setState({ [event.target.name] : event.target.value })
    }

    // Função que limpa o campo mensagemSucesso
    limparCampos = () => {
        this.setState({ idConsultaAlterada : 0, descricao : '' })
    }
    
    // Função que retorna a data formatada para ser mostrada na consulta
    formatarData = (data) => {
        // Armazena o ano da data
        let ano = new Date(data).getUTCFullYear()
        // Armazena o mês da data
        let mes = new Date(data).getMonth() + 1
        // Armazena o dia da data
        let dia = new Date(data).getUTCDate()

        // Se o mês da data for menor que 10
        if(parseInt(mes) < 10 ){
            // adiciona um 0 na frente do mês
            mes = `0${mes}`
        }

        // Se o dia da data for menor que 10
        if(parseInt(dia) < 10 ){
            // adiciona um zero na frente do dia
            dia = `0${dia}`
        }

        // Junta o ano, mês e data em uma string
        let dataFormatada = `${ano}-${mes}-${dia}`

        // Retorna a data formatada
        return dataFormatada
    }

    // Função que atualiza a descrição de uma consulta
    alterarDescricao = (event) => {
        // Ignora o comportamento padrão do navegador(carregar a página) ao submeter um formulário
        event.preventDefault();

        // Define o state mensagemSucesso como vazio
        this.setState({mensagemSucesso : ''})
        
        // Faz a requisição passando na url o id da consulta que está sendo alterada e no corpo é passado 
        // a nova descrição da consulta, no headers é colocado o token do usuário
        axios.patch('http://localhost:5000/api/consultas/descricao/' + this.state.idConsultaAlterada, {
            descricao : this.state.descricao
        }, {
            headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')}
        })

        // Promise retornada pela requisição
        .then(resposta => {
            // Se o status da resposta for 204 - No content
            if(resposta.status === 204){
                // define a mensagem 'Descrição atualizada com sucesso' no state mensagemSucesso
                this.setState({ mensagemSucesso : 'Descrição atualizada com sucesso', idMensagemSucesso : this.state.idConsultaAlterada })
            }
        })

        // se der algum erro, define a mensagem 'Algo deu errado' n state mensagemSucesso
        .catch(erro => {
            this.setState({mensagemSucesso : 'Algo deu errado '})
        })

        // Busca as consultas
        .then(this.buscarConsultas)

        .then(this.limparCampos)
    }

    // Função que atualiza e gerencia a mensagem de sucesso quando uma descrição é alterada
    atualizarMensagem = (id) => {
        // Enquato o state idConsultaAlterada for igual ao id que está sendo recebido, retorna 'sim'
        while(this.state.idMensagemSucesso == id){
            return 'sim'
        }
    }

    componentDidMount(){
        this.buscarConsultas()
    }

    render(){
        return(
            <div>
                <main>
                <section className="section-consulta">
                        {
                            this.state.listaConsultas.map( (consulta) => {
                                return(
                                    <form key={consulta.idConsulta} onSubmit={this.alterarDescricao} className="consulta" >
                                        <div className="conteudo-consulta">
                                            <div className="dados-consulta">
                                                <div key={consulta.idConsulta} className="medico-consulta">
                                                    <p>Médico</p>
                                                    <input className="item"
                                                        readOnly
                                                        type="text"
                                                        disabled
                                                        placeholder="Nome"
                                                        value={consulta.nomeMedico}
                                                    />

                                                    {
                                                        parseJwt().role === '2' &&
                                                        <div>
                                                            <p>CRM</p>
                                                            <input className="item"
                                                            disabled
                                                            readOnly
                                                            type="text"
                                                            placeholder="CRM"
                                                            value={consulta.crm}
                                                            /> 
                                                        </div>
                                                    }

                                                    <p>Especialidade</p>
                                                    <input className="item"
                                                        readOnly
                                                        disabled
                                                        type="text"
                                                        placeholder="Especialidade"
                                                        value={consulta.especialidade}
                                                    />
                                                </div>
                                                <div className="data-consulta">
                                                    <p>Data Consulta</p>
                                                    <input 
                                                        readOnly
                                                        disabled
                                                        type="date"
                                                        value={this.formatarData(new Date(consulta.dataConsulta))}
                                                        className="item"/>
                                                </div>
                                            </div>
                                            <div className="dados-consulta">
                                                <div className="medico-consulta">
                                                    <p>Paciente</p>
                                                    <input className="item"
                                                        readOnly
                                                        type="text"
                                                        disabled
                                                        placeholder="Nome"
                                                        value={consulta.nomePaciente}
                                                    />
                                                    
                                                    {
                                                        parseJwt().role === '3' &&
                                                        <div>
                                                            <p>CPF</p>
                                                        <input className="item"
                                                        type="text"
                                                        disabled
                                                        readOnly
                                                        placeholder="CPF"
                                                        value={consulta.cpf}
                                                        />
                                                        </div>
                                                    }

                                                    <p>Data de Nascimento</p>
                                                    <input className="item"
                                                        readOnly
                                                        disabled
                                                        type="date"
                                                        placeholder="Data de Nascimento"
                                                        value={this.formatarData(consulta.dataNascimento)}
                                                    />
                                                </div>
                                                <div className="data-consulta">
                                                        <p>Hora da Consulta</p>
                                                        <input 
                                                            readOnly
                                                            disabled
                                                            value={consulta.horaConsulta} 
                                                            type="time" 
                                                            className="item"/>
                                                </div>
                                            </div>
                                            <div className="dados-consulta">
                                                <div className="situacao-consulta">
                                                    <p>Situação</p>
                                                    <input 
                                                        className="item"
                                                        readOnly
                                                        disabled
                                                        value={consulta.situacao}
                                                        placeholder="Situação"
                                                        style={
                                                            consulta.situacao === 'cancelada' ?
                                                            {color: 'red', borderBottom: 'solid 2px red'} : 
                                                            consulta.situacao === 'Agendada' ?
                                                            {color: 'orange', borderBottom: 'solid 2px orange'} :
                                                            {color: 'green', borderBottom: 'solid 2px green'} 
                                                        } />

                                                    <div className="item"></div>
                                                    <div className="item"></div>
                                                </div>
                                                <div className="descricao-consulta">
                                                    <div className="descricao_conteudo">
                                                        <p>Descrição</p>
                                                        <textarea onChange={this.atualizaEstado} 
                                                            className="desc__consulta" name="descricao" 
                                                            cols="30" 
                                                            rows="10"
                                                            // Tirar dúvida aqui!!!!!
                                                            disabled={this.state.idConsultaAlterada == consulta.idConsulta ? '' : 'none'}>
                                                            {consulta.descricao}
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="options-botoes">
                                            <div className="btn-alterar"></div>
                                            <div className="btn-alterar">
                                                {
                                                    parseJwt().role === '2' && this.state.idConsultaAlterada != consulta.idConsulta &&
                                                    <button
                                                            name="idConsultaAlterada" value={consulta.idConsulta} 
                                                            type='button'
                                                            onClick={this.atualizaEstado}>
                                                        Alterar Descrição
                                                    </button>
                                                }

                                                {
                                                    parseJwt().role === '2' && this.state.idConsultaAlterada == consulta.idConsulta &&
                                                    <button disabled={this.state.descricao !== '' ? '' : 'none'}
                                                    style={this.state.descricao !== '' ? {cursor: 'pointer'} : {cursor: 'no-drop'}}
                                                    type='submit'>Salvar Alteração</button>
                                                }

                                                {
                                                    parseJwt().role === '2' && this.state.idConsultaAlterada == consulta.idConsulta &&
                                                    <button onClick={() => this.setState({ idConsultaAlterada : 0, mensagemSucesso : '' })}>Cancelar</button>
                                                }

                                                
                                            </div>
                                            
                                            <div style={{textAlign: 'center'}} className="btn-alterar">
                                                {
                                                    this.atualizarMensagem(consulta.idConsulta) === 'sim' &&
                                                    <p style={{color: 'green'}}>{this.state.mensagemSucesso}</p>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                )
                            })
                        }
                    </section>
                </main>
            </div>
        )
    }

}

export default Consulta;