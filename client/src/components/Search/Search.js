import React, { Component } from 'react'
import axios from 'axios'
import FeedCard from '../Feed/FeedCard/FeedCard'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      all: null,
      // gender: [],
      // sexual: [],
      search: [
        {gender: ''},
        {age: ''},
        {sexual: ''}
      ]
    }
  }

  onSearch = () => {
    const id = localStorage.id
    const data = this.state
    axios.post('/search/fetch', {data, id})
    .then((result) => {
      const all = result.data
      // console.log(all)
      let info = Object.keys(all).map((val, key) =>
        <FeedCard key={key} val={all[val]} />
      )
      this.setState({
        all: info
      })
    })
  }

  onChange = (e) => {
    this.setState( {
      // search: {[e.target.name]:[e.target.value]},
      [e.target.name]:[e.target.value]
    }) 
  }

  // onChang = (e) => {
  //   this.setState( {
  //     search: {[e.target.name]:[e.target.value]},
  //   }) 
  // }

  render () {
    console.log(this.state)
    return (
      <div>
        <div>
          <div>
            <p>gender</p>
            <input type="checkbox" name="gender" value="Man" onChange={this.onChange}/>
            <input type="checkbox" name="gender" value="Woman" onChange={this.onChange}/>
          </div>
          <br></br>
          <div>
            <p>Sexual Orientation</p>
            <input type="checkbox" name="sexual" value='Heterosexual' onChange={this.onChange}/>
            <input type="checkbox" name="sexual" value="Homosexual" onChange={this.onChange}/>
          </div>
        </div>
        <div className='Feed'>
          {this.state.all}
        </div>
      </div>
    )
  }
}
export default Search
