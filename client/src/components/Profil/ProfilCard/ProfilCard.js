import React from 'react'
import axios from 'axios'

import GetCoords from '../GetCoords/GetCoords'
import './ProfilCard.css'

class profilCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      img: null
    }
  }

  handlePic = (e) => {
    let take = document.getElementById('takePic')
    take.click()
  }

  openFile = (e) => {
    // e.stopPropagation()
    // e.nativeEvent.stopImmediatePropagation()
    // e.preventDefault()
    let input = e.target
    let reader = new FileReader()
    reader.onload = (e) => {
      let output = document.getElementById('new')
      let dataURL = reader.result
      output.src = dataURL
      const id = localStorage.id
      dataURL = output.src
      // console.log(dataURL)
      axios.post('/profil/image/profilpic', {dataURL, id})
      .then((result) => {
        console.log(result.data)
        // // this.setState({
        // //   img : result.data
        // // })
      })
    }
    reader.readAsDataURL(input.files[0])
  }

  // componentDidMount () {
  //   axios.get('/profil/image/profilpic')
  //   .then((result) => {
  //     console.log(result)
  //   })
  // }

  render () {
    console.log(this.state.img)
    return (
      <div className='Content'>
        <div className='ProfilCard'>
          {this.state.img}
          <img src='' alt='' id='new' style={{display: 'none'}}/>
          <input id='takePic' type='file' style={{width: '50px', display: 'none'}} onChange={this.openFile} />
          <button onClick={this.handlePic}><i className="fas fa-camera"></i></button>
          <div className='card-body'>
            <h4 className=''>{localStorage.fname} {localStorage.lname}</h4>
            <p className=''>{localStorage.gender} {localStorage.sex}</p>
            <p>{localStorage.age} years old</p>
            <p className=''>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <div> <GetCoords /> </div>
          </div>
        </div>
      </div>
    )
  }
}

export default profilCard
