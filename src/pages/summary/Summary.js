import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import app from "./../../components/firebase/base";
import "./Summary.css";

class Summary extends Component {
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

  render() {
    return (
      <div>
        <ButtonAppBar />
        <ul>
          {/* Render the list of messages */
          this.state.messages.map(message => (
            <li key={message.date}>
              Today is {message.date}. You ate {message.banana} bananas and
              slept {message.sleep} hours.
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Summary;
