import React, { Component } from 'react'
import axios from 'axios'

class Display extends Component {
  constructor (props) {
    super(props)
    this.state = {
      all: this.props.val
    }
  }
  render () {
    const val = this.state.all
    return (
      <div className='card mb-4 test2'>
        <div className='view overlay'>
          <img className='card-img-top' src='https://mdbootstrap.com/img/Photos/Others/images/49.jpg' alt=''/>
        </div>
        <div className='card-body'>
          <a href={'/profil/' + val['id']}><h4 className='card-title'>{val['fname']} {val['lname']}</h4></a>
          <p className='card-text'>{val['gender']}</p>
          <p className='card-text'>{val['sex']}</p>
          <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    )
  }
}

class MyProfil extends Component {
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
        <Display key={key} val={all[val]} />
      )
      this.setState({
        all: info
      })
  })
  }

  render () {
    if (this.state.all !== null) {
      return (
        <div className='test'>
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
export default MyProfil
