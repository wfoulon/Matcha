import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from './logo.svg'
import './styles/index.css'
import './styles/global.css'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends React.Component {
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
                log: login
            })
        }
    }

    LogOut = (e) => {
        localStorage.clear()
        this.setState({
            log: false
        })
        window.location = '/connexion'
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

  render() {
    const { classes } = this.props;
    const {anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <img src={logo} className="App-logo" alt="logo" />
            <Typography variant="title" color="inherit" className={classes.flex}>Matcha</Typography>
                <div>
                {this.state.log ? 
                 <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup="true" color="inherit" onClick={this.handleMenu}>
                  <AccountCircle />
                </IconButton>
                : '' }
                <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={ {vertical: 'top', horizontal: 'right', }} transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={open} onClose={this.handleClose}>
                  <MenuItem onClick={this.handleClose}><a href='/profil'>Profile</a></MenuItem>
                  <MenuItem onClick={this.handleClose}><a href='/account'>My account</a></MenuItem>
                  {this.state.log ? <MenuItem onClick={this.LogOut}>LogOut</MenuItem> : null}
                </Menu>
              </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
