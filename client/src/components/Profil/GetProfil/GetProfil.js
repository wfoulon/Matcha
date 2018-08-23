import React, { Component } from 'react'
import axios from 'axios'
import ProfilCardM from '../../Profil/ProfilCardM/ProfilCardM'

class GetProfil extends Component {
    constructor (props) {
      super(props)
      this.state = {
        all: null
      }
    }
    componentDidMount = (e) => {
      axios.get(window.location.pathname)
      .then((result) => {
        const all = result.data
        let info = Object.keys(all).map((val, key) =>
          <ProfilCardM key={key} val={all[val]} />
        )
        this.setState({
          all: info
        })
    })
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
