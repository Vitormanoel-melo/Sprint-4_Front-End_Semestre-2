import React from 'react';
import './App.css';

// Define uma função chamada DataFormatada que retorna um subtítulo com o valor da data formatada
function DataFormatada(props) {
  return <h2>Horário Atual: {props.date.toLocaleTimeString()}</h2>
}

// Define a classe Clock que será chamada na renderização dentro do APP, ela será nosso componente,
// essa classe herda(extends) de React.Component
class Clock extends React.Component{
  constructor(props){
    // traz mais funcionalidades para o construtor, como o THIS 
    super(props);
    // estados ficaram nesse objeto state, (propridades) que a classe vai usar
    this.state = {
      // nome da variavel :  valor inicial
      // define o estado date, pegando a data/hora atual
      date : new Date(),
    }
  }

  // Ciclo de vida que ocorre quando Clock é inserido na DOM
  // Através da função setInterval, o relógio é criado (com um timerID atrelado)
  // Chama a função thick() a cada 1000 ms (1 segundo)
  componentDidMount(){
    this.timerID = setInterval( () => {
      this.thick();
    }, 1000 );

    // Exibe no console o ID de cada relógio
    console.log("Eu sou o relógio "+this.timerID)
  }

  // Ciclo de vida que ocorre quando Clock é removido da DOM
  // Quando isso ocorre, a função clear interval limpa o relógio criado pelo setInterval 
  componentWillUnmount(){
    clearInterval(this.timerID);

    console.log("Relógio "+this.timerID+" pausado" )
  }

  // Define no state date a data atual a cada vez que é chamada
  thick(){
    this.setState({
      date : new Date() // = DateTime.Now
    })
  }

  retomar(){
    this.componentDidMount()
    console.log('Relógio retomado')
    console.log(`Agora eu sou o relógio ${this.timerID}`)
  }
  
  // Renderiza na tela o título e a função DataFormatada
  render(){
    return (
      <div>
        <h1>Relógio</h1>
        <DataFormatada date={this.state.date} />

        <button style={{color: "white", height: "25px", fontWeight: "600", backgroundColor: "red", 
        marginRight: "20px", border: "unset"}} onClick={() => this.componentWillUnmount()}>Pausar</button>

        <button style={{color: "white", height: "25px",border: "unset", 
        fontWeight: "600", backgroundColor: "green"}} onClick={() => this.retomar()}>Retomar</button>

      </div>
    )
  }

}


// Função principal invocada no index.js
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*Faz a chamada de dois relógios para mostrar a independência destes */}
        <Clock />
        <Clock />
      </header>
    </div>
  );
}

// Declara que a função App pode ser usada fora do escopo dela mesma
export default App;
