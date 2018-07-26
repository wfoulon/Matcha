import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'
import Inscription from './inscription'
import Header from './header'
import Connexion from './connexion'
// import Test from './test/test'
import Account from './account'
import Profil from './profil'
import Forgot from './forgot_password'
import Reset from './reset_password'
// import render from './test/test2'
import Validation from './validation'
const Root = () => (
  <div id='global'>
    <Header />
    <Switch>
      <Route exact path='/' component={Inscription} />
      <Route  exact path='/connexion' component={Connexion} />
      <Route exact path='/account'component={Account} />
      <Route exact path='/profil' component={Profil} />
      <Route exact path='/forgot_password' component={Forgot} />
      <Route exact path='/reset_password/:token/:uname' component={Reset} />
      <Route exact path='/validation/:token/:uname' component={Validation} />
      {/* <Route exact path='/test' component={Test} />
      <Route exact path='/test2' component={Example} /> */}
    </Switch>
  </div>
)

render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
  , document.getElementById('root'))
