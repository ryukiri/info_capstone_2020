import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import app from "./../../components/firebase/base";
import "./Summary.css";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q1: [],
      q2: [],
      q3: [],
      q4: [],
      q5: [],
      date: [],
      user: null,
      isAuthenticating: true
    }; // <- set up react state
  }

  componentDidMount() {
    this.authUser().then(
      user => {
        this.setState({ isAuthenticating: false });
        console.log("USER " + this.getCurrentUser());

        /* Create reference to messages in Firebase Database */
        let diaryRef = app
          .database()
          .ref("diaryEntries/" + this.getCurrentUser())
          .orderByKey()
          .limitToLast(100);

        /* Update React state when message is added at Firebase Database */
        diaryRef.on("child_added", snapshot => {
          let diary = {
            q1: snapshot.val().q1,
            q2: snapshot.val().q2,
            q3: snapshot.val().q3,
            q4: snapshot.val().q4,
            q5: snapshot.val().q5,
            date: snapshot.key
          };
          this.setState({
            q1: [diary].concat(this.state.q1),
            q2: [diary].concat(this.state.q2),
            q3: [diary].concat(this.state.q3),
            q4: [diary].concat(this.state.q4),
            q5: [diary].concat(this.state.q5),
            date: [diary].concat(this.setState.date)
          });
        });
      },
      error => {
        this.setState({ isAuthenticating: false });
        alert(error);
      }
    );
  }

  authUser() {
    return new Promise(function(resolve, reject) {
      app.auth().onAuthStateChanged(function(user) {
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
    return currDate;
  }

  render() {
    if (this.state.isAuthenticating) return null;

    return (
      <div>
        <ButtonAppBar />
        <ul>
          {/* Render the list of messages */
          this.state.q1.map(message => (
            <li key={message.date}>
              The date is {message.date}. You ate {message.q1} bananas and slept{" "}
              {message.q2} hours.
            </li>
          ))}

          {/*console.log("USER " + this.getCurrentUser())*/}
        </ul>
      </div>
    );
  }
}

export default Summary;
