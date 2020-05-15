import "./DataDiary.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import app from "./../../components/firebase/base";

var q1 = 0;
var q2 = 0;
var q3 = 0;
var q4 = 0;
var q5 = 0;
var date = 0;
var currentUser = "";

// Diary Questions from DB
var questionsArray = [];

// Return current user ID of current user
function getCurrentUser() {
  var user = app.auth().currentUser;

  if (user) {
    return user.uid;
  } else {
    // No user is signed in.
  }
}

class DataDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isAuthenticating: true,
      isLoading: false, // Flag turns true when everything is done reading from Firebase
      interests: [],
      questions: [],
    }; // <- set up react state
  }

  componentDidMount() {
    this.authUser().then(
      (user) => {
        this.setState({ isAuthenticating: false });
        console.log("USER " + this.getCurrentUser());
        currentUser = this.getCurrentUser();

        /* Create reference to messages in Firebase Database */
        let diaryRef = app
          .database()
          .ref("diaryEntries/" + this.getCurrentUser())
          .orderByKey()
          .limitToLast(100);

        /* Update React state when message is added at Firebase Database */
        diaryRef.on("child_added", (snapshot) => {
          let diary = {
            q1: snapshot.val().q1,
            q2: snapshot.val().q2,
            q3: snapshot.val().q3,
            q4: snapshot.val().q4,
            q5: snapshot.val().q5,
            date: snapshot.key,
          };
          this.setState({ messages: [diary].concat(this.state.messages) });
        });

        // Ref to see current user's interests
        let ref = app
          .database()
          .ref("users/" + this.getCurrentUser() + "/interests");

        ref.on("child_added", (snapshot) => {
          this.setState({
            interests: this.state.interests.concat(snapshot.val()),
          });
        });

        // Read questions from db
        let questionsRef = app
          .database()
          .ref("users/" + getCurrentUser() + "/diaryQuestions");
        questionsRef.once("value", (snapshot) => {
          snapshot.forEach(function (item) {
            var itemVal = item.val();
            if (!questionsArray.includes(itemVal)) {
              questionsArray.push(itemVal);
            }
          });
          this.setState({
            isLoading: true,
          });
        });
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

  // Check if user already completed a diary entry for today
  getDateAndCheckIfDone() {
    let today = this.getCurrentDate();
    var pastDates = [];
    this.state.messages.map((message) => pastDates.push(message.date));

    if (pastDates.includes(today)) {
      return true;
    } else {
      return false;
    }
  }

  // Return current date
  getCurrentDate() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var year = today.getFullYear();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    var currDate = month + "" + day + "" + year;

    date = currDate;
    return currDate;
  }

  // Returns UID of current user
  getCurrentUser() {
    var user = app.auth().currentUser;

    if (user) {
      return user.uid;
    } else {
      // No user is signed in.
    }
  }

  handleChangeQ1 = (event) => {
    q1 = event.target.value;
  };

  handleChangeQ2 = (event) => {
    q2 = event.target.value;
  };

  handleChangeQ3 = (event) => {
    q3 = event.target.value;
  };

  handleChangeQ4 = (event) => {
    q4 = event.target.value;
  };

  handleChangeQ5 = (event) => {
    q5 = event.target.value;
  };

  // Method for submission
  onSubmit() {
    let pointsRef = app.database().ref("users/" + currentUser + "/points");
    let levelRef = app.database().ref("users/" + currentUser + "/level");

    pointsRef.once("value").then((snapshot) => {
      pointsRef.set(parseInt(snapshot.val()) + 20);
      levelRef.set(Math.floor((parseInt(snapshot.val()) + 20) / 100));
    });

    var diaryRef = app.database().ref("diaryEntries/" + currentUser + "/");
    diaryRef.child(date).set({
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
    });
  }

  // Method for resubmission
  onSubmitRemove() {
    var diaryRef = app.database().ref("diaryEntries/" + currentUser + "/");

    let deleteRef = app
      .database()
      .ref("diaryEntries/" + currentUser + "/" + date);
    deleteRef.remove();

    diaryRef.child(date).set({
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
    });
  }

  getInterests() {
    var interests = [];
    let ref = app.database().ref("interests/");

    // Retrieve new posts as they are added to our database
    ref.on("child_added", (snapshot) => {
      if (this.state.interests.includes(snapshot.key)) {
        interests.push(snapshot.val());
      }
    });

    return interests;
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#303C6C",
        },
        secondary: {
          main: "#303C6C",
        },
      },
    });

    if (this.state.isAuthenticating) return null;

    return (
      this.state.isLoading && (
        <div>
          <MuiThemeProvider theme={theme}>
            <ButtonAppBar />
            {this.getDateAndCheckIfDone()}
            <header className="header">
              <Typography variant="h3" style={{ textAlign: "center" }}>
                Your Personalized Data Diary
              </Typography>
              <Typography variant="body1" style={{ textAlign: "center" }}>
                Earn 20 points for the first diary you input each day!
              </Typography>
              {!this.getDateAndCheckIfDone() && (
                <Typography variant="body2" style={{ textAlign: "center" }}>
                  <i>Note: You have not filled it out today.</i>
                </Typography>
              )}
              {this.getDateAndCheckIfDone() && (
                <Typography variant="body2" style={{ textAlign: "center" }}>
                  <i>Note: You already took filled it out today. Filling it out
                  again will overwrite previous responses.</i>
                </Typography>
              )}
            </header>

            <div className="body2">
              <Container maxWidth="md">
                <Card>
                  <CardContent>
                    <Container maxWidth="md">
                      <form noValidate autoComplete="off" className="form">
                        <div className="form">
                          <Typography variant="h6">
                            1. {questionsArray[0]}
                          </Typography>
                          <RadioGroup
                            aria-label="position"
                            name="position"
                            className="centerRadio"
                            onChange={this.handleChangeQ1}
                            row
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="1"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio color="primary" />}
                              label="2"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio color="primary" />}
                              label="3"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio color="primary" />}
                              label="4"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </div>
                        <div className="form">
                          <Typography variant="h6">
                            2. {questionsArray[1]}
                          </Typography>
                          <RadioGroup
                            aria-label="position"
                            name="position"
                            className="centerRadio"
                            onChange={this.handleChangeQ2}
                            row
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="1"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio color="primary" />}
                              label="2"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio color="primary" />}
                              label="3"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio color="primary" />}
                              label="4"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </div>
                        <div className="form">
                          <Typography variant="h6">
                            3. {questionsArray[2]}
                          </Typography>
                          <RadioGroup
                            aria-label="position"
                            name="position"
                            className="centerRadio"
                            onChange={this.handleChangeQ3}
                            row
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="1"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio color="primary" />}
                              label="2"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio color="primary" />}
                              label="3"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio color="primary" />}
                              label="4"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </div>
                        <div className="form">
                          <Typography variant="h6">
                            4. {questionsArray[3]}
                          </Typography>
                          <RadioGroup
                            aria-label="position"
                            name="position"
                            className="centerRadio"
                            onChange={this.handleChangeQ4}
                            row
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="1"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio color="primary" />}
                              label="2"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio color="primary" />}
                              label="3"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio color="primary" />}
                              label="4"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </div>
                        <div className="form">
                          <Typography variant="h6">
                            5. {questionsArray[4]}
                          </Typography>
                          <RadioGroup
                            aria-label="position"
                            name="position"
                            className="centerRadio"
                            onChange={this.handleChangeQ5}
                            row
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio color="primary" />}
                              label="1"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio color="primary" />}
                              label="2"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio color="primary" />}
                              label="3"
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio color="primary" />}
                              label="4"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </div>
                      </form>

                      {!this.getDateAndCheckIfDone() && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={this.onSubmit}
                        >
                          <Link
                            to="/overview"
                            style={{ color: "white" }}
                            className="noDecorations"
                          >
                            Submit
                          </Link>
                        </Button>
                      )}
                      {this.getDateAndCheckIfDone() && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={this.onSubmitRemove}
                        >
                          <Link
                            to="/overview"
                            style={{ color: "white" }}
                            className="noDecorations"
                          >
                            Submit
                          </Link>
                        </Button>
                      )}
                    </Container>
                  </CardContent>
                </Card>
              </Container>
            </div>
          </MuiThemeProvider>
        </div>
      )
    );
  }
}

export default DataDiary;
