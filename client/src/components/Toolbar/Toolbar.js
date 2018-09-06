import React, { Component } from 'react'

import Logo from '../../assets/logo.svg'
import Notif from '../../assets/notification.svg'
import Search from '../../assets/search.svg'
import Chat from '../../assets/love.svg'
import Trending from '../../assets/fire.svg'

import './Toolbar.css'

import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      log: false
    }
    this.socket = this.props.socket
  }
  
  componentDidMount() {
    let login = localStorage.getItem('login')
/*     let visited = "test"
    this.socket.emit('visit', {visitor: login, visited})
    // this.socket.on('test', (data) => {
    //   console.log(data)
    // })
    this.socket.on('notifVisit/' + login, data => {
      console.log(data)
    }) */
    if (login) {
      this.setState({
        log: true
      })
    }
  }

  LogOut = () => {
    localStorage.clear()
    this.setState({
      log: false
    })
    window.location = '/connexion'
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    
    const {anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div className='Toolbar'>
        {this.state.log ?
        <div>
          <a href='/feed'><img className='Toolbar-items' src={Trending} alt=''/></a>
          <a href='/chat'><img className='Toolbar-items' src={Chat} alt=''/></a>
          <img className='Toolbar-items' src={Notif} alt='' />
          <a href='/search'><img className='Toolbar-items' src={Search} alt='' /></a>
          <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup='true' color='inherit' onClick={this.handleMenu}>
            <AccountCircle />
          </IconButton>
        </div>
         : '' }
        <Menu id='menu-appbar' anchorEl={anchorEl} anchorOrigin={ {vertical: 'top', horizontal: 'right', }} transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={open} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}><a href='/profil' style={{color: 'black'}}>Profil</a></MenuItem>
          <MenuItem onClick={this.handleClose}><a href='/account' style={{color: 'black'}}>Settings</a></MenuItem>
          <MenuItem onClick={this.LogOut}>LogOut</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default Toolbar
