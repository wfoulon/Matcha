import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'react-notifications/lib/notifications.css'
import './components/style.css'

// import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { render } from 'react-dom'
// import Inscription from './inscription'
// import Header from './header'
// import Connexion from './connexion'
// import Main from './home'
// import Account from './account'
// import Profil from './profil'
// import Forgot from './forgot_password'
// import Reset from './reset_password'
// import Test from './test/test2'
// import Validation from './validation'
// import MyProfil from './myprofil'

// const Root = () => (
//   <div id='global'>
//     <Header />
//     <Switch>
//       <Route exact path='/' component={Inscription} />
//       <Route exact path='/connexion' component={Connexion} />
//       <Route exact path='/account'component={Account} />
//       <Route exact path='/profil' component={Profil} />
//       <Route exact path='/forgot_password' component={Forgot} />
//       <Route exact path='/reset_password/:token/:uname' component={Reset} />
//       <Route exact path='/validation/:token/:uname' component={Validation} />
//       <Route exact path='/profil/:id' component={MyProfil} />
//       <Route exact path='/home' component={Main} />
//       <Route exact path='/test2' component={Test} />
//     </Switch>
//   </div>
// )

// render(
//   <BrowserRouter>
//     <Root />
//   </BrowserRouter>
//   , document.getElementById('root'))

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))
