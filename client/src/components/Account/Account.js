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
import axios from 'axios'
import FormValidator from '../FormValidator/FormValidator'

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
    field: 'cpwd',
    method: 'isEmpty',
    validWhen: false,
    message: 'Confirmation is required.'
  },
  {
    field: 'cpwd',
    method: this.passwordMatch2,
    validWhen: true,
    message: 'Password and confirmation password do not match',
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
   {
     field: 'uname',
     method: 'isEmpty',
     validWhen: false,
     message: 'Username is required.'
   },
   {
     field: 'uname',
     method: 'matches',
     args: [/^(?=.*[A-Za-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸ])[áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸA-Za-z0-9 _-]*$/],
     validWhen: true,
     message: 'Username format is not valid.'
   },
   {   
     field: 'newemail',
     method: 'isEmpty',
     validWhen: false,
     message: 'Email is required.'
 },
 {
     field: 'newemail',
     method: 'isEmail',
     validWhen: true,
     message: 'That is not a valid email.',
 },
        ])
        this.state = {
            uname: '',
            newemail: '', 
            pwd : '',
            cpwd: '',
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
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmitMail = this.onSubmitMail.bind(this)
        this.onSubmitDelete = this.onSubmitDelete.bind(this)
        this.onChange = this.onChange.bind(this)
        this.submitted = false
    }
    passwordMatch = (cnewpwd, state) => (state.newpwd === cnewpwd)
    passwordMatch2 = (cpwd, state) => (state.pwd === cpwd)
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
            const id = localStorage.id
            const {lname, fname, age, gender, sexual_orientation} = this.state
            axios.post('/profile', {id, lname, fname, age, gender, sexual_orientation})
                .then((result) => {

            })
        // }   
    }
  
  onSubmitMail = (e) => {
    const validation = this.validator.validate(this.state)
    this.setState({ validation })
    this.submitted = true
    // if (validation.isValid) {
      const login = localStorage.login
      const id = localStorage.id
      const {uname, newemail, pwd, cpwd} = this.state
      axios.post('/changemail', {uname, newemail, pwd, cpwd, id, login})
      .then((result) => {
      })
    // }
  }

  onSubmitDelete = (e) => {
    console.log('yoloo')
    const validation = this.validator.validate(this.state)
    this.setState({ validation })
    this.submitted = true
    // if (validation.isValid) {
      const login = localStorage.login
      const id = localStorage.id
      const {uname, pwd, cpwd} = this.state
      axios.post('/deleteaccount', {uname, pwd, cpwd, id, login})
      .then((result) => {
        console.log(result)
        // if (result)
        // localStorage.clear()
        // this.props.history.push('/connexion')
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
            <Tab label="Delete Account" />
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
                            <select className="mdb-select" name='gender' onChange={this.onChange}>
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
                        <select className="mdb-select" name='sexual_orientation' onChange={this.onChange}>
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
                                    <Input name='uname' label="Your login" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange}/>
                                    <span>{validation.uname.message}</span>
                                </div>
                                <div>
                                    <Input name='newemail' label="New Email" icon="user" group type="email" validate error="wrong" success="right" onChange={this.onChange}/>
                                    <span>{validation.newemail.message}</span>
                                </div>
                                <div>
                                    <Input name='pwd' label="Your password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                    <span>{validation.pwd.message}</span>
                                </div>
                                <div>
                                    <Input name='cpwd' label="Confirm your password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                    <span>{validation.cpwd.message}</span>
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <Button color="cyan" onClick={this.onSubmitMail}>Submit</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>  
        </TabContainer>}
        {value === 3 && <TabContainer>
          <Container>
            <Row>
              <Col md="6">
                <Card>
                  <CardBody>
                    <p className="h4 text-center py-4">Delete Account</p>
                    <div className="grey-text">
                      <div>                                            
                        <Input name='uname' label="Your login" icon="user" group type="text" validate error="wrong" success="right" onChange={this.onChange}/>
                        <span>{validation.uname.message}</span>
                      </div>
                      <div>
                        <Input name='pwd' label="Your password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                        <span>{validation.pwd.message}</span>
                      </div>
                      <div>
                        <Input name='cpwd' label="Confirm your password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                        <span>{validation.cpwd.message}</span>
                      </div>
                      <div className="text-center py-4 mt-3">
                        <Button color="cyan" onClick={this.onSubmitDelete}>Delete</Button>
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
