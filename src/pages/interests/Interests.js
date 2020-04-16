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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function Interests() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    sportInterests: [],
    musicInterests: [],
    moviesinterests: [],
    foodInterests: [],
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSportsCheck = (name) => (event) => {
    var interestsArray = [];

    let interestsRef = app
      .database()
      .ref("users/" + getCurrentUser() + "/sports/interests/");

    interestsRef.once("value", (snapshot) => {
      snapshot.forEach(function (item) {
        var itemVal = item.val();
        if (!interestsArray.includes(itemVal)) {
          interestsArray.push(itemVal);
        }
      });
      if (!interestsArray.includes(name)) {
        console.log("Pushing..." + name);
        interestsArray.push(name);
      } else if (interestsArray.includes(name)) {
        // Delete name from array
        console.log("Deleting..." + name);
        interestsArray.splice(interestsArray.indexOf(name), 1);
      }
      console.log(interestsArray);
      interestsRef.set(interestsArray);
    });
  };

  const handleMusicCheck = (name) => (event) => {
    var interestsArray = [];

    let interestsRef = app
      .database()
      .ref("users/" + getCurrentUser() + "/music/interests/");

    interestsRef.once("value", (snapshot) => {
      snapshot.forEach(function (item) {
        var itemVal = item.val();
        if (!interestsArray.includes(itemVal)) {
          interestsArray.push(itemVal);
        }
      });
      if (!interestsArray.includes(name)) {
        console.log("Pushing..." + name);
        interestsArray.push(name);
      } else if (interestsArray.includes(name)) {
        // Delete name from array
        console.log("Deleting..." + name);
        interestsArray.splice(interestsArray.indexOf(name), 1);
      }
      console.log(interestsArray);
      interestsRef.set(interestsArray);
    });
  };

  const handleMovieCheck = (name) => (event) => {
    var interestsArray = [];

    let interestsRef = app
      .database()
      .ref("users/" + getCurrentUser() + "/movies/interests/");

    interestsRef.once("value", (snapshot) => {
      snapshot.forEach(function (item) {
        var itemVal = item.val();
        if (!interestsArray.includes(itemVal)) {
          interestsArray.push(itemVal);
        }
      });
      if (!interestsArray.includes(name)) {
        console.log("Pushing..." + name);
        interestsArray.push(name);
      } else if (interestsArray.includes(name)) {
        // Delete name from array
        console.log("Deleting..." + name);
        interestsArray.splice(interestsArray.indexOf(name), 1);
      }
      console.log(interestsArray);
      interestsRef.set(interestsArray);
    });
  };

  const handleFoodCheck = (name) => (event) => {
    var interestsArray = [];

    let interestsRef = app
      .database()
      .ref("users/" + getCurrentUser() + "/food/interests/");

    interestsRef.once("value", (snapshot) => {
      snapshot.forEach(function (item) {
        var itemVal = item.val();
        if (!interestsArray.includes(itemVal)) {
          interestsArray.push(itemVal);
        }
      });
      if (!interestsArray.includes(name)) {
        console.log("Pushing..." + name);
        interestsArray.push(name);
      } else if (interestsArray.includes(name)) {
        // Delete name from array
        console.log("Deleting..." + name);
        interestsArray.splice(interestsArray.indexOf(name), 1);
      }
      console.log(interestsArray);
      interestsRef.set(interestsArray);
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
                      control={<Checkbox value="Basketball" />}
                      onChange={handleSportsCheck("Basketball")}
                      label="Basketball"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="Football" />}
                      onChange={handleSportsCheck("Football")}
                      label="Football"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="Running" />}
                      onChange={handleSportsCheck("Running")}
                      label="Running"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="Soccer" />}
                      onChange={handleSportsCheck("Soccer")}
                      label="Soccer"
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="Tennis" />}
                      onChange={handleSportsCheck("Tennis")}
                      label="Tennis"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="Baseball" />}
                      onChange={handleSportsCheck("Baseball")}
                      label="Baseball"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="Rowing" />}
                      onChange={handleSportsCheck("Rowing")}
                      label="Rowing"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={<Checkbox value="Swimming" />}
                      onChange={handleSportsCheck("Swimming")}
                      label="Swimming"
                    />
                  </Grid>
                </Grid>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Pop" />}
                    onChange={handleMusicCheck("Pop")}
                    label="Pop"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Rap" />}
                    onChange={handleMusicCheck("Rap")}
                    label="Rap"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="EDM" />}
                    onChange={handleMusicCheck("EDM")}
                    label="EDM"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Country" />}
                    onChange={handleMusicCheck("Country")}
                    label="Country"
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Star Wars" />}
                    onChange={handleMovieCheck("Star Wars")}
                    label="Star Wars"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Avengers" />}
                    onChange={handleMovieCheck("Avengers")}
                    label="Avengers"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Spiderman" />}
                    onChange={handleMovieCheck("Spiderman")}
                    label="Spiderman"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Twilight" />}
                    onChange={handleMovieCheck("Twilight")}
                    label="Twilight"
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid container>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Coffee" />}
                    onChange={handleFoodCheck("Coffee")}
                    label="Coffee"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Cake" />}
                    onChange={handleFoodCheck("Cake")}
                    label="Cake"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Rice" />}
                    onChange={handleFoodCheck("Rice")}
                    label="Rice"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    control={<Checkbox value="Burgers" />}
                    onChange={handleFoodCheck("Burgers")}
                    label="Burgers"
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </div>
          <Button variant="contained" color="primary">
            <Link to="/overview">Next</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
