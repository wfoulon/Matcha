import React, { Component } from 'react'
import axios from 'axios'
import ProfilCardM from '../../Profil/ProfilCardM/ProfilCardM'

class GetProfil extends Component {
  constructor (props) {
    super(props)
    this.state = {
      all: null
    }
    this.socket = this.props.socket
  }
  
  componentWillMount = (e) => {
    if (!localStorage.id) {
      this.props.history.push('/')
    } else {
      axios.get(window.location.pathname)
      .then((result) => {
        if (result.data !== false) {
        const all = result.data
        let info = Object.keys(all).map((val, key) =>
          <ProfilCardM key={key} val={all[val]} />
        )
        this.setState({
          all: info
        })
        let visited = all[0].id
        let visitor = localStorage.id
        this.socket.emit('visit', {visitor, visited})
        } else {
          window.location = '/profil'
        }
      })    
    }
  }

  
  render () {
    if (this.state.all !== null) {
      return (
        <div className='Content'>
          {this.state.all}
        </div>
      )
    }
    else {
      return (
        <div />
      )
    }
  }
}
export default GetProfil
