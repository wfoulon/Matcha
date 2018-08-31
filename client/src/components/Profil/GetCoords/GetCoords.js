import React, { Component } from 'react'
import {geolocated} from 'react-geolocated'
import Geocode from 'react-geocode'

class GetCoords extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: ''
    }
  }

  render () {
    // console.log(address)
    if (this.props.coords) {
      Geocode.fromLatLng(this.props.coords.latitude, this.props.coords.longitude).then(
        response => {
          const address = response.results[0].formatted_address
          this.setState({
            address: address
          })
          // this.setState({
          //   address: response.results[0].formatted_address
          // })
        },
        error => {
          console.error(error)
        }
      )
      return (
        <p>{this.state.address}</p>
      )
    } else {
      return (<div />)
    }
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(GetCoords)
