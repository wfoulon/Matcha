import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import PhoneIcon from '@material-ui/icons/Phone';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
// import HelpIcon from '@material-ui/icons/Help';
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact'
// import './styles/global.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import axios from 'axios'
// import FormValidator from './FormValidator'

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

class CenteredTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Paper className={classes.root}>
          <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Profil" />
            <Tab label="Change Password" />
            <Tab label="Change Email" />
            {/* <Tab label="Delete Account" /> */}
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
                          <Input name="lname" label="Lastname" icon="user" group type="text" validate error="wrong" success="right"/>
                        </div>
                        <div>
                          <Input name="fname" label="Firstname" icon="user" grouptype="text" validateerror="wrong" success="right"/>
                        </div>
                        <div>
                          <FormControl>
                            <InputLabel htmlFor="age-simple">Gender</InputLabel>
                            <Select>
                              <MenuItem><em>None</em></MenuItem>
                              <MenuItem>Ten</MenuItem>
                              <MenuItem>Twenty</MenuItem>
                              <MenuItem>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div>
                          <Input name="age"label="Age"icon=""grouptype="text" validate error="wrong" success="right" onChange={this.onChange}/>
                        </div>
                        <div>
                          <Input name="cpwd"label="Sexual Orientation" icon="" grouptype="text" validateonChange={this.onChange}/>
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
                                    {/* <span>{validation.pwd.message}</span> */}
                                </div>
                                <div>
                                    <Input name='newpwd' label="New password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
                                    {/* <span>{validation.newpwd.message}</span> */}
                                </div>
                                <div>
                                    <Input name='cnewpwd' label="Confirm new password" icon="user" group type="password" validate error="wrong" success="right" onChange={this.onChange}/>
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

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);
