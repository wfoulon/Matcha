import React from 'react';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact'
import './styles/form.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import axios from 'axios'
// import Header from './header'

class Inscription extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            uname: '',
            lname: '',
            fname: '',
            mail: '',
            pwd: '',
            cpwd:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    // A chaque fois qu'on quitte un input on envoie dans le state la valeur correspondant a l'input
    onChange = (e) => {
        this.setState( {
            [e.target.name]: e.target.value
        })
    }
    // Au moment ou on appuie sur register on recupère le tableau associé aux inputs
    onSubmit = (e) => {
        const {uname, lname, fname, mail, pwd, cpwd} = this.state
        axios.post('/register', {uname, lname, fname, mail, pwd, cpwd})
            .then((result) => {
                console.log(result.data)
            })
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md="6">
                        <Card>
                            <CardBody>
{/*                                 <form> */}
                                    <p className="h4 text-center py-4">Sign up</p>
                                    <div className="grey-text">
                                        <Input name='uname' label="Username" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange} />
                                        <Input name='lname' label="Last name" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <Input name='fname' label="Fist name" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <Input name='mail' label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <Input name='pwd' label="Password" icon="lock" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <Input name='cpwd' label="Confirm your password" icon="exclamation-triangle" group type="password" validate onChange={this.onChange}/>
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <Button color="cyan" onClick={this.onSubmit}>Register</Button>
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <p>Deja inscrit</p>
                                        <Button href="/connexion" color="cyan">Connexion</Button>
                                    </div>
{/*                                 </form> */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default Inscription;
