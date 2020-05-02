import React, { Component } from "react";
import * as $ from "jquery";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import hash from "./../signup/hash";
import GroupGraphList from "../../components/GroupGraphList/GroupGraphList";
import Tabs from "../../components/Tabs/Tabs";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from "victory";
import "./Overview.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from "./../../components/spotify/config";
import TopArtist from "./../signup/TopArtist";
import Summary from "../summary/Summary";
import app from "../../components/firebase/base";
import DataVisTab from "../../components/DataVisTab/DataVisTab";
import Graphs from "../../components/Graphs/Graphs";

var graphData = {};
var level;
var points;

function getUserName() {
  var user = app.auth().currentUser;

  if (user) {
    //console.log(user.uid)
    var userID = user.uid;
    var ref = app.database().ref("users/" + userID);

    return user.displayName;
  } else {
    // No user is signed in.
  }
}

function getPerson(id, callback) {
  let ref = app.database().ref("users/" + getCurrentUser() + "/" + id);

  ref.once(
    "value",
    function (snapshot) {
      var peep = snapshot.val();
      // error will be null, and peep will contain the snapshot
      callback(null, peep);
    },
    function (error) {
      // error wil be an Object
      callback(error);
    }
  );
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
var all_potential_categories = [];
var random_5_questions = [];
var random_5_categories = [];

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
    console.log("Before starting... " + all_potential_questions);
    //if (all_potential_questions.length > 0 || random_5_questions.length > 0) {
    console.log("resetting array...");
    all_potential_questions = [];
    all_potential_categories = [];
    random_5_questions = [];
    random_5_categories = [];
    console.log("reset array: " + all_potential_questions);
    //}

    var ref = app.database().ref("users/" + getCurrentUser());
    ref.on("value", function (snapshot) {
      if (
        (snapshot.hasChild("food") ||
          snapshot.hasChild("movies") ||
          snapshot.hasChild("music") ||
          snapshot.hasChild("sports")) &&
        user_interests.length > 0
        //&& snapshot.hasChild("pushed")
      ) {
        console.log("Starting Questions... " + all_potential_questions);
        console.log("Starting Categories... " + all_potential_categories);
        console.log("all user interests: " + user_interests);

        for (var i = 0; i < user_interests.length; i++) {
          console.log("i: " + i);
          switch (user_interests[i]) {
            case "Burgers":
              for (var j = 0; j < burgersArray.length; j++) {
                if (!all_potential_questions.includes(burgersArray[j])) {
                  all_potential_questions.push(burgersArray[j]);
                  all_potential_categories.push("Burgers");
                }
              }
              console.log("Burgers " + all_potential_questions);
              break;
            case "Cake":
              for (var j = 0; j < cakeArray.length; j++) {
                if (!all_potential_questions.includes(cakeArray[j])) {
                  all_potential_questions.push(cakeArray[j]);
                  all_potential_categories.push("Cake");
                }
              }
              console.log("Cake " + all_potential_questions);
              break;
            case "Coffee":
              for (var j = 0; j < coffeeArray.length; j++) {
                if (!all_potential_questions.includes(coffeeArray[j])) {
                  all_potential_questions.push(coffeeArray[j]);
                  all_potential_categories.push("Coffee");
                }
              }
              console.log("Coffee " + all_potential_questions);
              break;
            case "Rice":
              for (var j = 0; j < riceArray.length; j++) {
                if (!all_potential_questions.includes(riceArray[j])) {
                  all_potential_questions.push(riceArray[j]);
                  all_potential_categories.push("Rice");
                }
              }
              console.log("Rice " + all_potential_questions);
              break;
            // Movies
            case "Avengers":
              for (var j = 0; j < avengersArray.length; j++) {
                if (!all_potential_questions.includes(avengersArray[j])) {
                  all_potential_questions.push(avengersArray[j]);
                  all_potential_categories.push("Avengers");
                }
              }
              console.log("Movies " + all_potential_questions);
              break;
            case "Spiderman":
              for (var j = 0; j < spidermanArray.length; j++) {
                if (!all_potential_questions.includes(spidermanArray[j])) {
                  all_potential_questions.push(spidermanArray[j]);
                  all_potential_categories.push("Spiderman");
                }
              }
              console.log("Spiderman " + all_potential_questions);
              break;
            case "Star Wars":
              for (var j = 0; j < starwarsArray.length; j++) {
                if (!all_potential_questions.includes(starwarsArray[j])) {
                  all_potential_questions.push(starwarsArray[j]);
                  all_potential_categories.push("Star Wars");
                }
              }
              console.log("Star Wars " + all_potential_questions);
              break;
            case "Twilight":
              for (var j = 0; j < twilightArray.length; j++) {
                if (!all_potential_questions.includes(twilightArray[j])) {
                  all_potential_questions.push(twilightArray[j]);
                  all_potential_categories.push("Twilight");
                }
              }
              console.log("Twilight " + all_potential_questions);
              break;
            // Music
            case "Pop":
              for (var j = 0; j < popArray.length; j++) {
                if (!all_potential_questions.includes(popArray[j])) {
                  all_potential_questions.push(popArray[j]);
                  all_potential_categories.push("Pop");
                }
              }
              console.log("Pop " + all_potential_questions);
              break;
            case "Rap":
              for (var j = 0; j < rapArray.length; j++) {
                if (!all_potential_questions.includes(rapArray[j])) {
                  all_potential_questions.push(rapArray[j]);
                  all_potential_categories.push("Rap");
                }
              }
              console.log("Rap " + all_potential_questions);
              break;
            case "Country":
              for (var j = 0; j < countryArray.length; j++) {
                if (!all_potential_questions.includes(countryArray[j])) {
                  all_potential_questions.push(countryArray[j]);
                  all_potential_categories.push("Country");
                }
              }
              console.log("Country " + all_potential_questions);
              break;
            case "EDM":
              for (var j = 0; j < edmArray.length; j++) {
                if (!all_potential_questions.includes(edmArray[j])) {
                  all_potential_questions.push(edmArray[j]);
                  all_potential_categories.push("EDM");
                }
              }
              console.log("EDM " + all_potential_questions);
              break;
            // Sports
            case "Baseball":
              for (var j = 0; j < baseballArray.length; j++) {
                if (!all_potential_questions.includes(baseballArray[j])) {
                  all_potential_questions.push(baseballArray[j]);
                  all_potential_categories.push("Baseball");
                }
              }
              console.log("Baseball " + all_potential_questions);
              break;
            case "Basketball":
              for (var j = 0; j < basketballArray.length; j++) {
                if (!all_potential_questions.includes(basketballArray[j])) {
                  all_potential_questions.push(basketballArray[j]);
                  all_potential_categories.push("Basketball");
                }
              }
              console.log("Basketball " + all_potential_questions);
              break;
            case "Football":
              for (var j = 0; j < footballArray.length; j++) {
                if (!all_potential_questions.includes(footballArray[j])) {
                  all_potential_questions.push(footballArray[j]);
                  all_potential_categories.push("Football");
                }
              }
              console.log("Football " + all_potential_questions);
              break;
            case "Rowing":
              for (var j = 0; j < rowingArray.length; j++) {
                if (!all_potential_questions.includes(rowingArray[j])) {
                  all_potential_questions.push(rowingArray[j]);
                  all_potential_categories.push("Rowing");
                }
              }
              console.log("Rowing " + all_potential_questions);
              break;
            case "Running":
              for (var j = 0; j < runningArray.length; j++) {
                if (!all_potential_questions.includes(runningArray[j])) {
                  all_potential_questions.push(runningArray[j]);
                  all_potential_categories.push("Running");
                }
              }
              console.log("Running " + all_potential_questions);
              break;
            case "Soccer":
              for (var j = 0; j < soccerArray.length; j++) {
                if (!all_potential_questions.includes(soccerArray[j])) {
                  all_potential_questions.push(soccerArray[j]);
                  all_potential_categories.push("Soccer");
                }
              }
              console.log("Soccer " + all_potential_questions);
              break;
            case "Swimming":
              for (var j = 0; j < swimmingArray.length; j++) {
                if (!all_potential_questions.includes(swimmingArray[j])) {
                  all_potential_questions.push(swimmingArray[j]);
                  all_potential_categories.push("Swimming");
                }
              }
              console.log("Swimming " + all_potential_questions);
              break;
            case "Tennis":
              for (var j = 0; j < tennisArray.length; j++) {
                if (!all_potential_questions.includes(tennisArray[j])) {
                  all_potential_questions.push(tennisArray[j]);
                  all_potential_categories.push("Tennis");
                }
              }
              console.log("Tennis " + all_potential_questions);
              break;
          } // End Switch
        } // End For loop

        console.log("All potential questions: " + all_potential_questions);
        console.log("All potential categories: " + all_potential_categories);

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

        // Choosing the random questions
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
            random_5_categories.push(
              all_potential_categories[randomQuestionNumbers[i]]
            );
          }
        }

        console.log("random 5 questions: " + random_5_questions);
        console.log("random 5 categories: " + random_5_categories);
      }
    });

    // Connect to firebase and write these 5 questions to user DB if it does not already exist
    ref.on("value", function (snapshot) {
      if (
        snapshot.hasChild("diaryQuestions")
        //&& snapshot.hasChild("pushed")
      ) {
        console.log("questions already generated");
      } else if (
        (snapshot.hasChild("food") ||
          snapshot.hasChild("movies") ||
          snapshot.hasChild("music") ||
          snapshot.hasChild("sports")) &&
        random_5_questions.length == 5
        //&& snapshot.hasChild("pushed")
      ) {
        ref.child("diaryQuestions").set({
          q1: random_5_questions[0],
          q2: random_5_questions[1],
          q3: random_5_questions[2],
          q4: random_5_questions[3],
          q5: random_5_questions[4],
        });
      }

      // Set categories
      if (
        snapshot.hasChild("diaryQuestionCategories")
        //&& snapshot.hasChild("pushed")
      ) {
        console.log("questions already generated");
      } else if (
        (snapshot.hasChild("food") ||
          snapshot.hasChild("movies") ||
          snapshot.hasChild("music") ||
          snapshot.hasChild("sports")) &&
        random_5_questions.length == 5
        //&& snapshot.hasChild("pushed")
      ) {
        ref.child("diaryQuestionCategories").set({
          q1: random_5_categories[0],
          q2: random_5_categories[1],
          q3: random_5_categories[2],
          q4: random_5_categories[3],
          q5: random_5_categories[4],
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
      isAuthenticating: true,
      isLoadingLevel: false, // flag is changed to true after it finishes grabbing the level from firebase
      isLoadingPoints: false,
      isLoadingGraph: false,
      top_artist: null,
      category: '',
      categories: [],
      isLoadingCategories: false,
    };
    this.getInterests = this.getInterests.bind(this);
    this.getTopArtist = this.getTopArtist.bind(this);
    this.getChart = this.getChart.bind(this);
    this.getLevel = this.getLevel.bind(this);
    this.getPoints = this.getPoints.bind(this);
    this.getGraphData = this.getGraphData.bind(this);
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

    this.authUser().then(
      (user) => {
        /* Call functions inside here that are necessary for the page to load; 
           i.e. functions that grab data from firebase */
        this.setState({ isAuthenticating: false });
        console.log("USER " + this.getCurrentUser());
        this.getLevel();
        this.getPoints();
        this.getGraphData();
        this.getCategories();
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

  getCategories() {
    var dataCategory = []
    app.database().ref("users/" +  getCurrentUser() + "/diaryQuestionCategories").once("value", (snapshot) => {
      snapshot.forEach((child) => {
          if (!dataCategory.includes(child.val())) {
            dataCategory.push(child.val())
          }
      });
      this.setState({
        categories: dataCategory,
        isLoadingCategories: true
      })
    });
  }

  getGraphData() {
    let ref = app.database().ref("diaryEntries/" + getCurrentUser());
    ref.on("value", (snapshot) => {
      snapshot.forEach((child) => {
        child.forEach((question) => {
          if (graphData[question.key.toString()] != null) {
            graphData[question.key.toString()].push({
              x: child.key.substring(0, 2) + "/" + child.key.substring(2, 4),
              y: parseInt(question.val()),
            });
          } else {
            graphData[question.key.toString()] = [
              {
                x: child.key.substring(0, 2) + "/" + child.key.substring(2, 4),
                y: parseInt(question.val()),
              },
            ];
          }
        });
      });
      this.setState({
        isLoadingGraph: true,
      });
    });
    console.log("G DATA: " + Object.keys(graphData));
  }

  getLevel() {
    let ref = app.database().ref("users/" + getCurrentUser() + "/level");

    ref.on("value", (snapshot) => {
      console.log("Level: " + snapshot.val());
      level = snapshot.val();
      this.setState({
        isLoadingLevel: true,
      });
    });
  }

  getPoints() {
    /* Create reference to messages in Firebase Database */
    let ref = app.database().ref("users/" + getCurrentUser() + "/points");

    ref.on("value", (snapshot) => {
      console.log("Points: " + snapshot.val());
      points = snapshot.val();
      console.log("points: " + points);
      this.setState({
        isLoadingPoints: true,
      });
    });
  }

  getChart(data) {
    let chart;
    var randomNum = Math.floor(Math.random() * 3);
    if (randomNum == 0) {
      chart = <VictoryLine data={data} />;
    } else if (randomNum == 1) {
      chart = (
        <VictoryScatter
          style={{ data: { fill: "#c43a31" } }}
          size={7}
          data={data}
        />
      );
    } else {
      chart = (
        <VictoryBar
          style={{ data: { fill: "#c43a31" }, labels: { padding: 100 } }}
          alignment="start"
          data={data}
        />
      );
    }
    console.log("END OF GET CHART");
    return chart;
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

  handleCategorySelected = category => {
    this.setState({
      category : category
    })
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
    if (this.state.isAuthenticating) return null;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

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

    return (
      // This will ensure that the data is loaded before rendering the rest.
      this.state.isLoadingCategories && 
      this.state.isLoadingPoints &&
      this.state.isLoadingGraph &&
      //Object.keys(graphData).length==5 &&
      this.state.isLoadingLevel && (
        <div>
          <MuiThemeProvider theme={theme}>
            <ButtonAppBar />
            {this.getInterests()}
            <div>
              <header style={{ backgroundColor: "#303C6C", padding: "30px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div style={{ paddingLeft: "20px" }}>
                      <Typography
                        variant="h3"
                        component="h4"
                        className="titleText"
                        style={{
                          padding: "10px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Welcome Back, {getUserName()}!
                      </Typography>
                      <Button size="large" variant="outlined" color="primary">
                        <Link to="/dataDiary" className={"noDecorationsButton"}>
                          Fill Out Data Diary?
                        </Link>
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <div className={"center"}>
                          <CircularProgress
                            variant="static"
                            value={46}
                            size={220}
                            thickness={6}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="h4"
                          align="center"
                          className={"rank"}
                          gutterBottom
                          style={{
                            padding: "10px",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Level:&nbsp;
                          {level}
                        </Typography>
                        <Typography
                          variant="h4"
                          align="center"
                          gutterBottom
                          style={{
                            padding: "10px",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Points:&nbsp;
                          {points}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}></Grid>
                      <Grid item xs={3}></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </header>
              <DataVisTab categories={this.state.categories} category={this.state.category} onSelect={this.handleCategorySelected}/>
            </div>
          </MuiThemeProvider>

          <Graphs category={this.state.category}/>
          <div className={"header"}>
            {/*<Grid container spacing={4}>
              {console.log("GRAPH DATA: " + Object.keys(graphData).length)}
              {Object.keys(graphData).map((key) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center">
                  <Typography variant="h4">{key}</Typography>
                  <VictoryChart theme={VictoryTheme.material}>
                    <VictoryAxis
                      style={{ axisLabel: { padding: 30 } }}
                      label="Date"
                    />
                    <VictoryAxis dependentAxis />
                    {this.getChart(graphData[key])}
                  </VictoryChart>
                </Grid>
              ))}
            </Grid>*/}

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
        </div>
      )
    );
  }
}

export default Overview;
