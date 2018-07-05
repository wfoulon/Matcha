// importer nos dépendances, packages
import React, { Component } from 'react' /* = var react = require('react') */
import ReactDOM from 'react-dom'
import './index.css'
import logo from './logo.svg'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import FormsPage from './form.js'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Matcha</h1>
                </header>
                <div>
                    <FormsPage />
                </div>
            </div>        
        )
    }
}
//on vient l'insérer dans notre html
ReactDOM.render(<App />, document.getElementById('root'))
