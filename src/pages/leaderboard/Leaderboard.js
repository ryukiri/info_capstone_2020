import React from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Line, Circle } from "rc-progress";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import { Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/teal";
import profileImg from "../../assets/images/account.png";
import "./Leaderboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    paddingTop: theme.spacing(5),
  },
  paddingBottom: {
    paddingBottom: theme.spacing(5),
  },
  paperRed: {
    background: "linear-gradient(90deg, #f44336 30%, #e57373 90%)",
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  paperPurple: {
    background: "linear-gradient(90deg, #9C27B0 30%, #BA68C8 90%)",
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  paperBlue: {
    background: "linear-gradient(90deg, #1E88E5 30%, #64B5F6 90%)",
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  paperTeal: {
    background: "linear-gradient(90deg, #009688 30%, #80CBC4 90%)",
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  profilePic: {
    width: "40%",
  },
  topCards: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "linear-gradient(360deg, #B4DFE5 30%, #f7fbfc 90%)",
  },
}));

function Leaderboard(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <ButtonAppBar />
      <Container className={classes.container}>
        <Typography variant="h3" style={{ display: "inline-block" }}>
          Leaderboard{" "}
        </Typography>
        <Typography variant="h4" style={{ display: "inline-block" }}>
          {" "}
          &nbsp; for &nbsp;
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Group</InputLabel>
          <Select
            native
            value={state.age}
            onChange={handleChange}
            label="Age"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Group A</option>
            <option value={20}>Group B</option>
            <option value={30}>Group C</option>
          </Select>
        </FormControl>
        <Grid style={{ paddingTop: "5%" }} container spacing={3}>
          {/* First */}
          <Grid item xs>
            <Paper className={(classes.paper, classes.topCards)}>
              {/* Top part, split into 2 */}
              <Grid container spacing={3}>
                <Grid item xs>
                  <Typography variant="h2">
                    <b>1st</b>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <img
                    src={profileImg}
                    alt="Profile Picture"
                    className={classes.profilePic}
                  />
                  <Typography variant={"body1"}>John Doe</Typography>
                  <Typography variant={"body2"}>Level: 10</Typography>
                  <Line percent="10" strokeWidth="4" strokeColor="#424242" />
                </Grid>
              </Grid>
              {/* bottom part, split into 3 */}
              <Grid style={{ paddingTop: "2%" }} container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs></Grid>
                <Grid item xs>
                  <Typography variant="h3">1040</Typography>
                  <Typography variant="body2">Points Earned</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Second */}
          <Grid item xs>
            <Paper className={(classes.paper, classes.topCards)}>
              {/* Top part, split into 2 */}
              <Grid container spacing={3}>
                <Grid item xs>
                  <Typography variant="h2">
                    <b>2nd</b>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <img
                    src={profileImg}
                    alt="Profile Picture"
                    className={classes.profilePic}
                  />
                  <Typography variant={"body1"}>John Doe</Typography>
                  <Typography variant={"body2"}>Level: 9</Typography>
                  <Line percent="10" strokeWidth="4" strokeColor="#424242" />
                </Grid>
              </Grid>
              {/* bottom part, split into 3 */}
              <Grid style={{ paddingTop: "2%" }} container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs></Grid>
                <Grid item xs>
                  <Typography variant="h3">970</Typography>
                  <Typography variant="body2">Points Earned</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Third */}
          <Grid item xs>
            <Paper className={(classes.paper, classes.topCards)}>
              {/* Top part, split into 2 */}
              <Grid container spacing={3}>
                <Grid item xs>
                  <Typography variant="h2">
                    <b>3rd</b>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <img
                    src={profileImg}
                    alt="Profile Picture"
                    className={classes.profilePic}
                  />
                  <Typography variant={"body1"}>John Doe</Typography>
                  <Typography variant={"body2"}>Level: 9</Typography>
                  <Line percent="10" strokeWidth="4" strokeColor="#424242" />
                </Grid>
              </Grid>
              {/* bottom part, split into 3 */}
              <Grid style={{ paddingTop: "2%" }} container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs></Grid>
                <Grid item xs>
                  <Typography variant="h3">930</Typography>
                  <Typography variant="body2">Points Earned</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>{" "}
        {/* End of Top Grid */}
        {/* 4th */}
        <Container
          style={{ paddingTop: "5%" }}
          className={classes.paddingBottom}
        >
          <Paper className={classes.paperRed}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="h3">
                  <b>4</b>
                </Typography>
              </Grid>
              <Grid item xs>
                <img
                  src={profileImg}
                  alt="Profile Picture"
                  className={classes.profilePic}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body1">Adam Washington</Typography>
                <Typography variant="body2">Level: 9</Typography>
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs>
                <Typography variant="h4">890</Typography>
                <Typography variant="body2">Points Earned</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        {/* 5th */}
        <Container className={classes.paddingBottom}>
          <Paper className={classes.paperPurple}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="h3">
                  <b>5</b>
                </Typography>
              </Grid>
              <Grid item xs>
                <img
                  src={profileImg}
                  alt="Profile Picture"
                  className={classes.profilePic}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body1">Ikea Informatics</Typography>
                <Typography variant="body2">Level: 8</Typography>
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs>
                <Typography variant="h4">810</Typography>
                <Typography variant="body2">Points Earned</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        {/* 6th */}
        <Container className={classes.paddingBottom}>
          <Paper className={classes.paperBlue}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="h3">
                  <b>6</b>
                </Typography>
              </Grid>
              <Grid item xs>
                <img
                  src={profileImg}
                  alt="Profile Picture"
                  className={classes.profilePic}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body1">HanK Hamburger</Typography>
                <Typography variant="body2">Level: 7</Typography>
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs>
                <Typography variant="h4">790</Typography>
                <Typography variant="body2">Points Earned</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        {/* 7th */}
        <Container className={classes.paddingBottom}>
          <Paper className={classes.paperTeal}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="h3">
                  <b>7</b>
                </Typography>
              </Grid>
              <Grid item xs>
                <img
                  src={profileImg}
                  alt="Profile Picture"
                  className={classes.profilePic}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body1">Mary Library</Typography>
                <Typography variant="body2">Level: 7</Typography>
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs>
                <Typography variant="h4">720</Typography>
                <Typography variant="body2">Points Earned</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        {/* 8th */}
        <Container className={classes.paddingBottom}>
          <Paper className={classes.paperRed}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="h3">
                  <b>8</b>
                </Typography>
              </Grid>
              <Grid item xs>
                <img
                  src={profileImg}
                  alt="Profile Picture"
                  className={classes.profilePic}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body1">Yascky Donuts</Typography>
                <Typography variant="body2">Level: 6</Typography>
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs>
                <Typography variant="h4">600</Typography>
                <Typography variant="body2">Points Earned</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Container>
    </div>
  );
}

export default Leaderboard;
