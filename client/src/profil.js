import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import './styles/profil.css'
import {Grid, Col, Row} from 'react-bootstrap/lib/';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';


  const styles = {
    root: {
      flexGrow: 1
    }
  }

  function TabContainer(props) {
    return (
      <Typography component='div' style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    )
  }
class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            selectedFile: null,
        }
    }
  

  fileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  }

  uploadHandler = () => {
    // axios.post('/uploadimg', {})
    // .then.result((result) => {

    // }) 
    console.log(this.state.selectedFile)
    // console.log(this.state.selectedFile[1])
  }

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
                  <div className='card mb-4'>
                    <div className='view overlay'>
                      <img className='card-img-top' src='https://mdbootstrap.com/img/Photos/Others/images/49.jpg' alt='Card image cap' />
                    </div>
                    <div className='card-body'>
                      <h4 className='card-title'>{localStorage.fname} {localStorage.lname}</h4>
                      <p className='card-text'>Gender: {localStorage.gender}</p>
                      <p className='card-text'>Sexual Orientation: { localStorage.sex}</p>
                      <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <p className='card-text'>TAG</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
          <div className='content-page'>
            <Paper className={classes.root}>
              <Tabs value={value} onChange={this.handleChange} indicatorColor='primary' textColor='primary' centered>
                <Tab label='Pictures' />
                <Tab label='Matches' />
                <Tab label='Tag' />
              </Tabs>
            </Paper>

            {value === 0 && (
            <TabContainer>
              <ImagesUploader
              url="http://localhost:9090/multiple"
              optimisticPreviews
              onLoadEnd={(err) => {
                  if (err) {
                      console.error(err);
                  }
              }}
              label="Upload multiple images"
              />
            </TabContainer>)}
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
