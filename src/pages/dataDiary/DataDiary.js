import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import app from "./../../components/firebase/base";

import "./DataDiary.css";

var q1 = 0;
var q2 = 0;
var q3 = 0;
var q4 = 0;
var q5 = 0;
var date = 0;
var currentUser = "";

// Diary Questions from DB
var questionsArray = []

function getCurrentUser() {
  var user = app.auth().currentUser;

  if (user) {
    //console.log(user.uid)
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
      isLoading: false,
      interests: [],
      interests1: [],
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

        let ref = app
          .database()
          .ref("users/" + this.getCurrentUser() + "/interests");

        ref.on("child_added", (snapshot) => {
          this.setState({
            interests: this.state.interests.concat(snapshot.val()),
          });
        });

        let ref1 = app.database().ref("interests/");

        let set = new Set();

        // Retrieve new posts as they are added to our database
        ref1.on("child_added", (snapshot) => {
          //console.log(snapshot.val())
          if (this.state.interests.includes(snapshot.key)) {
            //interests.push(snapshot.val());
            set.add(snapshot.val());
            this.setState({
              interests1: Array.from(set),
            });
          }
        });

        // Read questions from db
        let questionsRef = app.database().ref("users/" + getCurrentUser() + "/diaryQuestions")
        questionsRef.once("value", (snapshot) => {
          snapshot.forEach(function (item) {
            var itemVal = item.val();
            if (!questionsArray.includes(itemVal)) {
              questionsArray.push(itemVal);
            }
          });
          this.setState({
            isLoading: true
         });
        });

        /*let ref = app.database().ref("interests/");

        // Retrieve new posts as they are added to our database
        ref.on("child_added", snapshot => {
          console.log(snapshot.key)
          if (this.state.interests.includes(snapshot.key)) {
            interests.push(snapshot.val());
          }
        });*/

        /*for (var i = 0; i < 5; i++) {
          var remainder = i % interests.length;
    
          let ref = app
            .database()
            .ref(
              "diaryQuestions/" +
                interests[remainder === 0 ? interests.length - 1 : remainder - 1]
            );
          ref.on("child_added", snapshot => {
            var rand = Math.floor(Math.random() * 5) + 1;
            var questionNumber = "q" + rand;
            if (questionNumber == snapshot.key) {
              questions.push(snapshot.val());
              this.state.questions = questions;
              console.log(this.state.questions);
            }
          });
        }*/
      },
      (error) => {
        this.setState({ isAuthenticating: false });
        alert(error);
      }
    );
  }

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

  onSubmit() {
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
    if (this.state.isAuthenticating) return null;

    return (
      this.state.isLoading && 
      <div>
        <ButtonAppBar />
        {this.getDateAndCheckIfDone()}
        <header className="diaryHeader">
          <Typography variant="h3" className="center title">
            Your Personalized Data Diary
          </Typography>
        </header>

        <div className="questions">
          <Container maxWidth="md">
            <Card>
              <CardContent>
                <Container maxWidth="md">
                  {!this.getDateAndCheckIfDone() && (
                    <Typography variant="h4">Please fill this out!</Typography>
                  )}
                  {this.getDateAndCheckIfDone() && (
                    <Typography variant="h4">
                      You already took filled it out today. Filling it out again
                      will overwrite previous responses.
                    </Typography>
                  )}

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
                        <FormControlLabel
                          value="5"
                          control={<Radio color="primary" />}
                          label="5"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="6"
                          control={<Radio color="primary" />}
                          label="6"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="7"
                          control={<Radio color="primary" />}
                          label="7"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="8"
                          control={<Radio color="primary" />}
                          label="8"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="9"
                          control={<Radio color="primary" />}
                          label="9"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="10"
                          control={<Radio color="primary" />}
                          label="10"
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
                    <Button variant="contained" onClick={this.onSubmit}>
                      <Link to="/overview" className="noDecorations">
                        Submit
                      </Link>
                    </Button>
                  )}
                  {this.getDateAndCheckIfDone() && (
                    <Button variant="contained" onClick={this.onSubmitRemove}>
                      <Link to="/overview" className="noDecorations">
                        Submit
                      </Link>
                    </Button>
                  )}
                </Container>
              </CardContent>
            </Card>
          </Container>
        </div>
      </div>
    );
  }
}

export default DataDiary;
