import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios'
import FormValidator from './FormValidator'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = {
  root: {
    flexGrow: 1
  }
};

class Account extends Component {
    constructor(props) {
        super(props)
        this.validator = new FormValidator([
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
                message: 'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number.'
            },
            {
                field: 'newpwd',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required.'
            },
            {
                field: 'newpwd',
                method: 'matches',
                args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/],
                validWhen: true,
                message: 'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number.'
            },
            {
                field: 'cnewpwd',
                method: 'isEmpty',
                validWhen: false,
                message: 'Confirmation is required.'
            },
            {
                field: 'cnewpwd',
                method: this.passwordMatch,
                validWhen: true,
                message: 'Password and confirmation password do not match',
            },
            // {
            //     field: 'lname',
            //     method: 'isEmpty',
            //     validWhen: false,
            //     message: 'Lastname is required.'
            // },
            // {
            //     field: 'lname',
            //     method: 'matches',
            //     args: [/^[A-Za-z]+$/],
            //     validWhen: true,
            //     message: 'Lastname must only contain Alpha characters.'
            // },
            // {
            //     field: 'fname',
            //     method: 'isEmpty',
            //     validWhen: false,
            //     message: 'Firstname is required.'
            // },
            // {
            //     field: 'fname',
            //     method: 'matches',
            //     args: [/^[A-Za-z]+$/],
            //     validWhen: true,
            //     message: 'Firstname must only contain Alpha characters.'
            // },
        ])
        this.state = {
            pwd : '',
            newpwd : '',
            cnewpwd : '',
            lname : '',
            fname : '',
            age: '',
            gender: '',
            sexual_orientation: '',
            validation: this.validator.valid(),
            value : 0
        }
        this.onSubmitPass = this.onSubmitPass.bind(this)
        this.onChange = this.onChange.bind(this)
        this.submitted = false
    }
    passwordMatch = (cnewpwd, state) => (state.newpwd === cnewpwd)

    onChange = (e) => {
        this.setState( {
            [e.target.name]: e.target.value
        })
    }

    onSubmitPass = (e) => {
        const validation = this.validator.validate(this.state)
        this.setState({ validation })
        this.submitted = true
        if (validation.isValid) {
            const id = localStorage.id
            const {pwd, newpwd, cnewpwd} = this.state
            axios.post('/changepassword', {pwd, newpwd, cnewpwd, id})
            .then((result) => {
                
            })
        }    
    }
    
    onSubmit = (e) => {
        const validation = this.validator.validate(this.state)
        this.setState({ validation })
        this.submitted = true
        // if (validation.isValid) {
            console.log('yolooooooooo') 
            const id = localStorage.id
            const {lname, fname, age, gender, sexual_orientation} = this.state
            axios.post('/profile', {id, lname, fname, age, gender, sexual_orientation})
                .then((result) => {

            })
        // }   
    }

    handleChange = (event, value) => {
      this.setState({ value });
    };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
    return (
      <div>
        <Paper className={classes.root}>
          <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Profil" />
            <Tab label="Change Password" />
            <Tab label="Change Email" />
          </Tabs>
        </Paper>
        {value === 0 && (
          <TabContainer>
            <Container>
              <Row>
                <Col md="6">
                  <Card>
                    <CardBody>
                      <p className="h4 text-center py-4">Profil</p>
                      <div className="grey-text">
                        <div>
                          <Input name="lname" label="Lastname" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange} />
                          {/* <span>{validation.lname.message}</span> */}
                        </div>
                        <div>
                          <Input name="fname" label="Firstname" icon="user" grouptype="text" validate error="wrong" success="right" onChange={this.onChange} />
                          {/* <span>{validation.fname.message}</span> */}
                        </div>
                        <div>
                            <select class="mdb-select" name='gender' onChange={this.onChange}>
                                <option value="" disabled selected>Gender</option>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                          <Input name="age" label="Age" icon="" grouptype="text" validate error="wrong" success="right" onChange={this.onChange}/>
                        </div>
                        <div>
                        <select class="mdb-select" name='sexual_orientation' onChange={this.onChange}>
                                <option value="" disabled selected>Sexual Orientation</option>
                                <option value="Heterosexual">Heterosexual</option>
                                <option value="Homosexual">Homosexual</option>
                                <option value="Bisexual">Bisexual</option>
                            </select>                          
                        </div>
                      </div>
                      <div className="text-center py-4 mt-3">
                        <Button color="cyan" onClick={this.onSubmit}>Submit</Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </TabContainer>
        )}
        {value === 1 && <TabContainer>
          <Container>
          <Row>
          <Col md="6">
                    <Card>
                        <CardBody>
                            <p className="h4 text-center py-4">Change Password</p>
                            <div className="grey-text">
                                <div>                                            
                                    <Input name='pwd' label="Your password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                    <span>{validation.pwd.message}</span>
                                </div>
                                <div>
                                    <Input name='newpwd' label="New password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                    <span>{validation.newpwd.message}</span>
                                </div>
                                <div>
                                    <Input name='cnewpwd' label="Confirm new password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                    <span>{validation.cnewpwd.message}</span>
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <Button color="cyan" onClick={this.onSubmitPass}>Submit</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
          </Container>
        </TabContainer>}
        {value === 2 && <TabContainer>
          <Container>
          <Row>
          <Col md="6">
                    <Card>
                        <CardBody>
                            <p className="h4 text-center py-4">Change Email</p>
                            <div className="grey-text">
                                <div>                                            
                                    <Input name='pwd' label="Your login" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange}/>
                                    {/* <span>{validation.pwd.message}</span> */}
                                </div>
                                <div>
                                    <Input name='newpwd' label="New Email" icon="user" group type="email" validate error="wrong" success="right" onChange={this.onChange}/>
                                    {/* <span>{validation.newpwd.message}</span> */}
                                </div>
                                <div>
                                    <Input name='cnewpwd' label="Your password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                    {/* <span>{validation.cnewpwd.message}</span> */}
                                </div>
                                <div>
                                    <Input name='cnewpwd' label="Confirm your password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                    {/* <span>{validation.cnewpwd.message}</span> */}
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <Button color="cyan" onClick={this.onSubmitPass}>Submit</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>  
        </TabContainer>}
      </div>
    )
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
