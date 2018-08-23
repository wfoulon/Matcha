import React, { Component } from 'react'

import Logo from '../../assets/logo.svg'
import Notif from '../../assets/notification.svg'
import Search from '../../assets/search.svg'

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
  }
  
  componentDidMount() {
    let login = localStorage.getItem('login')
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
        <img className='Toolbar-logo' src={Logo} alt='' />
        {this.state.log ?
        <div>
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
