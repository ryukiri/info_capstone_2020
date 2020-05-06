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
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import app from "../../components/firebase/base";
import "./Friends.css";

var searchedEmail = "";
var uIDs = [];
var uEmail = [];
var friends = [];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
      users: [],
      open: false,
      severity: "",
      message: "",
    };

    this.setOpen = this.setOpen.bind(this);
  }

  componentDidMount() {
    this.authUser().then((user) => {
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
                  //console.log(uEmail);
                }
              });
            });
          }
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );

      // Populate friends
      let friendsRef = app
        .database()
        .ref("users/" + getCurrentUser() + "/friends/friends");
      friendsRef.on("value", function (snapshot) {
        snapshot.forEach(function (item) {
          //console.log("Current Friends: " + item.val())
          if (!friends.includes(item.val())) {
            friends.push(item.val());
          }
        });
        console.log("Friends: " + friends)
      });

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

  generate(element) {
    return [0, 1].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  friendsList = (
    <Grid item xs={12} md={6}>
      <Typography variant="h6">Current Friends</Typography>
      <div>
        <List>
          {this.generate(
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Single-line item" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </div>
    </Grid>
  );

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
        ref.on('value', function(snapshot) {
          ref.child("friends").set({
            friends 
          });
        })
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

  render() {
    return (
      this.state.isLoading && (
        <div>
          <ButtonAppBar />

          <Container maxWidth="sm">
            <Typography variant="h3">Add a friend</Typography>
            <form style={{ paddingRight: "10%" }}>
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
            </form>
            <div>{/*this.friendsList*/}</div>
          </Container>
        </div>
      )
    );
  }
}

export default Friends;
