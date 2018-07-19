import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import './styles/profil.css'
import Pict from './avatar.jpg'
import {Image, Grid, Col, Row} from 'react-bootstrap/lib/';
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
      };

    render () {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className='main-content'>
                <div className='content-profile'>
                    <div className='content-header-profile'>
                    <Grid>
                        <Row>
                        <Col xs={6} md={4}>
                            {/* <Image src="/thumbnail.png" responsive />
                            <Image src={Pict} circle />
                            <p>{localStorage.login}</p>
                            <div>First Name: </div>
                            <div>Last Name: </div>
                            <div>Gender: </div>
                            <div>Sexual orentation: </div> */}

                            {/* <!-- Card --> */}
                            <div className="card mb-4">

                                {/* <!-- Card image --> */}
                                <div className="view overlay">
                                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg" alt="Card image cap"/>
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                                </div>

                                {/* <!-- Card content --> */}
                                <div className="card-body">

                                {/* <!-- Title --> */}
                                <h4 className="card-title">{localStorage.fname} {localStorage.lname} {localStorage.login}</h4>
                                {/* <!-- Text --> */}
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* <!-- Provides extra visual weight and identifies the primary action in a set of buttons --> */}
                                {/* <button type="button" class="btn btn-primary btn-md">Read more</button> */}

                                </div>
                                {/* <!-- Card content --> */}

                            </div>
                            {/* <!-- Card --> */}
                        </Col>
                        <Col>
                            <div><a href='/account'>Modifier profile</a></div>
                            <div><textarea>bio</textarea></div>
                        </Col>
                        </Row>
                        </Grid>
                        {/* <section className=''>
                        </section> */}
                    </div>
                    <div className='content-page'>
                        <Paper className={classes.root}>
                            <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
                                <Tab label="Pictures" />
                                <Tab label="Matches" />
                                <Tab label="Tag" />
                                {/* <Tab label="Delete Account" /> */}
                            </Tabs>
                        </Paper>
                    </div>
                </div>
            </div>
        )
    }
}

Profil.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Profil);
