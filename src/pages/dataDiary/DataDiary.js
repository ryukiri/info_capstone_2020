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

var banana = 0;
var sleep = 0;
var date = 0;

class DataDiary extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }

  componentDidMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = app
      .database()
      .ref("diary")
      .orderByKey()
      .limitToLast(100);

    /* Update React state when message is added at Firebase Database */
    messagesRef.on("child_added", snapshot => {
      let diary = {
        banana: snapshot.val().banana,
        sleep: snapshot.val().sleep,
        date: snapshot.key
      };
      this.setState({ messages: [diary].concat(this.state.messages) });
    });
  }

  getDateAndCheckIfDone() {
    let today = this.getCurrentDate();
    var pastDates = [];
    this.state.messages.map(message => pastDates.push(message.date));

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
    console.log(date);
    return currDate;
  }

  handleChangeBanana = event => {
    banana = event.target.value;
  };

  handleChangeSleep = event => {
    sleep = event.target.value;
  };

  onSubmit() {
    var diaryRef = app.database().ref("diary");
    diaryRef.child(date).set({
      banana: banana,
      sleep: sleep
    });
  }

  // Method for resubmission
  onSubmitRemove() {
    var diaryRef = app.database().ref("diary");

    let deleteRef = app.database().ref("diary/" + date);
    deleteRef.remove()

    diaryRef.child(date).set({
      banana: banana,
      sleep: sleep
    });
  }

  render() {
    return (
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
                        1. How many bananas did you eat today?
                      </Typography>
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        className="centerRadio"
                        onChange={this.handleChangeBanana}
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
                        2. How many hours of sleep did you get last night?
                      </Typography>
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        className="centerRadio"
                        onChange={this.handleChangeSleep}
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
                        3. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ut quam quam, pretium non augue in, aliq?
                      </Typography>
                      <TextField fullWidth id="standard-basic" label="" />
                    </div>
                    <div className="form">
                      <Typography variant="h6">
                        4. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ut quam quam, pretium non augue in, aliq?
                      </Typography>
                      <TextField fullWidth id="standard-basic" label="" />
                    </div>
                    <div className="form">
                      <Typography variant="h6">
                        5. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ut quam quam, pretium non augue in, aliq?
                      </Typography>
                      <TextField fullWidth id="standard-basic" label="" />
                    </div>
                  </form>

                  {!this.getDateAndCheckIfDone() && (
                    <Button variant="contained" onClick={this.onSubmit}>
                      <Link to="/summary" className="noDecorations">
                        Submit
                      </Link>
                    </Button>
                  )}
                  {this.getDateAndCheckIfDone() && (
                    <Button variant="contained" onClick={this.onSubmitRemove}>
                      <Link to="/summary" className="noDecorations">
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
