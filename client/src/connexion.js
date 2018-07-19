import React, { Component } from 'react'
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact'
import axios from 'axios'
import './styles/form.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import FormValidator from './FormValidator.js'

class Connexion extends Component {
    constructor (props) {
        super(props)
        this.validator = new FormValidator([
            {
                field: 'login',
                method: 'isEmpty',
                validWhen: false,
                message: 'Username is required.'
            },
            {
                field: 'login',
                method: 'matches',
                args: [/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/],
                validWhen: true,
                message: 'Username not register yet'
            },
            {
                field: 'pwd',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required.'
            },
            {
                field: 'pwd',
                method: 'matches',
                args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/],
                validWhen: true,
                message: 'Wrong password'
            },
        ])

        this.state = {
            login: '',
            pwd: '',
            validation: this.validator.valid(),
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.submitted = false
    }

    onChange = (e) => {
        this.setState( {
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        localStorage.clear()
        const validation = this.validator.validate(this.state)
        this.setState({ validation })
        this.submitted = true
        if (validation.isValid){
            const {login, pwd} = this.state
            axios.post('/connexion', {login, pwd})
                .then((result) => {
                    console.log(result.data[0])
                    localStorage.setItem('login', result.data[0].uname)
                    localStorage.setItem('id', result.data[0].id)
                    localStorage.setItem('lname', result.data[0].lname)
                    localStorage.setItem('fname', result.data[0].fname)
                    this.props.history.push('/test')
                })
            }
    }

    render () {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
        return (
            <Container>
            <Row>
                <Col md="6">
                    <Card>
                        <CardBody>
                                <p className="h4 text-center py-4">Sign in</p>
                                <div className="grey-text">
                                    <div>                                        
                                        <Input name='login' label="Username" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange} />                                    
                                        <span>{validation.login.message}</span>
                                    </div>
                                    <div>    
                                        <Input name='pwd' label="Password" icon="lock" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <span>{validation.pwd.message}</span>
                                    </div>
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <Button color="cyan" onClick={this.onSubmit}>Connexion</Button>
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <p>Not registered yet?</p>
                                    <Button href="/" color="cyan">Register</Button>
                                </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </Container>
                    )
    }
}

export default Connexion
