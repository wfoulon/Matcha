import React, { Component} from 'react'
import axios from 'axios'
import './test.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      all:  this.props.val
    }
  }

  onLike = (e) => {
    console.log('LIKE')
    // uid = localStorage.id
    // console.log(this.props.val.id)
    // console.log(this.props.val)
    const id = localStorage.id
    const id_match = this.props.val.id
    axios.post('/like', {id, id_match})
    .then((result) => {
    })
  }

  render () {
    const val = this.state.all
    return (
        <div className='card mb-4 test2'>
          <div className='view overlay'>
            <img className='card-img-top' src='https://mdbootstrap.com/img/Photos/Others/images/49.jpg' alt='' />
          </div>
          <div className='card-body'>
            <a href={'/profil/' + val['id']}><h4 className='card-title'>{val['fname']} {val['lname']}</h4></a>
            <p className='card-text'>{val['gender']}</p>
            <p className='card-text'>{val['sex']}</p>
            <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>  
          </div>
          <div>
            <div>
              <button onClick={this.onLike}>like</button>
            </div>
            <div>
              <button>dislike</button>
            </div>
          </div>
        </div>
    )
  }
}

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      all: null
    }
  }
  componentDidMount = (e) => {
    const id = localStorage.id
    axios.post('/test', { id })
    .then((result) => {
      const all = result.data
      let info = Object.keys(all).map((val, key) =>
        <Home key={key} val={all[val]} />
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

export default Main
