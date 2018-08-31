import React, { Component } from 'react'
import axios from 'axios'

import like from '../../../assets/heart.svg'
import dislike from '../../../assets/cancel.svg'

import './FeedCard.css'

class FeedCard extends Component {
    constructor (props) {
      super(props)
      this.state = {
        img: null
      }
    }
  
    onLike = (e) => {
      const id = localStorage.id
      const id_match = this.props.val.id
      axios.post('/like', {id, id_match})
      .then((result) => {
      })
    }
  
    onDislike = (e) => {
      console.log('dislike')
      const id = localStorage.id
      const id_match = this.props.val.id
      axios.post('/dislike', {id, id_match})
      .then((result) => {
      })
    }

    // componentDidMount = () => {
    //   const id = this.props.val.id
    //   axios.post('/profil/image/display/profilpic', {id})
    //   .then((result) => {
    //     console.log(result)
    //     this.setState({
    //         img : result.data
    //       })
    //   })
    // }
  
    render () {
      const val = this.props.val
      return (
        <div className='Content'>
          <div className='ProfilCard'>
            {val['image'] ? <img style={{width: '200px'}} src={require('../../../../../images/users/' + val['image'])} alt='' /> : <img src={require('../../../assets/defprofil.png')} alt='' />}
            <div className='card-body'>
              <a href={'/profil/' + val['id']}><h4 className='card-title'>{val['fname']} {val['lname']}</h4></a>
              <p className='card-text text-center'>{val['gender']} {val['sexual_orientation']}</p>
              <p>{val['age']} years old</p>
              <p className=''>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className='Card-vote'>
                <img src={like} style={{width: '50px'}} alt='' onClick={this.onLike}/>
                <img src={dislike} style={{width: '50px'}} alt='' onClick={this.onDislike}/>
            </div>
          </div>
        </div>
      )
    }
  }

export default FeedCard
