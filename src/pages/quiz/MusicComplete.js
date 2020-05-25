import "./Quiz.css";

import {
  Button,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core/";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";

import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import app from "./../../components/firebase/base";
import { makeStyles } from "@material-ui/core/styles";
import music1 from "./visualizations/music1.jpg";
import music2 from "./visualizations/music2.jpg";

// essentially the same code as QuizComplete.js just for music category
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: theme.spacing(4),
  },
  formTitle: {
    fontSize: "17pt",
    fontWeight: "bold",
  },
  expansion: {
    maxWidth: "50%",
    margin: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  body: {
    margin: "auto",
    padding: theme.spacing(1),
  },
  img: {
    margin: "10px",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D2FDFF",
    },
    secondary: {
      main: "#303C6C",
    },
  },
});

class QuizComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 1,
      value: "",
      disabled: true,
      questionSnapshot: undefined,
      answersRef: undefined,
      uID: undefined,
      image: music1,
    }; // <- set up react state
    this.printQuestions = this.printQuestions.bind(this);
  }

  componentDidMount() {
    var level = 1;
    /* Create reference to quiz in Firebase Database */

    let messagesRef = app.database().ref("quiz/Music/" + level);

    messagesRef.on("value", (snapshot) => {
      this.setState({ questionSnapshot: snapshot.val() });
    });
    var user = app.auth().currentUser;
   
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User logined");
        this.setState({
          uID: user.uid,
        });
        let answers = app.database().ref("quizAnswers/" + user.uid);
        answers = answers.child("Music").child(level);
        answers.on("value", (snapshot) => {
          this.setState({ answersRef: snapshot.val() });
        });
        let pointsRef = app.database().ref("users/" + user.uid + "/points");
        let levelRef = app.database().ref("users/" + user.uid + "/level");
        pointsRef.once("value").then((snapshot) => {
          pointsRef.set(snapshot.val() + 50);
          levelRef.set(Math.floor((parseInt(snapshot.val()) + 50) / 100));
        });
      } else {
        console.log("User isn't logined");
      }
    });
  }

  printQuestions() {
    return this.state.questionSnapshot.map((item, i) => {
      if (item.choices != undefined) {
        let answers = [];
        item.choices.forEach((choice) => {
          if (choice === item.answer) {
            answers.push(
              <FormControlLabel
                value="disabled"
                control={<Radio style={{ color: "green" }} />}
                label={choice}
                checked
              />
            );
          } else {
            answers.push(
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio s />}
                label={choice}
              />
            );
          }
        });
        return (
          <div>
            {i >= 3 ? (
              <img src={music2} width="100%"></img>
            ) : (
              <img src={music1} width="100%"></img>
            )}
            <Typography variant="h5">{item.question}</Typography>
            <FormControl component="fieldset">{answers}</FormControl>
            <Typography variant="h6">You chose:</Typography>
            {this.state.answersRef[i - 1] === item.answer ? (
              <FormControlLabel
                value="disabled"
                control={<Radio style={{ color: "green" }} />}
                label={this.state.answersRef[i - 1]}
                color="primary"
                checked
              />
            ) : (
              <React.Fragment>
                <FormControlLabel
                  value="disabled"
                  control={<Radio style={{ color: "red" }} />}
                  label={this.state.answersRef[i - 1]}
                  color="primary"
                  checked
                />
                <ExpansionPanel
                  defaultExpanded
                  style={{ marginBottom: "100px" }}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Explanation</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>{item.explanation}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </React.Fragment>
            )}
          </div>
        );
      }
    });
  }

  render() {
    if (
      this.state.uID === undefined ||
      this.state.questionSnapshot === undefined ||
      this.state.answersRef === undefined
    ) {
      return (
        <div>
          <ButtonAppBar />
          <Container maxWidth="md">
            <h3>Loading...</h3>
          </Container>
        </div>
      );
    }
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <ButtonAppBar />
          <header className="header1">
            <Typography
              variant="h3"
              style={{ textAlign: "center", padding: "2%" }}
            >
              Quiz Completed
            </Typography>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              You earned 50 points for completing a quiz
            </Typography>
          </header>
          <div className="body1">
            <Container maxWidth="lg">
              <Card className="card">
                <CardContent>
                  <Container maxWidth="md">
                    <div>
                      {this.printQuestions()}
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                      >
                        <Link
                          to={{
                            pathname: "/quizCategory",
                          }}
                          className="noDecorations"
                          style={{ color: "white" }}
                        >
                          Take Another Quiz
                        </Link>
                      </Button>
                    </div>
                  </Container>
                </CardContent>
              </Card>
            </Container>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default QuizComplete;
