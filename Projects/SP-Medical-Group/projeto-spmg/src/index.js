import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import {usuarioLogado, parseJwt} from './services/authentication'

import './index.css';

import App from './pages/home/App';
import Login from './pages/login/login'
import ConsultaAdm from './pages/consultasAdm/consultasAdm'
import ConsultaPadrao from './pages/consultasPadrao/consultaPadrao'
import reportWebVitals from './reportWebVitals';

// const PermissaoAdm = ({ component : Component }) => (
//   <Route
//     render={props => 
//       usuarioLogado() && parseJwt().role === 'administrador' ?
//       <Component {...props} /> :
//       <Redirect to='/login' />
//     }
//   />
// )

const PermissaoAdm = ({ component : Component }) => (
  <Route
    render={props => 
      usuarioLogado() && parseJwt().role === '1' ?
      <Component {...props} /> :
      <Redirect to='/consultas/padrao' />
    }
  />
)

const PermissaoComum = ({ component : Component }) => (
  <Route
    render={props =>
      usuarioLogado() && parseJwt().role !== '1' ?
      <Component {...props} /> :
      <Redirect to='/login' />
    }
  />
)

const routing = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={Login}/>
      <PermissaoAdm path="/consultas/adm" component={ConsultaAdm}/>
      <PermissaoComum path="/consultas/padrao" component={ConsultaPadrao}/>
      <Redirect to="/" component={App}/>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
