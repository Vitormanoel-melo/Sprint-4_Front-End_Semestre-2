import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom' 

import './index.css';

import App from './pages/home/App';
import reportWebVitals from './reportWebVitals';
import Repositorio from './pages/repositorios/repositorio'

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Repositorio} />
        <Route path="/repositorios" component={Repositorio} />
        <Redirect to="/repositorios" component={Repositorio}/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
