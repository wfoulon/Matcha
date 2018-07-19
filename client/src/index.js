import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { render } from 'react-dom'
import Inscription from './inscription'
import Header from './header'
import Connexion from './connexion'
import Test from './test'
import Account from './account'
import Profil from './profil'
import Example from './test2'

const Root = () => (
    <div id='global'>
        <Header />
        <Switch>
            <Route exact path='/' component={Inscription} />
            <Route exact path='/connexion' component={Connexion} />
            <Route exact path='/account'component={Account} />
            <Route exact path='/profil' component={Profil} />
            <Route exact path='/test' component={Test} /> 
            <Route exact path='/test2' component={Example} /> 
        </Switch>
    </div>
)

render(
        <BrowserRouter>
            <Root />
        </BrowserRouter>
  , document.getElementById('root'))
