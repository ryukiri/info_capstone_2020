import React, { Component } from "react";
import * as $ from "jquery";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import hash from "./../signup/hash";
import GroupGraphList from "../../components/GroupGraphList/GroupGraphList";

import "./Overview.css";

import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from "./../../components/spotify/config";
import TopArtist from "./../signup/TopArtist";
import Summary from "../summary/Summary";
import app from "../../components/firebase/base";

function getUserEmail() {
  var user = app.auth().currentUser;

  if (user) {
    //console.log(user.uid)
    return user.email;
  } else {
    // No user is signed in.
  }
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

var user_interests = [];
var all_potential_questions = [];
var random_5_questions = [];

function generateQuestions() {
  console.log(user_interests);
  // Food Questions
  var burgersArray = [];
  var cakeArray = [];
  var coffeeArray = [];
  var riceArray = [];

  // Movie Questions
  var avengersArray = [];
  var spidermanArray = [];
  var starwarsArray = [];
  var twilightArray = [];

  // Music Questions
  var popArray = [];
  var rapArray = [];
  var countryArray = [];
  var edmArray = [];

  // Sports Questions
  var baseballArray = [];
  var basketballArray = [];
  var footballArray = [];
  var rowingArray = [];
  var runningArray = [];
  var soccerArray = [];
  var swimmingArray = [];
  var tennisArray = [];

  // Burgers
  let burgersRef = app.database().ref("diaryQuestions/Food/Burgers");
  burgersRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!burgersArray.includes(itemVal)) {
        burgersArray.push(itemVal);
      }
    });
    //console.log(burgersArray)
  });

  // Cake
  let cakeRef = app.database().ref("diaryQuestions/Food/Cake");
  cakeRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!cakeArray.includes(itemVal)) {
        cakeArray.push(itemVal);
      }
    });
    //console.log(cakeArray)
  });

  // Coffee
  let coffeeRef = app.database().ref("diaryQuestions/Food/Coffee");
  coffeeRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!coffeeArray.includes(itemVal)) {
        coffeeArray.push(itemVal);
      }
    });
    //console.log(coffeeArray)
  });

  // Rice
  let riceRef = app.database().ref("diaryQuestions/Food/Rice");
  riceRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!riceArray.includes(itemVal)) {
        riceArray.push(itemVal);
      }
    });
    //console.log(riceArray);
  });

  // Avengers
  let avengersRef = app.database().ref("diaryQuestions/Movies/Avengers");
  avengersRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!avengersArray.includes(itemVal)) {
        avengersArray.push(itemVal);
      }
    });
    //console.log(avengersArray);
  });

  // Spiderman
  let spidermanRef = app.database().ref("diaryQuestions/Movies/Spiderman");
  spidermanRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!spidermanArray.includes(itemVal)) {
        spidermanArray.push(itemVal);
      }
    });
    //console.log(spidermanArray);
  });

  // Star Wars
  let starwarsRef = app.database().ref("diaryQuestions/Movies/Star Wars");
  starwarsRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!starwarsArray.includes(itemVal)) {
        starwarsArray.push(itemVal);
      }
    });
    //console.log(starwarsArray);
  });

  // Twilight
  let twilightRef = app.database().ref("diaryQuestions/Movies/Twilight");
  twilightRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!twilightArray.includes(itemVal)) {
        twilightArray.push(itemVal);
      }
    });
    //console.log(twilightArray);
  });

  // Pop
  let popRef = app.database().ref("diaryQuestions/Music/Pop");
  popRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!popArray.includes(itemVal)) {
        popArray.push(itemVal);
      }
    });
    //console.log(popArray);
  });

  // Rap
  let rapRef = app.database().ref("diaryQuestions/Music/Rap");
  rapRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!rapArray.includes(itemVal)) {
        rapArray.push(itemVal);
      }
    });
    //console.log(rapArray);
  });

  // country
  let countryRef = app.database().ref("diaryQuestions/Music/country");
  countryRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!countryArray.includes(itemVal)) {
        countryArray.push(itemVal);
      }
    });
    //console.log(countryArray);
  });

  // edm
  let edmRef = app.database().ref("diaryQuestions/Music/edm");
  edmRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!edmArray.includes(itemVal)) {
        edmArray.push(itemVal);
      }
    });
    //console.log(edmArray);
  });

  // baseball
  let baseballRef = app.database().ref("diaryQuestions/Sports/Baseball");
  baseballRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!baseballArray.includes(itemVal)) {
        baseballArray.push(itemVal);
      }
    });
    //console.log(baseballArray);
  });

  // basketball
  let basketballRef = app.database().ref("diaryQuestions/Sports/Basketball");
  basketballRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!basketballArray.includes(itemVal)) {
        basketballArray.push(itemVal);
      }
    });
    //console.log(basketballArray);
  });

  // Football
  let footballRef = app.database().ref("diaryQuestions/Sports/Football");
  footballRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!footballArray.includes(itemVal)) {
        footballArray.push(itemVal);
      }
    });
    //console.log(footballArray);
  });

  // Rowing
  let rowingRef = app.database().ref("diaryQuestions/Sports/Rowing");
  rowingRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!rowingArray.includes(itemVal)) {
        rowingArray.push(itemVal);
      }
    });
    //console.log(rowingArray);
  });

  // Running
  let runningRef = app.database().ref("diaryQuestions/Sports/Running");
  runningRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!runningArray.includes(itemVal)) {
        runningArray.push(itemVal);
      }
    });
    //console.log(runningArray);
  });

  // Soccer
  let soccerRef = app.database().ref("diaryQuestions/Sports/Soccer");
  soccerRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!soccerArray.includes(itemVal)) {
        soccerArray.push(itemVal);
      }
    });
    //console.log(soccerArray);
  });

  // Swimming
  let swimmingRef = app.database().ref("diaryQuestions/Sports/Swimming");
  swimmingRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!swimmingArray.includes(itemVal)) {
        swimmingArray.push(itemVal);
      }
    });
    //console.log(swimmingArray);
  });

  // Tennis
  let tennisRef = app.database().ref("diaryQuestions/Sports/Tennis");
  tennisRef.once("value", (snapshot) => {
    snapshot.forEach(function (item) {
      var itemVal = item.val();
      if (!tennisArray.includes(itemVal)) {
        tennisArray.push(itemVal);
      }
    });
    //console.log(tennisArray);

    // Loop through user interests, place relevant questions into all_potential_questions array
    var ref = app.database().ref("users/" + getCurrentUser());
    ref.on("value", function (snapshot) {
      if (
        snapshot.hasChild("food") ||
        snapshot.hasChild("movies") ||
        snapshot.hasChild("music") ||
        snapshot.hasChild("sports")
      ) {
        for (var i = 0; i < user_interests.length; i++) {
          switch (user_interests[i]) {
            case "burgers":
              for (var j = 0; j < burgersArray.length; j++) {
                if (!all_potential_questions.includes(burgersArray[j])) {
                  all_potential_questions.push(burgersArray[j]);
                }
              }
              break;
            case "Cake":
              for (var j = 0; j < cakeArray.length; j++) {
                if (!all_potential_questions.includes(cakeArray[j])) {
                  all_potential_questions.push(cakeArray[j]);
                }
              }
              break;
            case "Coffee":
              for (var j = 0; j < coffeeArray.length; j++) {
                if (!all_potential_questions.includes(coffeeArray[j])) {
                  all_potential_questions.push(coffeeArray[j]);
                }
              }
              break;
            case "Rice":
              for (var j = 0; j < riceArray.length; j++) {
                if (!all_potential_questions.includes(riceArray[j])) {
                  all_potential_questions.push(riceArray[j]);
                }
              }
              break;
            // Movies
            case "Avengers":
              for (var j = 0; j < avengersArray.length; j++) {
                if (!all_potential_questions.includes(avengersArray[j])) {
                  all_potential_questions.push(avengersArray[j]);
                }
              }
              break;
            case "Spiderman":
              for (var j = 0; j < spidermanArray.length; j++) {
                if (!all_potential_questions.includes(spidermanArray[j])) {
                  all_potential_questions.push(spidermanArray[j]);
                }
              }
              break;
            case "Star Wars":
              for (var j = 0; j < starwarsArray.length; j++) {
                if (!all_potential_questions.includes(starwarsArray[j])) {
                  all_potential_questions.push(starwarsArray[j]);
                }
              }
              break;
            case "Twilight":
              for (var j = 0; j < twilightArray.length; j++) {
                if (!all_potential_questions.includes(twilightArray[j])) {
                  all_potential_questions.push(twilightArray[j]);
                }
              }
              break;
            // Music
            case "Pop":
              for (var j = 0; j < popArray.length; j++) {
                if (!all_potential_questions.includes(popArray[j])) {
                  all_potential_questions.push(popArray[j]);
                }
              }
              break;
            case "Rap":
              for (var j = 0; j < rapArray.length; j++) {
                if (!all_potential_questions.includes(rapArray[j])) {
                  all_potential_questions.push(rapArray[j]);
                }
              }
              break;
            case "Country":
              for (var j = 0; j < countryArray.length; j++) {
                if (!all_potential_questions.includes(countryArray[j])) {
                  all_potential_questions.push(countryArray[j]);
                }
              }
              break;
            case "EDM":
              for (var j = 0; j < edmArray.length; j++) {
                if (!all_potential_questions.includes(edmArray[j])) {
                  all_potential_questions.push(edmArray[j]);
                }
              }
              break;
            // Sports
            case "Baseball":
              for (var j = 0; j < baseballArray.length; j++) {
                if (!all_potential_questions.includes(baseballArray[j])) {
                  all_potential_questions.push(baseballArray[j]);
                }
              }
              break;
            case "Basketball":
              for (var j = 0; j < basketballArray.length; j++) {
                if (!all_potential_questions.includes(basketballArray[j])) {
                  all_potential_questions.push(basketballArray[j]);
                }
              }
              break;
            case "Football":
              for (var j = 0; j < footballArray.length; j++) {
                if (!all_potential_questions.includes(footballArray[j])) {
                  all_potential_questions.push(footballArray[j]);
                }
              }
              break;
            case "Rowing":
              for (var j = 0; j < rowingArray.length; j++) {
                if (!all_potential_questions.includes(rowingArray[j])) {
                  all_potential_questions.push(rowingArray[j]);
                }
              }
              break;
            case "Running":
              for (var j = 0; j < runningArray.length; j++) {
                if (!all_potential_questions.includes(runningArray[j])) {
                  all_potential_questions.push(runningArray[j]);
                }
              }
              break;
            case "Soccer":
              for (var j = 0; j < soccerArray.length; j++) {
                if (!all_potential_questions.includes(soccerArray[j])) {
                  all_potential_questions.push(soccerArray[j]);
                }
              }
              break;
            case "Swimming":
              for (var j = 0; j < swimmingArray.length; j++) {
                if (!all_potential_questions.includes(swimmingArray[j])) {
                  all_potential_questions.push(swimmingArray[j]);
                }
              }
              break;
            case "Tennis":
              for (var j = 0; j < tennisArray.length; j++) {
                if (!all_potential_questions.includes(tennisArray[j])) {
                  all_potential_questions.push(tennisArray[j]);
                }
              }
              break;
          } // End Switch
        } // End For loop

        // console.log(all_potential_questions)

        // Choose 5 random questions from all potential to display
        var randomQuestionNumbers = [];

        while (randomQuestionNumbers.length < 5) {
          var randomNum = Math.floor(
            Math.random() * all_potential_questions.length
          );
          if (!randomQuestionNumbers.includes(randomNum)) {
            randomQuestionNumbers.push(randomNum);
          }
        }

        for (var i = 0; i < randomQuestionNumbers.length; i++) {
          if (
            !random_5_questions.includes(
              all_potential_questions[randomQuestionNumbers[i]]
            ) &&
            random_5_questions.length < 5
          ) {
            random_5_questions.push(
              all_potential_questions[randomQuestionNumbers[i]]
            );
          }
        }

        console.log(random_5_questions);
      }
    });

    // Connect to firebase and write these 5 questions to user DB if it does not already exist
    ref.on("value", function (snapshot) {
      if (snapshot.hasChild("diaryQuestions")) {
        console.log("questions already generated");
      } else if (
        snapshot.hasChild("food") ||
        snapshot.hasChild("movies") ||
        snapshot.hasChild("music") ||
        snapshot.hasChild("sports")
      ) {
        ref.child("diaryQuestions").set({
          q1: random_5_questions[0],
          q2: random_5_questions[1],
          q3: random_5_questions[2],
          q4: random_5_questions[3],
          q5: random_5_questions[4],
        });
      }
    });
  });
}

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      top_artist: null,
    };
    this.getInterests = this.getInterests.bind(this);
    this.getTopArtist = this.getTopArtist.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getTopArtist(_token);
    }
  }

  getTopArtist(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          top_artist: data.items[0].name,
        });
        console.log(data.items);
      },
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

  getInterests() {
    var musicInterests = [];
    var sportInterests = [];
    var movieInterests = [];
    var foodInterests = [];

    var questions = [];

    let musicRef = app
      .database()
      .ref("users/" + this.getCurrentUser() + "/music/interests");
    musicRef.on("value", (snapshot) => {
      musicInterests = snapshot.val();
    });

    let sportsRef = app
      .database()
      .ref("users/" + this.getCurrentUser() + "/sports/interests");
    sportsRef.on("value", (snapshot) => {
      sportInterests = snapshot.val();
    });

    let movieRef = app
      .database()
      .ref("users/" + this.getCurrentUser() + "/movies/interests");
    movieRef.on("value", (snapshot) => {
      movieInterests = snapshot.val();
    });

    let foodRef = app
      .database()
      .ref("users/" + this.getCurrentUser() + "/food/interests");
    foodRef.on("value", (snapshot) => {
      foodInterests = snapshot.val();
    });

    // Once it finishes reading from DB
    musicRef.once("value").then(function (child) {
      if (musicInterests != null) {
        for (var i = 0; i < musicInterests.length; i++) {
          questions.push(musicInterests[i]);
        }
      }
    });

    sportsRef.once("value").then(function (child) {
      if (sportInterests != null) {
        for (var i = 0; i < sportInterests.length; i++) {
          questions.push(sportInterests[i]);
        }
      }
    });

    movieRef.once("value").then(function (child) {
      if (movieInterests != null) {
        for (var i = 0; i < movieInterests.length; i++) {
          questions.push(movieInterests[i]);
        }
      }
    });

    foodRef.once("value").then(function (child) {
      if (foodInterests != null) {
        for (var i = 0; i < foodInterests.length; i++) {
          questions.push(foodInterests[i]);
        }
      }
      user_interests = questions;
      console.log(user_interests);
      generateQuestions();
    });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <ButtonAppBar />
        {this.getInterests()}
        <div>
          <header>
            <Typography variant="h3" component="h4" className="titleText">
              {getUserEmail()}
            </Typography>

            <div className={"header"}>
              <Grid container spacing={2} className={"topGrid"}>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <div className={"center"}>
                      <CircularProgress
                        variant="static"
                        value={66}
                        size={300}
                        thickness={7}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <Typography
                      variant="h4"
                      align="center"
                      className={"rank"}
                      gutterBottom
                    >
                      Level:
                    </Typography>
                    <Typography variant="h4" align="center" gutterBottom>
                      Rank:
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2} className={"groups"}>
                <GroupGraphList />
              </Grid>

              <Grid container spacing={2} className={"summary"}>
                {/*<Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    {!this.state.token && (
                      <a
                        className="btn btn--loginApp-link"
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                          "%20"
                        )}&response_type=token&show_dialog=true`}
                      >
                        Login to Spotify
                      </a>
                    )}
                    {this.state.token && (
                      <Typography>
                        Your top artist is {this.state.top_artist}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <Typography>Side 2</Typography>
                  </Grid>
                    </Grid>*/}
              </Grid>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default Overview;
