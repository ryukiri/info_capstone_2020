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
      let message = { text: snapshot.val(), id: snapshot.key };
      let diary = { banana: snapshot.val().banana, sleep: snapshot.val().sleep, date: snapshot.key };
      this.setState({ messages: [diary].concat(this.state.messages) });
    });

    /*messagesRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        let title = childData.banana
        let num = childData.sleep
        let message = { text: title, id: num };
        this.setState({ messages: [message].concat(this.state.messages) });
        console.log(childData);
      });
    });*/
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    app
      .database()
      .ref("diary")
      .push(this.inputEl.value);
    this.inputEl.value = ""; // <- clear the input
  }

  render() {
    return (
      <div>
        <ButtonAppBar />


        <form onSubmit={this.addMessage.bind(this)}>
          <input type="text" ref={el => (this.inputEl = el)} />
          <input type="submit" />
          <ul>
            {/* Render the list of messages */
            this.state.messages.map(message => (
              <li key={message.date}>Today is {message.date}. You ate {message.banana} bananas and slept {message.sleep} hours.</li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

export default Summary;
