import React from 'react'
import { Route } from 'react-router-dom'

import Aux from '../../hoc/Aux'
import Toolbar from '../Toolbar/Toolbar'
import Profil from '../Profil/Profil'
import Connexion from '../Connexion/Connexion'
import Feed from '../Feed/Feed'
import GetProfil from '../Profil/GetProfil/GetProfil'
import Account from '../../account'
import Search from '../Search/Search'

const layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <main>
        <Route path='/connexion' component={Connexion} />
        <Route exact path='/profil' component={Profil} />
        <Route path='/feed' component={Feed} />
        <Route exact path='/profil/:id' component={GetProfil} />
        <Route exact path='/account' component={Account} />
        {/* <Route exact path='/search' component={Search} /> */}
      </main>
    </Aux>
  )
}

export default layout
