import React, { useCallback } from "react";
import { withRouter } from "react-router";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import "./Signup.css";
import diary from "../../assets/images/diary.jpg";
import app from "./../../components/firebase/base";

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
      main: grey[900],
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const Signup = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { fname, lname, school, email, password } = event.target.elements;
      console.log(fname.value);
      console.log(lname.value);
      console.log(school.value);
      var fullName = fname.value + " " + lname.value;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(function(result) {
            return result.user.updateProfile({
              displayName: fullName
            })
          }).catch(function(error) {
            console.log(error);
          });
        //app.auth().signOut();

        // Append user info to DB
        var userID = app.auth().currentUser.uid;
        var ref = app.database().ref("users/" + userID);
        ref.set({
          full_name: fullName,
          email: email.value,
          school: school.value,
          level: 1,
          points: 0
        });

        history.push("/interests");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  // For dropdown
  const [school, setSchool] = React.useState("");

  const handleChange = (event) => {
    setSchool(event.target.value);
  };

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Desktop className="desktop">
        {/* 
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={`${vertical},${horizontal}`}
          open={open}
          onClose={handleClose}
          message="Please check your email and verify your account before signing in."
        />
        */}

        <Grid container spacing={7}>
          <Grid item xs={8}>
            <img
              src={diary}
              alt="diary"
              style={{
                width: "100%",
                height: "100vh",
                alignSelf: "stretch",
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
              <form style={{ paddingRight: "10%" }} onSubmit={handleSignUp}>
                <TextField
                  type="text"
                  name="fname"
                  variant="outlined"
                  margin="normal"
                  required
                  id="sign-up-fname"
                  label="First Name"
                  autoComplete="fname"
                  fullWidth
                  autoFocus
                />

                <TextField
                  type="text"
                  name="lname"
                  variant="outlined"
                  margin="normal"
                  required
                  id="sign-up-lname"
                  label="Last Name"
                  autoComplete="lname"
                  fullWidth
                />

                <FormControl variant="outlined" fullWidth={true}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    School *
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={school}
                    onChange={handleChange}
                    label="School"
                    id="sign-up-school"
                    required
                    name="school"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"School 1"}>School 1</MenuItem>
                    <MenuItem value={"School 2"}>School 2</MenuItem>
                    <MenuItem value={"School 3"}>School 3</MenuItem>
                  </Select>
                </FormControl>

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
                  onClick={handleClick({
                    vertical: "bottom",
                    horizontal: "center",
                  })}
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
              Sign Up
            </Typography>

            <form onSubmit={handleSignUp}>
              <TextField
                type="text"
                name="fname"
                variant="outlined"
                margin="normal"
                required
                id="sign-up-fname"
                label="First Name"
                autoComplete="fname"
                fullWidth
                autoFocus
              />

              <TextField
                type="text"
                name="lname"
                variant="outlined"
                margin="normal"
                required
                id="sign-up-lname"
                label="Last Name"
                autoComplete="lname"
                fullWidth
              />

              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel id="demo-simple-select-outlined-label">
                  School *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={school}
                  onChange={handleChange}
                  label="School"
                  id="sign-up-school"
                  required
                  name="school"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"School 1"}>School 1</MenuItem>
                  <MenuItem value={"School 2"}>School 2</MenuItem>
                  <MenuItem value={"School 3"}>School 3</MenuItem>
                </Select>
              </FormControl>

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
                Sign Up
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

export default withRouter(Signup);
