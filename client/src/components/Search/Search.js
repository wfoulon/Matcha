import React from 'react'
import { Checkbox, CheckboxGroup } from "react-checkbox-group"
import InputRange from 'react-input-range'

import axios from 'axios'
import FeedCard from '../Feed/FeedCard/FeedCard'
import './Search.css'
import 'react-input-range/lib/css/index.css'
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      gender: [],
      sexual: [],
      age: [],
      value: {min: 18, max: 35}
    }
  }
 
  ageChanged = (age) => {
    this.setState({
      age: age
    });
  }

  genderChanged = (gender) => {
    this.setState({
      gender: gender
    });
  }

  sexualChanged = (sexual) => {
    this.setState({
      sexual: sexual
    })
  }

  onSearch = () => {
    const id = localStorage.id
    const data = this.state
    console.log(data)
    axios.post('/search/fetch', {data, id})
    .then((result) => {
      this.setState({
        info: result.data
      })
    })
  }

  
  
  render() {
    let {info} = this.state
    let all = null
    if (info) {
      all = Object.keys(info).map((val, key) =>
        <FeedCard key={key} val={info[val]} />
      )
    }
    return (
      <div>
        <div className='content'>
          <CheckboxGroup
          checkboxDepth={2}
          name="gender"
          value={this.state.gender}
          onChange={this.genderChanged}>
            <label><Checkbox value='Man'/> Man</label>
            <label><Checkbox value='Woman'/> Woman</label>
          </CheckboxGroup>
          <CheckboxGroup
          checkboxDepth={2}
          name="sexual"
          value={this.state.sexual}
          onChange={this.sexualChanged}>
            <label><Checkbox value='Heterosexual'/> Heterosexual</label>
            <label><Checkbox value='Homosexual'/> Homosexual</label>
            <label><Checkbox value='Bisexual'/> Bisexual</label>
          </CheckboxGroup>
          <div className='form'>
          <InputRange
              draggableTrack
              maxValue={99}
              minValue={18}
              onChange={value => this.setState({ value: value })}
              onChangeComplete={value => console.log(value)}
              value={this.state.value} />
          </div>
          <div>
            <input type='button' value='search' onClick={this.onSearch}/>
          </div>
        </div>
      <div className='Feed'>
        {all ? all : ''}
      </div>
      </div>
    )
  }
 
}

export default Search
