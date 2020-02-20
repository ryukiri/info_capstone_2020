import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import grey from "@material-ui/core/colors/grey";
import { State } from "react-powerplug";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import "./Signup.css";
import diary from "../../assets/images/diary.jpg";
import * as routes from "./../../constants/routes";
import { auth } from "./../../components/firebase";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: {
      main: "#ffffff"
    }
  }
});

class Signup extends React.Component {
  handleSubmit = ({ email, password }) => {
    return auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Successful Sign Up', response);
        this.props.history.push(routes.HOME_PATH);
      })
      .catch(err => {
        console.log('Failed Sign Up', err);
        throw err;
      });
  };

  render() {
    return (
      <State initial={{ email: "", password: "", error: null }}>
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
              password: state.password
            }).catch(err => {
              setState({ error: err.message });
            });
          };

          const classes = makeStyles(theme => ({
            "@global": {
              body: {
                backgroundColor: theme.palette.common.white
              }
            },
            paper: {
              marginTop: theme.spacing(8),
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            },
            avatar: {
              margin: theme.spacing(1),
              backgroundColor: theme.palette.secondary.main
            },
            form: {
              width: "100%", // Fix IE 11 issue.
              marginTop: theme.spacing(1)
            },
            submit: {
              margin: theme.spacing(3, 0, 2)
            }
          }));

          return (
            <div>
              <Desktop className="desktop">
                <Grid container spacing={7}>
                  <Grid item xs={8}>
                    <img
                      src={diary}
                      alt="diary"
                      style={{
                        width: "100%",
                        height: "100vh",
                        alignSelf: "stretch"
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="h3"
                      component="h3"
                      style={{ paddingTop: "5%" }}
                    >
                      Data Diary
                    </Typography>

                    <Typography
                      variant="h1"
                      component="h1"
                      style={{ paddingTop: "20%" }}
                    >
                      Sign Up
                    </Typography>

                    <ThemeProvider theme={myTheme}>
                      <form onSubmit={onSubmit} style={{ paddingRight: "10%" }}>
                        {state.error && (
                          <p style={{ color: "red" }}>{state.error}</p>
                        )}
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="outlined-required"
                          label="First Name"
                          name="firstname"
                          autoFocus
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="outlined-required"
                          label="Last Name"
                          name="lastname"
                        />
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
                          Sign Up
                        </Button>
                        <Grid container>
                          <Grid item>
                            <Link to="/login" variant="body2">
                              {"Have an account? Sign In"}
                            </Link>
                          </Grid>
                        </Grid>
                      </form>
                    </ThemeProvider>
                  </Grid>
                </Grid>
              </Desktop>

              <div className="mobile">
                <Mobile>
                  <ThemeProvider theme={myTheme}>
                    <Link to="/" className={"noDecorations"}>
                      <ArrowBackIosIcon />
                    </Link>

                    <Typography
                      variant="h3"
                      component="h2"
                      style={{ paddingTop: "20%" }}
                    >
                      Sign up
                    </Typography>

                    <form onSubmit={onSubmit}>
                      {state.error && (
                        <p style={{ color: "red" }}>{state.error}</p>
                      )}
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="outlined-required"
                        label="First Name"
                        name="firstname"
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="outlined-required"
                        label="Last Name"
                        name="lastname"
                      />
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
                        Sign Up
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link to="/login" variant="body2">
                            {"Have an account? Sign In"}
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </ThemeProvider>
                </Mobile>
              </div>
            </div>
          );
        }}
      </State>
    );
  }
}

export default Signup;
