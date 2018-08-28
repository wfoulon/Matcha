import React, { Component} from 'react'
import axios from 'axios'

import FeedCard from './FeedCard/FeedCard'
import './Feed.css'

class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      all: null
    }
  }
  
  componentDidMount = (e) => {
    const id = localStorage.id
    axios.post('/feed/display', { id })
    .then((result) => {
      const all = result.data
      console.log(all)
      let info = Object.keys(all).map((val, key) =>
        <FeedCard key={key} val={all[val]} />
      )
      this.setState({
        all: info
      })
  })
  }

  render () {
    if (this.state.all !== null) {
      return (
        <div className='Feed'>
        {this.state.all}
        </div>
      )
    } else {
        return (
          <div />
      )
    }
  }
}

export default Feed
