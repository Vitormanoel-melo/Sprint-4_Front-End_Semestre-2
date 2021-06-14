import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import {parseJwt} from '../../services/authentication'

import '../../assets/css/consulta.css'
import axios from 'axios'

export default class Consulta extends Component{
    constructor(props){
        super(props)

        this.state = {
            listaConsultas : [],
            listaPacientes : [],
            listaMedicos : [],
            listaSituacoes : [],
            idMedico : 0,
            idPaciente : 0,
            idSituacao : 0,
            dataConsulta : new Date,
            horaConsulta : new Date,
            isLoading : false,
            errorMessage : '',

            errorMessageData : ''
        }
    }

    // busca todas os pacientes
    buscarPacientes = () => {
        axios('http://localhost:5000/api/pacientes', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                this.setState({ listaPacientes : resposta.data })
            }
        })

        .catch(erro => console.log(erro))
    }

    // busca todas os medicos
    buscarMedicos = () => {
        axios('http://localhost:5000/api/medicos', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                this.setState({ listaMedicos : resposta.data })
            }
        })

        .catch(erro => console.log(erro))
    }

    // busca todas as consultas
    buscarConsultas = () => {

        // Define a url da requisição
        let url = 'http://localhost:5000/api/consultas'

        // Se a role do usuário for diferente de administrador muda o endereço da url
        if(parseJwt().role !== '1'){
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
                this.setState({ listaConsultas : resposta.data })
            }
        })

        // Se der algum erro
        .catch(erro => {
            // escreve no console do navegador este erro.
            console.log(erro)
        })
    }

    buscarSituacoes = () => {
        axios('http://localhost:5000/api/situacoes', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                this.setState({ listaSituacoes : resposta.data })
            }
        })

        .catch(erro => console.log(erro))
    }

    limparCampos = () => {
        this.setState({
            idMedico : 0,
            idPaciente : 0,
            dataConsulta : new Date(),
            horaConsulta : ''
        })
    }

    cadastrarConsulta = (event) => {

        event.preventDefault()

        var consulta = {
            idMedico : this.state.idMedico,
            idPaciente : this.state.idPaciente,
            dataConsulta : new Date( this.state.dataConsulta ),
            horaConsulta : this.state.horaConsulta
        }

        this.setState({ isLoading : true, errorMessage : '' })

        axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        .then(resposta => {
            if(resposta.status === 201){
                this.setState({ isLoading : false });
            }
        })
        
        .catch( erro => {
            console.log("Este é o erro: " + erro)
            this.setState({ isLoading : false, errorMessage : 'Informações Inválidas!' })
        })

        .then(this.buscarConsultas)
        .then(this.limparCampos)
    }

    atualizaEstado = async (event) => {
        await this.setState({ [event.target.name] : event.target.value }, () => {
            console.log(this.state.idSituacao)
        })

        if(this.state.dataConsulta < this.formatarData(new Date())){
            this.setState({ errorMessageData : 'Digite uma data válida' });
        }else{
            this.setState({ errorMessageData : '' });
        }
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

    deletarConsulta = (idConsulta) => {
        axios.delete('http://localhost:5000/api/consultas/' + idConsulta, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        .then(resposta => {
            if(resposta.status === 204){
                console.log('Consulta excluída com sucesso')
            }
        })

        .catch(erro => console.log(erro))

        .then(this.buscarConsultas)
    }

    mudarSituacaoConsulta = (event) => {
        // console.log(event.target.value)
        // console.log(event.target.id)
        axios.patch('http://localhost:5000/api/consultas/atualizar/situacao/' + event.target.id, {
            idSituacao : event.target.value
        },{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                console.log('Situação da consulta atualizada com sucesso!')
            }
        })

        .catch(erro => console.log(erro))

        .then(this.buscarConsultas)
    }

    componentDidMount(){
        this.buscarMedicos()
        this.buscarPacientes()
        this.buscarConsultas()
        this.buscarSituacoes()
    }

    render() {
        return(
            <div>

                <Header />
                <main>
                    <section className="cadastro-consulta">
                        <div className="conteudo-cadastro">
                            <div className="area-delimitada-cad">
                                <h2>Cadastrar Consulta</h2>
                                <form onSubmit={this.cadastrarConsulta} className="campos-cad-consulta">
                                    <div className="campo-consulta">
                                        <div className="cad-consulta">
                                            <div className="item-cad-consulta">
                                                <p>Medico</p>
                                                {
                                                    <select 
                                                        name="idMedico" 
                                                        value={this.state.idMedico}
                                                        onChange={this.atualizaEstado}> 
                                                        <option value="0">Selecione um médico...</option>
                                                        {
                                                            this.state.listaMedicos.map((medico) =>{
                                                                return(
                                                                    <option key={medico.idMedico} value={medico.idMedico}>
                                                                        {medico.nome}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                }
                                            </div>
                                            <div className="item-cad-consulta">
                                                <p>Paciente</p>
                                                {
                                                    <select 
                                                        name="idPaciente" 
                                                        onChange={this.atualizaEstado} 
                                                        value={this.state.idPaciente}
                                                        required>
                                                        <option value="0" >Selecione...</option>
                                                        {
                                                            this.state.listaPacientes.map((paciente) =>{
                                                                return(
                                                                    <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                                                        {paciente.nome}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>    
                                                }
                                            </div>
                                        </div>
                                        <div className="cad-consulta">
                                            <div className="item-cad-consulta">
                                                {/* <button onClick={() => manipulaDom()}>DOM</button> */}
                                                <p id="id-dom" >Data da Consulta</p>
                                                <input
                                                    type="date"
                                                    name="dataConsulta"
                                                    value={this.state.dataConsulta}
                                                    onChange={this.atualizaEstado}
                                                    required
                                                />
                                                <p style={{fontSize: '14px', color: 'red'}}>{this.state.errorMessageData}</p>
                                            </div>
                                            <div className="item-cad-consulta">
                                                <p>Hora da Consulta</p>
                                                <input
                                                    type="time"
                                                    name="horaConsulta"
                                                    value={this.state.horaConsulta}
                                                    onChange={this.atualizaEstado}
                                                    required
                                                />    
                                            </div>   
                                        </div>
                                    </div>
                                    <div className="btn-cad-consulta">
                                        <button type="submit">Cadastrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>

                    <div className="pesquisar-consulta">
                        <div className="item-pesquisa">
                        </div>
                        <div className="item-pesquisa">
                            <h2>Consultas</h2>
                        </div>
                        <div className="item-pesquisa">
                            {/* <p>Pesquisar por...</p>
                            <select name="" id="">
                                <option value="">Escolha...</option>
                            </select>
                            <input type="text" placeholder="Pesquisar" /> */}
                        </div>
                    </div>

                    <section className="section-consulta">
                        {
                            this.state.listaConsultas.map( (consulta) => {
                                return(
                                    <form key={consulta.idConsulta} id='form_listagem' className="consulta" >
                                        <div className="conteudo-consulta">
                                            <div className="dados-consulta">
                                                <div className="medico-consulta">
                                                    <p>Médico</p>
                                                    <input className="item"
                                                        name="nomeMedico"
                                                        type="text"
                                                        placeholder="Nome"
                                                        value={consulta.idMedicoNavigation.nome}
                                                        onChange={this.atualizaEstado}
                                                    />
                                                    <p>CRM</p>
                                                    <input className="item"
                                                        type="text"
                                                        placeholder="CRM"
                                                        value={consulta.idMedicoNavigation.crm}
                                                    />
                                                    <p>Especialidade</p>
                                                    <input className="item"
                                                        type="text"
                                                        placeholder="Especialidade"
                                                        value={consulta.idMedicoNavigation.idEspecialidadeNavigation.descricao}
                                                    />
                                                    
                                                </div>
                                                <div className="data-consulta">
                                                    <p>Data Consulta</p>
                                                    <input 
                                                        type="date"
                                                        value={this.formatarData(new Date(consulta.dataConsulta))}
                                                        className="item"/>
                                                </div>
                                            </div>
                                            <div className="dados-consulta">
                                                <div key={consulta.idConsulta}  className="medico-consulta">
                                                    <p>Paciente</p>
                                                    <input className="item"
                                                        type="text"
                                                        placeholder="Nome"
                                                        value={consulta.idPacienteNavigation.nome}
                                                    />
                                                    <p>CPF</p>
                                                    <input className="item"
                                                        type="text"
                                                        placeholder="CPF"
                                                        value={consulta.idPacienteNavigation.cpf}
                                                    />
                                                    <p>Data de Nascimento</p>
                                                    <input className="item"
                                                        type="date"
                                                        placeholder="Data de Nascimento"
                                                        value={this.formatarData(consulta.idPacienteNavigation.dataNascimento)}
                                                    />
                                                </div>
                                                <div className="data-consulta">
                                                        <p>Hora da Consulta</p>
                                                        <input 
                                                            value={consulta.horaConsulta} 
                                                            type="time" 
                                                            className="item"/>
                                                </div>
                                            </div>
                                            <div key={consulta.idConsulta} className="dados-consulta">
                                                <div key={consulta.idConsulta}  className="situacao-consulta">
                                                    <p>Situação</p>
                                                    <select
                                                    className="item" 
                                                    value={this.state.idSituacao}
                                                    name="idSituacao"
                                                    id={consulta.idConsulta}
                                                    onChange={this.mudarSituacaoConsulta}
                                                    
                                                    // onChange={() => this.atualizaEstado}
                                                    style={
                                                        consulta.idSituacaoNavigation.descricao === 'cancelada' ?
                                                        {border: 'solid 2px red', textTransform: 'uppercase'} : 
                                                        consulta.idSituacaoNavigation.descricao === 'Agendada' ?
                                                        {border: 'solid 2px orange', textTransform: 'uppercase'} :
                                                        {border: 'solid 2px green', textTransform: 'uppercase'} 
                                                    }>
                                                        <option value="0">{consulta.idSituacaoNavigation.descricao}</option>
                                                        {
                                                            this.state.listaSituacoes.map( (situacao) => {
                                                                return(
                                                                    <option key={situacao.idSituacao} value={situacao.idSituacao}>
                                                                        {situacao.descricao}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>

                                                    <div className="item"></div>
                                                    <div className="item"></div>
                                                </div>
                                                <div className="descricao-consulta">
                                                    <div className="descricao_conteudo">
                                                        <p>Descrição</p>
                                                        <textarea className="desc__consulta" name="" id="" cols="30" rows="10">{consulta.descricao}</textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div key={consulta.idConsulta}  className="options-botoes">
                                            <div className="btn-alterar"></div>
                                            <div className="btn-alterar">
                                                {/* {
                                                    parseJwt().role === '1' ?
                                                    <button type="submit">Alterar Consulta</button> :
                                                    <button type="submit" style={{display: 'none'}}>Alterar Consulta</button>
                                                } */}
                                            </div>
                                            <div key={consulta.idConsulta}  className="btn-excluir_consulta">
                                                {
                                                    parseJwt().role === '1' &&
                                                    <Link onClick={() => this.deletarConsulta(consulta.idConsulta)}><i className="far fa-trash-alt"></i></Link>
                                                }
                                            </div>
                                            {/* <div className="btn-excluir_consulta">
                                                {
                                                    <div className="area-botao">
                                                        <div className="deletar_consulta">
                                                            <div id='delete_con'>
                                                                <p>Deseja excluir essa consulta?</p>
                                                                <div>
                                                                    <button value="sim" >SIM</button>
                                                                    <button value="nao" >NÃO</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a onClick={() => displayExcluir()}><i className="far fa-trash-alt"></i></a>
                                                    </div>
                                                }
                                            </div> */}
                                        </div>
                                    </form>
                                )
                            })
                        }
                    </section>
                    
                </main>
                <Footer />
            </div>
        )
    }
}