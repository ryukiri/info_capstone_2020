import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import app from "../../components/firebase/base";
import DataVisTab from "../../components/DataVisTab/DataVisTab";
import Graphs from "../../components/Graphs/Graphs";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./Summary.css";

var graphData = {};
function getCurrentUser() {
  var user = app.auth().currentUser;

  if (user) {
    //console.log(user.uid)
    return user.uid;
  } else {
    // No user is signed in.
  }
}

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      isAuthenticating: true,
      isLoadingGraph: false,
      category: "",
      categories: [],
      isLoadingCategories: false,
    };

    //this.getChart = this.getChart.bind(this);
    //this.getGraphData = this.getGraphData.bind(this);
  }

  componentDidMount() {
    this.authUser().then(
      (user) => {
        /* Call functions inside here that are necessary for the page to load; 
           i.e. functions that grab data from firebase */
        this.setState({ isAuthenticating: false });
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
    var dataCategory = [];
    app
      .database()
      .ref("users/" + getCurrentUser() + "/diaryQuestionCategories")
      .once("value", (snapshot) => {
        snapshot.forEach((child) => {
          if (!dataCategory.includes(child.val())) {
            dataCategory.push(child.val());
          }
        });
        this.setState({
          categories: dataCategory,
          isLoadingCategories: true,
        });
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

  render() {
    if (this.state.isAuthenticating) return null;
    
    return (
      // This will ensure that the data is loaded before rendering the rest.
      this.state.isLoadingCategories &&
      this.state.isLoadingGraph && (
        <div>
          <ButtonAppBar />
          <DataVisTab
            categories={this.state.categories}
            category={this.state.category}
            onSelect={this.handleCategorySelected}
          />

          <Graphs
            category={this.state.category}
            userid={app.auth().currentUser.uid}
          />
        </div>
      )
    );
  }
}

export default Summary;
