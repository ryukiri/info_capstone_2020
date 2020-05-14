import "./Leaderboard.css";

import { Container, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Line } from "rc-progress";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import app from "./../../components/firebase/base";
import profileImg from "../../assets/images/account.png";

var uIDs = []; // All user IDs
var uNames = []; // All user names
var uPoints = []; // All user points

/**
 * Sort object properties (only own properties will be sorted).
 * @param {object} obj object to sort properties
 * @param {bool} isNumericSort true - sort object properties as numeric value, false - sort as string value.
 * @returns {Array} array of items in [[key,value],[key,value],...] format.
 */
function sortProperties(obj, isNumericSort) {
  isNumericSort = isNumericSort || false; // by default text sort
  var sortable = [];
  for (var key in obj)
    if (obj.hasOwnProperty(key)) sortable.push([key, obj[key]]);
  if (isNumericSort)
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
  else
    sortable.sort(function (a, b) {
      var x = a[1].toLowerCase(),
        y = b[1].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isAuthenticating: true,
      map: [],
    }; // <- set up react state

    this.getUsersFromDB = this.getUsersFromDB.bind(this);
  }

  componentDidMount() {
    this.authUser().then(
      (user) => {
        this.getUsersFromDB();
      },
      (error) => {
        this.setState({ isAuthenticating: false });
        alert(error);
      }
    );
  }

  // Returns whether or not user is logged in
  authUser() {
    return new Promise(function (resolve, reject) {
      app.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject("User not logged in");
        }
      });
    });
  }

  getUsersFromDB() {
    let ref = app.database().ref("users/");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on(
      "value",
      function (snapshot) {
        // Add all user IDs into uIDs array
        snapshot.forEach(function (item) {
          if (!uIDs.includes(item.key)) {
            uIDs.push(item.key);
          }
        });

        // Loop through uIDs array and find full names of each user. Add them to uNames array
        for (var i = 0; i < uIDs.length; i++) {
          var userNameRef = app.database().ref("users/" + uIDs[i]);
          userNameRef.on(
            "value",
            function (snap) {
              snap.forEach(function (item) {
                // Look for name child
                if (item.key == "full_name") {
                  if (!uNames.includes(item.val())) {
                    uNames.push(item.val());
                  }
                }

                // Look for points child
                if (item.key == "points") {
                  uPoints.push(item.val());
                }
              });

              // Convert to map
              var myMap = uNames.reduce(function (obj, key, index) {
                obj[key] = uPoints[index];
                return obj;
              }, {});

              // Sort map based on values descending
              this.state.map = sortProperties(myMap, true);
              console.log(this.state.map);

              if (this.state.map.length == uIDs.length) {
                this.setState({
                  isLoading: true,
                });
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }

  render() {
    return (
      this.state.isLoading && (
        <div>
          <ButtonAppBar />
          <Container className="container">
            <Typography variant="h3" style={{ display: "inline-block" }}>
              Leaderboard{" "}
            </Typography>
            <Grid style={{ paddingTop: "5%" }} container spacing={3}>
              {/* First */}
              <Grid item xs>
                <Paper className="topCards">
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
                        className="profilePic"
                      />
                      <Typography variant={"body1"}>
                        {this.state.map[0][0]}
                      </Typography>
                      <Typography variant={"body2"}>
                        Level: {Math.floor(this.state.map[0][1] / 100)}
                      </Typography>
                      <Line
                        percent={this.state.map[0][1] % 100}
                        strokeWidth="4"
                        strokeColor="#424242"
                      />
                    </Grid>
                  </Grid>
                  {/* bottom part, split into 3 */}
                  <Grid style={{ paddingTop: "2%" }} container spacing={3}>
                    <Grid item xs></Grid>
                    <Grid item xs></Grid>
                    <Grid item xs>
                      <Typography variant="h3">
                        {this.state.map[0][1]}
                      </Typography>
                      <Typography variant="body2">Points Earned</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Second */}
              <Grid item xs>
                <Paper className="topCards">
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
                        className="profilePic"
                      />
                      <Typography variant={"body1"}>
                        {this.state.map[1][0]}
                      </Typography>
                      <Typography variant={"body2"}>
                        Level: {Math.floor(this.state.map[1][1] / 100)}
                      </Typography>
                      <Line
                        percent={this.state.map[1][1] % 100}
                        strokeWidth="4"
                        strokeColor="#424242"
                      />
                    </Grid>
                  </Grid>
                  {/* bottom part, split into 3 */}
                  <Grid style={{ paddingTop: "2%" }} container spacing={3}>
                    <Grid item xs></Grid>
                    <Grid item xs></Grid>
                    <Grid item xs>
                      <Typography variant="h3">
                        {this.state.map[1][1]}
                      </Typography>
                      <Typography variant="body2">Points Earned</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Third */}
              <Grid item xs>
                <Paper className="topCards">
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
                        className="profilePic"
                      />
                      <Typography variant={"body1"}>
                        {this.state.map[2][0]}
                      </Typography>
                      <Typography variant={"body2"}>
                        Level: {Math.floor(this.state.map[2][1] / 100)}
                      </Typography>
                      <Line
                        percent={this.state.map[2][1] % 100}
                        strokeWidth="4"
                        strokeColor="#424242"
                      />
                    </Grid>
                  </Grid>
                  {/* bottom part, split into 3 */}
                  <Grid style={{ paddingTop: "2%" }} container spacing={3}>
                    <Grid item xs></Grid>
                    <Grid item xs></Grid>
                    <Grid item xs>
                      <Typography variant="h3">
                        {this.state.map[2][1]}
                      </Typography>
                      <Typography variant="body2">Points Earned</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>{" "}
            {/* End of Top Grid */}
            {/* 4th */}
            <Container style={{ paddingTop: "5%" }} className="paddingBottom">
              <Paper className="paperRed">
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography variant="h3" style={{ color: "white" }}>
                      <b>4</b>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <img
                      src={profileImg}
                      alt="Profile Picture"
                      className="profilePic"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" style={{ color: "white" }}>
                      {this.state.map[3][0]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Level: {Math.floor(this.state.map[3][1] / 100)}
                    </Typography>
                  </Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs>
                    <Typography variant="h4" style={{ color: "white" }}>
                      {this.state.map[3][1]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Points Earned
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
            {/* 5th */}
            <Container className="paddingBottom">
              <Paper className="paperPurple">
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography variant="h3" style={{ color: "white" }}>
                      <b>5</b>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <img
                      src={profileImg}
                      alt="Profile Picture"
                      className="profilePic"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" style={{ color: "white" }}>
                      {this.state.map[4][0]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Level: {Math.floor(this.state.map[4][1] / 100)}
                    </Typography>
                  </Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs>
                    <Typography variant="h4" style={{ color: "white" }}>
                      {this.state.map[4][1]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Points Earned
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
            {/* 6th */}
            <Container className="paddingBottom">
              <Paper className="paperBlue">
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography variant="h3" style={{ color: "white" }}>
                      <b>6</b>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <img
                      src={profileImg}
                      alt="Profile Picture"
                      className="profilePic"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" style={{ color: "white" }}>
                      {this.state.map[5][0]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Level: {Math.floor(this.state.map[5][1] / 100)}
                    </Typography>
                  </Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs>
                    <Typography variant="h4" style={{ color: "white" }}>
                      {this.state.map[5][1]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Points Earned
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
            {/* 7th */}
            <Container className="paddingBottom">
              <Paper className="paperTeal">
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography variant="h3" style={{ color: "white" }}>
                      <b>7</b>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <img
                      src={profileImg}
                      alt="Profile Picture"
                      className="profilePic"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" style={{ color: "white" }}>
                      {this.state.map[6][0]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Level: {Math.floor(this.state.map[6][1] / 100)}
                    </Typography>
                  </Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs>
                    <Typography variant="h4" style={{ color: "white" }}>
                      {this.state.map[6][1]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Points Earned
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
            {/* 8th */}
            <Container className="paddingBottom">
              <Paper className="paperRed">
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography variant="h3" style={{ color: "white" }}>
                      <b>8</b>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <img
                      src={profileImg}
                      alt="Profile Picture"
                      className="profilePic"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" style={{ color: "white" }}>
                      {this.state.map[7][0]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Level: {Math.floor(this.state.map[7][1] / 100)}
                    </Typography>
                  </Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs></Grid>
                  <Grid item xs>
                    <Typography variant="h4" style={{ color: "white" }}>
                      {this.state.map[7][1]}
                    </Typography>
                    <Typography variant="body2" style={{ color: "white" }}>
                      Points Earned
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Container>
        </div>
      )
    );
  }
}

export default Leaderboard;
