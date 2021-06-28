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
            idConsulta: 0,
            idMedico : 0,
            idPaciente : 0,
            idSituacao : 0,
            dataConsulta : new Date,
            horaConsulta : new Date,
            isLoading : false,
            
            errorMessage : '',
            errorMessageData : '',
            errorMessageIdPaciente: '',
            errorMessageIdMedico: '',
            successMessage : ''
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

        .catch(erro => erro)
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

        .catch(erro => erro)
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
         
        })
    }

    // Busca todas as situações
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

        .catch(erro => erro)
    }

    // Limpa o valor dos states 'idMedico, idPaciente, dataConsulta, horaConsulta'
    limparCampos = () => {
        this.setState({
            idConsulta : 0,
            idMedico : 0,
            idPaciente : 0,
            dataConsulta : new Date(),
            horaConsulta : '',
            errorMessageIdMedico : '',
            errorMessageIdPaciente : '',
        })
    }

    // Cadastra uma consulta
    cadastrarConsulta = () => {

        // Cria um objeto consulta e armazena os valores de alguns states
        var consulta = {
            idMedico : this.state.idMedico,
            idPaciente : this.state.idPaciente,
            dataConsulta : new Date( this.state.dataConsulta ),
            horaConsulta : this.state.horaConsulta
        }

        // Faz a requisição
        axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        // Promise retornada
        .then(resposta => {
            // Se o status code da resposta for 201 - Created, significa que a requisição teve sucesso
            if(resposta.status === 201){
                // Muda o isLoading para false
                this.setState({ isLoading : false, successMessage : 'Consulta cadastrada com sucesso!' });
            }
        })
        
        // Se der algum erro, trata esse erro
        .catch( erro => {
            // e muda o isLoading para false e a mensagem de erro para 'Informações Inválidas'
            // console.log("Este é o erro: " + erro)
            this.setState({ isLoading : false, errorMessage : 'Algo saiu errado! Verifique os campos e tente novamente!' })
        })

        // Busca as consultas
        .then(this.buscarConsultas)
        // Limpa os campos
        .then(this.limparCampos)
    }


    // Função pela qual vai ser validado o cadastro
    validarCadastro = (event) => {
        // Ignora o comportamento padrão do navegador
        event.preventDefault()

        // Define os states isLoading como true e errorMessage, errorMessageIdPaciente,
        // errorMessageIdMedico, errorMessageData como vazio
        this.setState
        ({
            isLoading : true,
            errorMessage : '', 
            errorMessageIdPaciente : '', 
            errorMessageIdMedico : '', 
            errorMessageData: '',
            successMessage : ''
        })

        // Verifica se o idPaciente e o idMedico são respectivamente igual à 0
        this.state.idPaciente == 0 && this.state.idMedico == 0 ?
        // se for, atualiza os seguintes states com as seguintes informações
        this.setState({
            isLoading : false, 
            errorMessageIdMedico : 'Escolha um médico',
            errorMessageIdPaciente : 'Escolha um Paciente'}) :
        
        // se a condição anterior não for atendida
        // verifica se o idMedico é igual a 0
        this.state.idMedico == 0 ?
        // se for, atualiza os seguintes states
        this.setState({isLoading : false, errorMessageIdMedico : 'Escolha um médico'}) :

        // se a condição anterior não for verdadeira
        // verifica se o idPaciente é igual a 0
        this.state.idPaciente == 0 ?
         // se for, atualiza os seguintes states
        this.setState({isLoading : false, errorMessageIdPaciente : 'Escolha um Paciente '}) :

        // se a condição anterior não for atendida, executa a seguinte função
        this.cadastrarConsulta()
    }

    // Função que atualiza os estados
    atualizaEstado = async (event) => {
        // Pega o name de onde foi executado a função e adiciona o valor
        await this.setState({ [event.target.name] : event.target.value })

        // Se data consulta for menor que a dataAtual
        if(this.state.dataConsulta < this.formatarData(new Date())){
            // Adiciona uma mensagem ao state errorMessageData
            this.setState({ errorMessageData : 'Digite uma data válida' });
        }else{
            // Se não, o state errorMessageData ficará vazio
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

    buscarConsultaDelete = (idConsultaDeletar) => {
        this.setState({ idConsulta : idConsultaDeletar })
    }

    // Função que deleta uma consulta recebendo o id da consulta como parâmetro
    deletarConsulta = (idConsulta) => {
        // Faz a requisição mandando o id da consulta pela URL e mandando o token pelo headers
        axios.delete('http://localhost:5000/api/consultas/' + idConsulta, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        // Promise retornada
        .then(resposta => {
            // Se o status da resposta for 204 - No Content
            if(resposta.status === 204){
                // ....
            }
        })

        // Se ocorrer algum erro escreve esse erro no console do navegador
        .catch(erro => erro)
        // Atualiza a lista de consultas
        .then(this.buscarConsultas)
    }

    // Função que muda a situação de uma consulta
    mudarSituacaoConsulta = (event) => {
        // Faz a requisição passando pela requisição o id de onde ocorreu o evento, passa o id da situação
        // pelo corpo da requisição e manda o token do usuário pelo header
        axios.patch('http://localhost:5000/api/consultas/atualizar/situacao/' + event.target.id, {
            idSituacao : event.target.value
        },{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('login-user-acess')
            }
        })

        // Promise retornada pela requisição
        .then(resposta => {
            // Se o status da resposta for 200 - Ok
            if(resposta.status === 200){
                // Escreve uma mensagem no console do navegador
                // console.log('Situação da consulta atualizada com sucesso!')
            }
        })

        // Se ocorre algum erro, escreve esse erro no console do navegador
        .catch(erro => erro)

        .then(this.buscarConsultas)
    }

    // Executa o que estiver dentro a partir do momento em que o componente é renderizado
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
                                <form onSubmit={this.validarCadastro} className="campos-cad-consulta">
                                    <div className="campo-consulta">
                                        <div className="cad-consulta">
                                            <div className="item-cad-consulta">
                                                <p>Medico</p>
                                                {
                                                    <select 
                                                        name="idMedico" 
                                                        value={this.state.idMedico}
                                                        onChange={this.atualizaEstado}
                                                        required> 
                                                        <option value={0}>Selecione um médico...</option>
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
                                                <p style={{color: 'red', fontSize: '15px'}}>{this.state.errorMessageIdMedico}</p>
                                            </div>
                                            <div className="item-cad-consulta">
                                                <p>Paciente</p>
                                                {
                                                    <select 
                                                        name="idPaciente" 
                                                        onChange={this.atualizaEstado} 
                                                        value={this.state.idPaciente}
                                                        required>
                                                        <option value={0} >Selecione um paciente...</option>
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
                                                <p style={{color: 'red', fontSize: '15px'}}>{this.state.errorMessageIdPaciente}</p>
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
                                        {
                                            this.state.isLoading ?
                                            <button type="submit" disabled >Loading...</button> :
                                            <div className="area-cad">
                                                <p style={this.state.successMessage !== '' ?
                                                {color: 'green', fontSize: '15px'} : {color: 'red', fontSize: '15px'} }
                                                >{this.state.errorMessage}{this.state.successMessage}</p>
                                                <button type="submit">
                                                    Cadastrar
                                                </button>
                                            </div>
                                        }
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
                                                        readOnly
                                                        name="nomeMedico"
                                                        type="text"
                                                        placeholder="Nome"
                                                        value={consulta.idMedicoNavigation.nome}
                                                        onChange={this.atualizaEstado}
                                                        disabled
                                                    />
                                                    <p>CRM</p>
                                                    <input className="item"
                                                        readOnly
                                                        type="text"
                                                        placeholder="CRM"
                                                        value={consulta.idMedicoNavigation.crm}
                                                        disabled
                                                    />
                                                    <p>Especialidade</p>
                                                    <input className="item"
                                                        readOnly
                                                        type="text"
                                                        placeholder="Especialidade"
                                                        value={consulta.idMedicoNavigation.idEspecialidadeNavigation.descricao}
                                                        disabled
                                                    />
                                                    
                                                </div>
                                                <div className="data-consulta">
                                                    <p>Data Consulta</p>
                                                    <input 
                                                        readOnly
                                                        type="date"
                                                        value={this.formatarData(new Date(consulta.dataConsulta))}
                                                        disabled
                                                        className="item"/>
                                                </div>
                                            </div>
                                            <div className="dados-consulta">
                                                <div key={consulta.idConsulta}  className="medico-consulta">
                                                    <p>Paciente</p>
                                                    <input className="item"
                                                        type="text"
                                                        readOnly
                                                        disabled
                                                        placeholder="Nome"
                                                        value={consulta.idPacienteNavigation.nome}
                                                    />
                                                    <p>CPF</p>
                                                    <input className="item"
                                                        type="text"
                                                        readOnly
                                                        disabled
                                                        placeholder="CPF"
                                                        value={consulta.idPacienteNavigation.cpf}
                                                    />
                                                    <p>Data de Nascimento</p>
                                                    <input className="item"
                                                        type="date"
                                                        readOnly
                                                        disabled
                                                        placeholder="Data de Nascimento"
                                                        value={this.formatarData(consulta.idPacienteNavigation.dataNascimento)}
                                                    />
                                                </div>
                                                <div className="data-consulta">
                                                        <p>Hora da Consulta</p>
                                                        <input 
                                                            value={consulta.horaConsulta} 
                                                            type="time"
                                                            disabled
                                                            readOnly
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
                                                        <textarea disabled className="desc__consulta" name="" id="" cols="30" rows="10">{consulta.descricao}</textarea>
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
                                                    this.state.idConsulta === consulta.idConsulta &&
                                                    <div className="confirm-exluir">
                                                        <p>Deseja excluir essa consulta?</p>
                                                        <div style={{display: 'flex'}}>
                                                            <div className="btn-confirmar"> 
                                                                <Link onClick={() => this.deletarConsulta(consulta.idConsulta)}>Sim</Link>
                                                            
                                                                <Link onClick={() => this.buscarConsultaDelete(0)}>Não</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    parseJwt().role === '1' &&
                                                    <div className="icone-excluir">
                                                        <Link onClick={() => this.buscarConsultaDelete(consulta.idConsulta)} ><i className="far fa-trash-alt"></i></Link>       
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                )
                            }).reverse()
                        }
                    </section>
                    
                </main>
                <Footer />
            </div>
        )
    }
}