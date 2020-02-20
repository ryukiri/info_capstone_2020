import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
import './index.css';
import Home from './pages/home/Home'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Overview from './pages/overview/Overview'
import * as serviceWorker from './serviceWorker';

const routing = (
    <HashRouter basename ="/">
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/overview" component={Overview} />
      </div>
    </HashRouter>
);

// ReactDOM.render(<Home />, document.getElementById('root'));
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
