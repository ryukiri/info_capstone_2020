import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBar';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useMediaQuery } from 'react-responsive'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom'
import './Login.css';
import diary from '../../assets/images/diary.jpg';
import * as routes from './../../constants/routes'
import {auth} from './../../components/firebase'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: '#ffffff',
    },
  }
});

class Login extends React.Component {
  handleSubmit = ({ email, password }) => {
    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Successful Sign In', response);
        this.props.history.push(routes.OVERVIEW_PATH);
      })
      .catch(err => {
        console.log('Failed Sign In', err);
        throw err;
      });
  };
  
render(){
  return (
    <div>
      <div>
        <Desktop className="desktop">
          {/* <ButtonAppBar/> */}
          <Grid container spacing={7}>
            <Grid item xs={8}>
              <img src={diary} style={{width: '100%', height: '100vh', alignSelf: 'stretch'}}/>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h3" component="h3" style={{paddingTop: "5%"}}>
                Data Diary
              </Typography>

              <Typography variant="h1" component="h1" style={{paddingTop: "20%"}}>
                Login
              </Typography>

              <form noValidate autoComplete="off" className="loginForm" style={{paddingRight: '10%'}}>
                <TextField 
                  id="standard-basic" 
                  fullWidth
                  label="Email" />
                <TextField id="standard-basic" 
                  fullWidth 
                  style={{ marginTop: 20, marginRight: 20 }} 
                  label="Password" />
                <Typography 
                  variant="caption"
                  align='center'>
                  Forgot Password?
                </Typography>

                <ThemeProvider theme={myTheme}>
                  <Link to='/overview'>
                    <Button variant="contained" color="primary" component="span" fullWidth style={{marginTop: 60}}>
                      Sign In
                    </Button>
                  </Link>
                  <Button variant="contained" color="primary" component="span" style={{marginTop: 40}}>
                    Sign In With Google
                  </Button>
                  <Button variant="contained" color="primary" component="span" style={{marginTop: 40, marginLeft: 10}}>
                    Sign In With Microsoft
                  </Button>
                  <br />
                </ThemeProvider>
                <Typography 
                  variant="caption"
                  align='center'>
                  Don't have an account? <b>Sign Up</b>
                </Typography>
              </form>

            </Grid>
          </Grid>
        </Desktop>
      </div>

      <div className="mobile">
        <Mobile>
          <Link to="/" className={"noDecorations"}>
            <ArrowBackIosIcon/>
          </Link>

          <Typography variant="h3" component="h2" style={{paddingTop: "20%"}}>
            Login
          </Typography>
          
          <form noValidate autoComplete="off" className="loginForm">
            <TextField id="standard-basic" fullWidth label="Email" />
            <TextField id="standard-basic" fullWidth style={{ marginTop: 20 }} label="Password" />
            <Typography 
              variant="caption"
              align='center'>
              Forgot Password?
            </Typography>
          </form>
          
          <ThemeProvider theme={myTheme}>
            <Link to="/overview">
              <Button variant="contained" color="primary" component="span" fullWidth style={{marginTop: 60}}>
                Sign In
              </Button>
            </Link>
          </ThemeProvider>

          <Typography 
              variant="caption"
              align='center'
              style={{position: "absolute", bottom: "10%", right: "10%", left: "10%"}}>
              Don't have an account? <b>Sign Up</b>
          </Typography>
        </Mobile>
      </div>     
    </div>
  );
}
}


export default (Login);