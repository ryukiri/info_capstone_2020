import React, { Component, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import DataVisTab from "../../components/DataVisTab/DataVisTab";
import Graphs from "../../components/Graphs/Graphs";
import MuiAlert from "@material-ui/lab/Alert";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from "victory";
import app from "../../components/firebase/base";
import "./Friends.css";

var graphData = {};
var searchedEmail = "";
var uIDs = []; // All user IDs
var uEmail = []; // All user emails
var friends = []; // Friends emails
var friendsUIDs = []; // Friends uIDs
var items = [];
var generated = false;
var itemsValues = []; // List of UIDs of clicked friends

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
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

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      isLoading: false,
      isLoadingFriends: false,
      isLoadingGraph: false,
      users: [],
      open: false,
      modalOpen: false,
      severity: "",
      message: "",
      category: "",
      categories: [],
      isLoadingCategories: false,
      uid: "",
    };
    this.getFriendsFromDB = this.getFriendsFromDB.bind(this);
    this.getUsersFromDB = this.getUsersFromDB.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.getGraphData = this.getGraphData.bind(this);
    this.setModalOpen1 = this.setModalOpen1.bind(this);
  }

  componentDidMount() {
    this.authUser().then((user) => {
      this.getUsersFromDB();

      if (this.state.isLoadingFriends) {
        this.generateFriends();
      }

      if (this.isLoadingUsers) {
        console.log("isloadingusers: " + this.isLoadingUsers);
      }

      // Done loading flag
      this.setState({
        isLoading: true,
      });
      //console.log(uEmail);
    });
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

  getFriendsFromDB() {
    app
      .database()
      .ref("users/" + getCurrentUser() + "/friends/friends")
      .once("value", (snapshot) => {
        snapshot.forEach((child) => {
          if (!friends.includes(child.val())) {
            friends.push(child.val());
          }
        });

        // Loop through friends, find index in all uEmail, find index in uIDs, add corresponding uIDs to friendsUIDs
        for (var i = 0; i < friends.length; i++) {
          console.log(uEmail.indexOf(friends[i]));
          friendsUIDs.push(uIDs[uEmail.indexOf(friends[i])]);
        }

        console.log("FRIENDS: " + friends);
        console.log("FRIENDS UIDS: " + friendsUIDs);

        this.setState({
          isLoadingFriends: true,
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

        // Loop through uIDs array and find emails of each user. Add them to uEmail array
        for (var i = 0; i < uIDs.length; i++) {
          var userEmailRef = app.database().ref("users/" + uIDs[i]);
          userEmailRef.on("value", function (snap) {
            snap.forEach(function (item) {
              // Look for email child
              if (item.key == "email") {
                if (!uEmail.includes(item.val())) {
                  uEmail.push(item.val());
                }
                console.log(uEmail);
              }
            });
          });
        }
        this.getFriendsFromDB();
      }.bind(this)
    );
  }

  // Graphs
  getGraphData(value) {
    let ref = app.database().ref("diaryEntries/" + value);
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
    // console.log("G DATA: " + Object.keys(graphData));
  }

  getCategories(value) {
    var dataCategory = [];
    app
      .database()
      .ref("users/" + value + "/diaryQuestionCategories")
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

  // Modals
  handleModalOpen = (event) => {
    console.log("Open");
    this.setModalOpen(true);
    this.forceUpdate();
  };

  // Generates categories and graph data for each friend clicked
  setModalOpen1(value) {
    this.state.uid = value;
    graphData = {};
    this.state.categories = []
    console.log(this.state.uid);

    this.getGraphData(value);
    this.getCategories(value);
  }

  handleModalClose = () => {
    console.log("Close");
    this.setModalOpen(false);
    this.forceUpdate();
  };

  setModalOpen(x) {
    this.state.modalOpen = x;
    //console.log(this.state.open);
  }

  generateFriends() {
    if (generated == false) {
      for (const [index, value] of friends.entries()) {
        // console.log("INDEX: " + index);
        console.log("VALUE: " + value);
        console.log(friends.indexOf(value));
        console.log(friendsUIDs[friends.indexOf(value)])

        items.push(
          <List component="nav">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                this.setModalOpen1(friendsUIDs[friends.indexOf(value)]);
                this.handleModalOpen();
              }}
            >
              <ListItem button>
                <ListItemText key={index} primary={value} />
              </ListItem>
            </Button>
          </List>
        );
      }
    }

    generated = true;
    return items;
  }

  handleOnChange = (event) => {
    searchedEmail = event.target.value;
  };

  handleClick = () => {
    if (uEmail.includes(searchedEmail)) {
      var ref = app.database().ref("users/" + getCurrentUser());
      console.log("Current Friends 1: " + friends);

      // Add to state array if doesn't already exist
      if (!friends.includes(searchedEmail)) {
        friends.push(searchedEmail);
        console.log(friends);
        ref.on("value", function (snapshot) {
          ref.child("friends").set({
            friends,
          });
        });
      }

      console.log("Current Friends 2: " + friends);

      console.log("Yes");
      this.state.severity = "success";
      this.state.message = "Friend added.";
    } else {
      console.log("No");
      this.state.severity = "error";
      this.state.message = "No friend exists. Try again.";
    }
    this.setOpen(true);
    this.forceUpdate(); // Force react to render on state change so our alert shows up.
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setOpen(false);
    this.forceUpdate();
  };

  setOpen(x) {
    this.state.open = x;
    //console.log(this.state.open);
  }

  // For rendering graphs
  handleCategorySelected = (category) => {
    this.setState({
      category: category,
    });
  };

  render() {
    return (
      this.state.isLoading &&
      this.state.isLoadingFriends && (
        <div>
          <ButtonAppBar />

          <Container maxWidth="sm">
            <Typography variant="h3">Add a friend</Typography>
            <form>
              <TextField
                type="text"
                name="friend"
                variant="outlined"
                margin="normal"
                required
                id="sign-up-fname"
                label="Search for a Friend"
                autoComplete="friend"
                fullWidth
                autoFocus
                onChange={this.handleOnChange}
              />
              <Button variant="outlined" fullWidth onClick={this.handleClick}>
                Add Friend
              </Button>
              <Typography variant="h6" style={{paddingTop: "10%"}}>
                Select one of your friends below to see their diary progress!
              </Typography>
              <Snackbar
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
              >
                <Alert
                  onClose={this.handleClose}
                  severity={this.state.severity}
                >
                  {this.state.message}
                </Alert>
              </Snackbar>

              <Dialog
                onClose={this.handleModalClose}
                aria-labelledby="customized-dialog-title"
                open={this.state.modalOpen}
              >
                <Typography gutterBottom></Typography>
                <DataVisTab
                  categories={this.state.categories}
                  category={this.state.category}
                  onSelect={this.handleCategorySelected}
                />
                <Graphs category={this.state.category} userid={this.state.uid} />
              </Dialog>
            </form>
            <div>{this.generateFriends()}</div>
          </Container>
        </div>
      )
    );
  }
}

export default Friends;
