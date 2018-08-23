import React from 'react'
import Aux from '../../hoc/Aux'
import ProfilCard from './ProfilCard/ProfilCard'
import ProfilContent from './ProfilContent/ProfilContent'

const profil = (props) => {
  return (
    <Aux>
      <ProfilCard />
      <ProfilContent />
    </Aux>
  )
}

export default profil
