import React from 'react';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact'
import './form.css'
import axios from 'axios'

class FormsPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
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
        const {lname, fname, mail, pwd, cpwd} = this.state
        axios.post('/register', {lname, fname, mail, pwd, cpwd})
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
                                        <Input name='lname' label="Last name" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <Input name='fname' label="Fist name" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <Input name='mail' label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <Input name='pwd' label="Password" icon="lock" group type="text" validate error="wrong" success="right" onChange={this.onChange}/>
                                        <Input name='cpwd' label="Confirm your password" icon="exclamation-triangle" group type="password" validate onChange={this.onChange}/>
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <Button color="cyan" onClick={this.onSubmit}>Register</Button>
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

export default FormsPage;
