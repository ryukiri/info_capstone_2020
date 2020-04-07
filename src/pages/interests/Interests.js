import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { useMediaQuery } from "react-responsive";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";

import "./Interests.css";
import app from "../../components/firebase/base";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function getCurrentUser() {
  var user = app.auth().currentUser;

  if (user) {
    //console.log(user.uid)
    return user.uid;
  } else {
    // No user is signed in.
  }
}

function getUserEmail() {
  var user = app.auth().currentUser;

  if (user) {
    //console.log(user.uid)
    return user.email;
  } else {
    // No user is signed in.
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

export default function Interests() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    interests: []
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheck = name => event => {
    if (state.interests.includes(name)) {
      state.interests.splice( state.interests.indexOf(name), 1)
    } else {
      setState({
        ...state,
        interests: state.interests.concat(name)
      });
    }
  };

  const buttonClick = (event, newValue) => {
    console.log(state.interests)
    console.log(getCurrentUser())
    console.log(getUserEmail())
    var interests = state.interests
    var email = getUserEmail()

    var ref = app.database().ref("users/")
    ref.child(getCurrentUser()).set({
      interests,
      email
    });

  };

  return (
    <div>
      <ButtonAppBar />

      <Card className="card">
        <CardContent>
          <Typography variant="h4">
            It's time to build your Data Diary!
          </Typography>

          <Typography variant="h6">Select all the things you like!</Typography>

          <hr />

          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                centered
              >
                <Tab label="Sports" {...a11yProps(0)} />
                <Tab label="Music" {...a11yProps(1)} />
                <Tab label="Movies" {...a11yProps(2)} />
                <Tab label="Food" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div>
                <Grid container>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="basketball" />}
                      onChange={handleCheck("basketball")}
                      label="basketball"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="football" />}
                      onChange={handleCheck("football")}
                      label="football"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="running" />}
                      onChange={handleCheck("running")}
                      label="running"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="soccer" />}
                      onChange={handleCheck("soccer")}
                      label="soccer"
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="tennis" />}
                      onChange={handleCheck("tennis")}
                      label="tennis"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="baseball" />}
                      onChange={handleCheck("baseball")}
                      label="baseball"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="rowing" />}
                      onChange={handleCheck("rowing")}
                      label="rowing"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="swimming" />}
                      onChange={handleCheck("swimming")}
                      label="swimming"
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={buttonClick}>
                  <Link to="/overview">Next</Link>
                </Button>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Music
            </TabPanel>
            <TabPanel value={value} index={2}>
              Movies
            </TabPanel>
            <TabPanel value={value} index={3}>
              Food
            </TabPanel>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
