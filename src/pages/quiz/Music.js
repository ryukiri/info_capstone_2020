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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";

import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import NavLink from "@material-ui/core/Link";
import app from "./../../components/firebase/base";
import music1 from "./visualizations/music1.jpg";
import music2 from "./visualizations/music2.jpg";

// essentially the same code as Quiz.js just for music category
class Music extends Component {
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
      isLastQuestion: false,
      link:
        "https://www.tableau.com/about/blog/2019/7/how-visualize-spotify-music-trends-tableau",
      answers: [],
    }; // <- set up react state

    this.handleChange = this.handleChange.bind(this); // to control component
  }

  componentDidMount() {
    /* Create reference to quiz in Firebase Database */
    var level = 1;
    let messagesRef = app.database().ref("quiz/Music/" + level);

    console.log(messagesRef);
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
        this.setState({ answersRef: answers });
      } else {
        console.log("User isn't logined");
      }
    });

    
  }

  // handle change event when user clicks on a different radio
  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      value: event.target.value,
    });
    this.state.answers.concat(event.target.value);
  };

  // handle change when user clicks on next button
  // checks answer and updates score
  // update page with next question
  handleClick = (event) => {
    this.answers = this.state.answers.concat(this.state.value);

    this.setState((state) => {
      let list = this.state.answers.concat(this.state.value);
      this.state.answersRef.child("Music").child(1).set(list);
      return {
        answers: list,
      };
    });
    if (this.state.questionNum == this.state.questionSnapshot.length - 2) {
      this.setState({
        isLastQuestion: true,
      });
    }
    if (this.state.questionNum >= 2) {
      this.setState((state) => ({
        image: music2,
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
        <MuiThemeProvider theme={theme}>
        <ButtonAppBar />
        <header className="header1">
          <Typography
            variant="h3"
            style={{ textAlign: "center", padding: "2%" }}
          >
            Music Quiz
          </Typography>
          <Container maxWidth="md">
            {this.state.questionNum >= 3 ? (
              <Typography variant="body1" style={{ textAlign: "center" }}>
                In the music industry, many artist complain about not making
                enough money on music streaming apps. The following graph shows
                how much these applications pay their artists. Read the
                following graph and answer the questions.
              </Typography>
            ) : (
              <Typography variant="body1" style={{ textAlign: "center" }}>
                Spotify is a streaming service that is popular among younger
                generations. The following graph shows the daily streaming
                information on Spotify. Read the graph carefully and click{" "}
                <NavLink
                  href={this.state.link}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <u>
                    <i>here</i>
                  </u>{" "}
                </NavLink>
                if you need help.
              </Typography>
            )}
          </Container>
        </header>

        <div className="body1">
          <Container maxWidth="md">
            <Card className="card">
              <CardContent>
                <Container maxWidth="md">
                  <img
                    src={this.state.image}
                    alt="visualization"
                    width="100%"
                  />

                  <Typography variant="h6">
                    {
                      this.state.questionSnapshot[this.state.questionNum]
                        .question
                    }
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
                      {this.state.questionSnapshot[
                        this.state.questionNum
                      ].choices.map(function (item, i) {
                        return (
                          <FormControlLabel
                            value={item}
                            control={<Radio />}
                            label={item}
                          />
                        );
                      })}
                    </RadioGroup>

                    {this.state.isLastQuestion ? (
                      <Button
                        variant="contained"
                        style={{ margin: "10px" }}
                        color="secondary"
                        onClick={(event) => {
                          this.state.answersRef
                            .child("Music")
                            .child(1)
                            .set(this.state.answers.concat(this.state.value));
                        }}
                      >
                        <Link
                          to={{
                            pathname: "/MusicComplete",
                          }}
                          style={{ color: "white" }}
                          className="noDecorations"
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
                        color="secondary"
                      >
                        Next
                      </Button>
                    )}
                  </FormControl>
                </Container>
              </CardContent>
            </Card>
          </Container>
        </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Music;
