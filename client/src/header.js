import React, { Component } from 'react'
import logo from './logo.svg'
import './styles/index.css'

class Header extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Matcha</h1>
                </header>
            </div>        
        )
    }
}


export default Header
