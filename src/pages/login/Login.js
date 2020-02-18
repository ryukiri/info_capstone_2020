import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBar';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import { useMediaQuery } from 'react-responsive'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom'
import './Login.css';

function Login() {
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

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    typography: {
      align: 'center',
    },
  }));

  const classes = useStyles();

  return (
    <div>
      {/*<ButtonAppBar/>*/}
      <div className="mobile">
        <Mobile>
          <Link to="/" className={"noDecorations"}>
            <ArrowBackIosIcon/>
          </Link>

          <Typography variant="h3" component="h2" style={{paddingTop: "20%"}}>
            Login
          </Typography>
          
          <form className={classes.root} noValidate autoComplete="off" className="loginForm">
            <TextField id="standard-basic" fullWidth label="Email" />
            <TextField id="standard-basic" fullWidth style={{ marginTop: 20 }} label="Password" />
            <Typography 
              variant="caption"
              align='center'>
              Forgot Password?
            </Typography>
          </form>
          
          <ThemeProvider theme={myTheme}>
            <Button variant="contained" color="primary" component="span" fullWidth style={{marginTop: 60}}>
              Sign In
            </Button>
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

export default Login;
