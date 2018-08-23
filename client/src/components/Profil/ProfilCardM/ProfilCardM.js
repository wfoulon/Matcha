import React, { Component } from 'react'
import axios from 'axios'
import Watson from '../../../assets/watson.jpg'
import dislike from '../../../assets/cancel.svg'

class ProfilCardM extends Component {
  constructor (props) {
    super(props)
    this.state = {
      infPro: this.props.val
    }
  }

  OnDelete = (e) => {
    const id = localStorage.id
    const id_match = this.props.val.id
    axios.post('/profil/match/dislike', {id, id_match})
    .then((result) => {
    })
  }

  render () {
    const val = this.state.infPro
    return (
      <div className='Content'>
        <div className='ProfilCard'>
          <img src={Watson} alt='' />
          <div className='card-body'>
            <a href={'/profil/' + val['id']}><h4 className='card-title'>{val['fname']} {val['lname']}</h4></a>
            <p className='card-text text-center'>{val['gender']} {val['sexual_orientation']}</p>
            <p>{val['age']} years old</p>
            <p className=''>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div className='Card-vote'>
            <img src={dislike} style={{width: '50px'}} alt='' onClick={this.OnDelete} />
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilCardM
