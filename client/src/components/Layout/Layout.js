import React from 'react'
import { Route } from 'react-router-dom'

import Aux from '../../hoc/Aux'
import Toolbar from '../Toolbar/Toolbar'
import Profil from '../../container/Profil/Profil'
import Connexion from '../Connexion/Connexion'
import Feed from '../Feed/Feed'
import GetProfil from '../Profil/GetProfil/GetProfil'
import Account from '../Account/Account'
import Inscription from '../Inscription/Inscription'
import Search from '../Search/Search'
import Chat from '../Chat/Chat'
import io from 'socket.io-client'

const socket = io('localhost:3000')
const layout = (props) => {
  return (
    <Aux>
      <Toolbar socket={socket} />
      <main>
        <Route path='/inscription' component={Inscription}/* component={props => <Inscription socket={socket} /> } */ />
        <Route path='/connexion' component={Connexion} />
        <Route path='/search' component={Search} />
        <Route exact path='/profil' component={Profil} />
        <Route path='/feed' component={Feed} />
        <Route exact path='/profil/:id' component={GetProfil} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/chat' component={props => <Chat socket={socket} /> } />
      </main>
    </Aux>
  )
}

export default layout
