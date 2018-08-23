import React from 'react'

import GetCoords from '../GetCoords/GetCoords'
import Watson from '../../../assets/watson.jpg'
import './ProfilCard.css'

const profilCard = () => {
  return (
    <div className='Content'>
      <div className='ProfilCard'>
        <img src={Watson} alt='' />
        <div className='card-body'>
          <h4 className=''>{localStorage.fname} {localStorage.lname}</h4>
          <p className=''>{localStorage.gender} {localStorage.sex}</p>
          <p>{localStorage.age} years old</p>
          <p className=''>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <div> <GetCoords /> </div>
        </div>
      </div>
    </div>
  )
}

export default profilCard
