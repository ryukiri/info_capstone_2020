import "./Quiz.css";

import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core/";
import React, { Component } from "react";

import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import { Link } from "react-router-dom";
import NavLink from "@material-ui/core/Link";
import app from "./../../components/firebase/base";
import { makeStyles } from "@material-ui/core/styles";
import sport1 from "./visualizations/sports1.jpg";
import sport2 from "./visualizations/sports2.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: theme.spacing(4),
  },
  formTitle: {
    fontSize: "17pt",
    fontWeight: "bold",
  },
  button: {
    margin: "5px",
  },
}));

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 1,
      value: "",
      score: 0,
      disabled: true,
      questionSnapshot: undefined,
      answersRef: undefined,
      uID: undefined,
      image: sport1,
      isLastQuestion: false,
      link:
        "https://www.slideteam.net/blog/tweak-it-to-work-it-10-golden-rules-for-data-visualization",
      answers: [],
    }; // <- set up react state
    this.handleChange = this.handleChange.bind(this); // to control component
  }

  componentDidMount() {
    var level = 1;
    /* Create reference to quiz in Firebase Database */

    let messagesRef = app.database().ref("quiz/Sports/" + level);

    //  messagesRef.child("Sports").child.set(1);
    // console.log(messagesRef.child("level").set(1))

    // let answers = app.database().ref("quizAnswers/" + undefined.id)

    messagesRef.on("value", (snapshot) => {
      this.setState({ questionSnapshot: snapshot.val() });
    });
    var user = app.auth().currentUser;
    // var test = app.database().ref("quizAnswers/" + getCurrentUser());
    // console.log(test)
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User logined");
        this.setState({
          uID: user.uid,
        });
        let answers = app.database().ref("quizAnswers/" + user.uid);
        // answers.child("Sports").child(level)
        this.setState({ answersRef: answers });
      } else {
        console.log("User isn't logined");
      }
    });
    // app.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     console.log(user.uid)
    //     this.setState({uID: use})
    //     // User is signed in.
    //   } else {
    //     // No user is signed in.
    //   }
    // });
    // if (user) {
    //     this.setState({uID: user.uid})
    //     let answers = app.database().ref("quizAnswers/" + user.uid)
    //         console.log(answers)
    //         this.setState({answersRef: answers})
    // } else {

    // }
    // app.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     this.setState({uID: user.uid})
    //     let answers = app.database().ref("quizAnswers/" + user.uid)
    //     console.log(answers)
    //     this.setState({answersRef: answers})
    //     console.log(this.state.answersRef)
    //     // User is signed in.
    //   } else {
    //     // No user is signed in.
    //   }
    // });

    // if (user) {
    //
    //   answers.push("sports1")
    // }
    // if (user !== null) {
    //   this.setState({uID: user.uid})
    //   let answers = app.database().ref("quizAnswers/" + user.uid)
    //   this.setState({answersRef: answers})
    // } else {
    //   // No user is signed in.
    // }

    // const newRef = app.database().ref("quiz/Sports/" + 2);
    // console.log(newRef)

    // // inputing questions into DB
    // const q1 = {
    //   question: "What is missing in the graph to help you understand it?",
    //   choices: ["Title", "Legend", "X Axis", "Y Axis"],
    //   answer: "X Axis",
    //    explanation: "If you take a look at the graph, the title is Sports. Next to the title is the legend, which shows which color corresponds to which sport. Next to the Y axis is the label, Championships. Below the X axis, there is no label. You have no way of knowing what the numbers 0-50 represent with the missing label. "
    // }
    // newRef.child(1).set(q1);

    // const q2 = {
    //   question: "Given that the x axis should be the number of years a team has played, what kind of sport had a team that got 22 championships with a 10-year experience of playing?",
    //   choices: ["Basketball", "Baseball", "Football", "Hockey"],
    //   answer: "Baseball",
    //    explanation: "Given that the x axis should be the number of years a team has played, you would go over to the 10 column on the x axis. Next for 22 championships, you would go up to 22 on the y axis. There you will find a turquoise blue circle. If you look over at the legend, the turquoise blue represents baseball. Thus the answer is baseball."
    // }
    // newRef.child(2).set(q2);

    // const q3 = {
    //   question: "Read the legend on the bottom right carefully, then use the information from the legend to read the visualizations, what kind of opponent gives Miami Heat better performance?",
    //   choices: ["Good Defense Team", "Bad Defense Team"],
    //   answer: "Bad Defense Team",
    //    explanation: "If you look at the legend, lines in the red would mean a higher shot expected value. Comparing the two graphs between the good defense team and the bad defense team, Miami Heat tends to have more red lines against the bad defense team."
    // }
    // newRef.child(3).set(q3);
    // const q4 = {
    //   question: "How many 1-2 shots did Miami Heat shoot when facing Good Defense Team?",
    //   choices: ["691", "472", "304", "747"],
    //   answer: "304",
    //    explanation: "Looking at the box in the bottom middle, you would go to where it says 1-2 shots in the top label. Next you would go down to the first row where it says good defense team. The basketball there has the number 304, representing the number of shots Miami Heat shot when facing good defense teams."
    // }
    // newRef.child(4).set(q4);
  }

  // handle change event when user clicks on a different radio
  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      value: event.target.value,
    });
    this.state.answers.concat(event.target.value);
    // this.state.answersRef.child(this.state.questionNum).set(this.state.answers)
    // this.state.answersRef.child(this.state.questionNum).set(event.target.value)
  };

  // handle change when user clicks on next button
  // checks answer and updates score
  // update page with next question
  handleClick = (event) => {
    this.answers = this.state.answers.concat(this.state.value);

    this.setState((state) => {
      let list = this.state.answers.concat(this.state.value);
      this.state.answersRef.child("Sports").child(1).set(list);
      return {
        answers: list,
      };
    });
    if (this.state.questionNum == this.state.questionSnapshot.length - 2) {
      this.setState({
        isLastQuestion: true,
      });
    }
    if (this.state.questionNum >= 1) {
      this.setState((state) => ({
        image: sport2,
        link:
          "http://www.visualeverything.co.uk/weve-been-checking-out-the-wonderful-work-coming/",
      }));
    }
    this.setState((state) => {
      return {
        questionNum: this.state.questionNum + 1,
        value: "",
      };
    });
  };

  render() {
    if (
      this.state.uID === undefined ||
      this.state.questionSnapshot === undefined
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
      <div>
        <ButtonAppBar />
        <Container maxWidth="md">
          <Typography variant="h3" style={{ padding: "15px" }}>
            Sports Quiz
          </Typography>
          {this.state.questionNum >= 3 ? (
            <Typography variant="h6">
              The following data visualization rev iews the performance of the
              basketball team Miami Heat when encountering good defense team
              versus bad defense team. Read the graph carefully and click{" "}
              <NavLink href={this.state.link}>here </NavLink> if you need more
              help.
            </Typography>
          ) : (
            <Typography variant="h6">
              The following graph shows the relationship between the number of
              championships each team have won and the years they have been
              competing. Please reach the graph carefully and click{" "}
              <NavLink href={this.state.link}>here </NavLink>if you need help.
            </Typography>
          )}

          <img src={this.state.image} alt="visualization" height="400px" />
          <Typography variant="h6">
            {this.state.questionSnapshot[this.state.questionNum].question}
          </Typography>

          <FormControl component="fieldset">
            {/* <FormLabel component="legend" >{quiz[this.state.questionNum - 1].question} of {quiz.length}</FormLabel> */}

            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {/* map out answer options */}
              {this.state.questionSnapshot[this.state.questionNum].choices.map(
                function (item, i) {
                  return (
                    <FormControlLabel
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  );
                }
              )}
            </RadioGroup>

            {this.state.isLastQuestion ? (
              <Button
                variant="contained"
                style={{ margin: "10px" }}
                onClick={(event) => {
                  this.state.answersRef
                    .child("Sports")
                    .child(1)
                    .set(this.state.answers.concat(this.state.value));
                }}
              >
                <Link
                  to={{
                    pathname: "/quizComplete",
                  }}
                >
                  Submit
                </Link>
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ margin: "10px" }}
                onClick={this.handleClick}
                disabled={!this.state.value}
              >
                Next
              </Button>
            )}
          </FormControl>
        </Container>
      </div>
    );
  }
}

export default Quiz;
