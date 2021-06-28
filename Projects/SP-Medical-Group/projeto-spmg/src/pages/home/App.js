import '../../assets/css/style.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

// components
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

// imagens
import info1 from '../../assets/img/first-aid-solid 1.svg'
import info2 from '../../assets/img/file-medical-alt-solid 1.svg'
import info3 from '../../assets/img/book-medical-solid 1.svg'
import mapa from '../../assets/img/mapa 1.png'
import medico_1 from '../../assets/img/medico-1.svg'

function App() {

//   const [ listaClinicas, setListaClinicas ] = useState([]);

//   function buscarClinicas(){
//     axios.get('http://localhost:5000/api/clinicas')

//     .then(resposta => {
//         if(resposta.status === 200){
//             setListaClinicas(resposta.data)
//         }
//     })
//   }
  
  return (
    <div>
      <Header />

      <main>
      <section className="banner-home">
          <div className="banner">

          </div>
          <div className="conteudo-banner">
              <div className="conteudo display-jc-sb">
                  <div className="texto-banner">
                      <p>Nós somos a maior rede de saúde do estado, e futuramente do país, temos medicina avançada, equipamentos de última geração e profissionais dedicados a salvar vidas e a aprender cada vez mais </p>
                  </div>
                  <div className="contato">
                      <p>
                          Para agendar uma consulta ligue para uma de <a href="#__clinicas" style={{color: 'white'}}>nossas clínicas</a> 
                      </p>
                  </div>
              </div>
          </div>
        </section>

        <section className="informacoes">
            <div className="conteudo display-jc-sb">
                <div className="info">
                    <img src={info1} alt="Imagem de uma maleta médica"/>
                    <p>Atendimento rápido e com eficiencia</p>
                </div>
                <div className="info">
                    <img src={info2} alt="Imagem de um arquivo médico"/>
                    <p>Com as técnologias  mais avançadas</p>
                </div>
                <div className="info">
                    <img src={info3} alt="Imagem de um livro"/>
                    <p>Os melhores especialistas do mercado</p>
                </div>
            </div>
        </section>

        <div className="clinicas-title">
            <h2>
                Conheça nossas clínicas
            </h2>
        </div>

        <section className="clinicas" id="__clinicas">
            <div className="conteudo">
                <div className="clinica-infos">
                    <div id="id-dom" className="endereco">
                        <h3>Nome da Clínica</h3>
                        <p>Rua endereco, numero 192</p>
                        <p>Telefone: (11) 7981-5480 </p>
                    </div>
                    <div className="mapa">
                        <img src={mapa} alt="Endereço da clínica no mapa" />
                    </div>
                </div>
            </div>
        </section>

        <section className="medicos">
            <div className="info-medico">
                <div className="medico display-jc-sb">
                    <img src={medico_1} alt="Imagem de um médico" />
                    <div className="frase-medico">
                        <p>O bom médico trata a enfermidade, mas o grande médico trata o paciente que está enfermo</p>
                    </div>
                </div>
                <div className="medico display-jc-sb">
                    <div className="frase-medico">
                        <p>A prática da medicina é uma arte inigualável, não é um comércio, não um negócio, mas um chamado que seu coração será exercitado igualmente com a sua mente</p>
                    </div>
                    <img src={medico_1} alt="Imagem de um médico" />
                </div>
            </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
