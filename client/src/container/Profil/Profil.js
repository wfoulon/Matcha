import React from 'react'
import Aux from '../../hoc/Aux'
import ProfilCard from '../../components/Profil/ProfilCard/ProfilCard'
import ProfilContent from '../../components/Profil/ProfilContent/ProfilContent'

const profil = (props) => {
  return (
    <Aux>
      <ProfilCard />
      <ProfilContent />
    </Aux>
  )
}

export default profil
