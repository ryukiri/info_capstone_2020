import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBar';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import { State } from 'react-powerplug';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
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
  
  render() {
    return (
      <State initial={{ email: '', password: '', error: null }}>
        {({ state, setState }) => {
          const onEmailChange = e => {
            setState({ email: e.target.value });
          };
          
          const onPasswordChange = e => {
            setState({ password: e.target.value });
          };

          const onSubmit = e => {
            e.preventDefault();
            this.handleSubmit({
              email: state.email,
              password: state.password,
            }).catch(err => {
              setState({ error: err.message });
            });
          };

          const classes = makeStyles(theme => ({
            '@global': {
              body: {
                backgroundColor: theme.palette.common.white,
              },
            },
            paper: {
              marginTop: theme.spacing(8),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
            avatar: {
              margin: theme.spacing(1),
              backgroundColor: theme.palette.secondary.main,
            },
            form: {
              width: '100%', // Fix IE 11 issue.
              marginTop: theme.spacing(1),
            },
            submit: {
              margin: theme.spacing(3, 0, 2),
            },
          }));

          return (
            <div>
              <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <form onSubmit={onSubmit}>
                  {state.error &&
                    <p style={{ color: 'red' }}>
                      {state.error}
                    </p>}
                      <TextField
                        type="text"
                        name="email"
                        value={state.email}
                        onChange={onEmailChange}
                        variant="outlined"
                        margin="normal"
                        required
                        id="login-email"
                        label="Email Address"
                        autoComplete="email"
                        fullWidth
                        autoFocus
                      />

                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="login-inputPassword"
                        value={state.password}
                        onChange={onPasswordChange}
                        fullWidth
                        autoComplete="current-password"
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.submit}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                </form>
              </Container>
            </div>
          );
        }}
      </State>
    );
  }
}


export default (Login);