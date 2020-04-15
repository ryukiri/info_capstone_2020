import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import Typography from "@material-ui/core/Typography";
import {
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import "./Login.css";
import diary from "../../assets/images/diary.jpg";
import app from "./../../components/firebase/base";
import { AuthContext } from "./../../components/firebase/auth";

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

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/overview");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/overview" />;
  }
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
              Login
            </Typography>

            <ThemeProvider theme={myTheme}>
              <form style={{ paddingRight: "10%" }} onSubmit={handleLogin}>
                <TextField
                  type="text"
                  name="email"
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
                  fullWidth
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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
              Login
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                type="text"
                name="email"
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
                fullWidth
                autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </ThemeProvider>
        </Mobile>
      </div>
    </div>
  );
};

export default withRouter(Login);