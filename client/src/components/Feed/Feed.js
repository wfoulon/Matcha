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
        <div>
        <div>
          <select name='SortBy' onChange={this.onChange}>
            <option defaultValue=''>Sort By</option>
            <option value='AgeA'>Age (Ascending)</option>
            <option value='AgeD'>Age (Decreasing)</option>
            <option value='ScoreA'>Score (Ascending)</option>
            <option value='ScoreD'>Score (Decreasing)</option>
            <option value='DistanceA'>Distance (Ascending)</option>
            <option value='DistanceD'>Distance (Decreasing)</option>
          </select>
        </div>
        <div className='Feed'>
        {this.state.all}
        </div>
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
