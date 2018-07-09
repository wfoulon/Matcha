import React, { Component } from 'react'
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact'
import axios from 'axios'
import './styles/form.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

class Connexion extends Component {
    constructor (props) {
        super(props)
        this.state = {
            login: '',
            pwd: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = (e) => {
        this.setState( {
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        const {login, pwd} = this.state
        axios.post('/connexion', {login, pwd})
            .then((result) => {
                console.log(result.data)
            })
    }

    render () {
        return (
            <Container>
            <Row>
                <Col md="6">
                    <Card>
                        <CardBody>
            {/*                                 <form> */}
                                <p className="h4 text-center py-4">Sign in</p>
                                <div className="grey-text">
                                    <Input name='login' label="Username" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange} />                                    
                                    <Input name='pwd' label="Password" icon="lock" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <Button color="cyan" onClick={this.onSubmit}>Connexion</Button>
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <p>Pas encore inscrit</p>
                                    <Button href="/" color="cyan">Register</Button>
                                </div>
            {/*                                 </form> */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </Container>
                    )
    }
}

export default Connexion
