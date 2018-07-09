import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { render } from 'react-dom'
import Inscription from './inscription'
import Header from './header'
import Connexion from './connexion'
/* import Test from './test' */

const Root = () => (
    <div>
        <Header />
    <Switch>
        <Route exact path='/' component={Inscription} />
        <Route exact path='/connexion' component={Connexion} />
{/*         <Route exact path='/test' component={Test} />  */}
    </Switch>
    </div>
)

render(
    <div>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </div>
  , document.getElementById('root'))
