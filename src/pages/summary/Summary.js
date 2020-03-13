import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import app from "./../../components/firebase/base";
import "./Summary.css";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLine, VictoryScatter } from "victory";
import Grid from "@material-ui/core/Grid";

class Summary extends Component {
  constructor(props) {
    var graphData = {}
    app.database().ref("diaryEntries/" + "nfESSRX4ByNjD7DPeUs2UysN9vD3").once('value').then(function(snapshot) {
      snapshot.forEach((child) => {
        child.forEach((question) => {
          if(graphData[question.key.toString()] != null) {
            graphData[question.key.toString()].push({x: child.key, y: parseInt(question.val())})
          } else {
            graphData[question.key.toString()] = [{x: child.key, y: parseInt(question.val())}]
          }
        });
      });
    });
    
    super(props);
    this.state = { messages: [], graphData: graphData}; // <- set up react state
  }

  componentDidMount() {

    /* Create reference to messages in Firebase Database */
    let messagesRef = app
      .database()
      .ref("diary")
      .orderByKey()
      .limitToLast(20);

    /* Update React state when message is added at Firebase Database */
    messagesRef.on("child_added", snapshot => {
      let diary = {
        banana: snapshot.val().banana,
        sleep: snapshot.val().sleep,
        date: snapshot.key
      };
      let data = {
        "x": snapshot.key,
        "y": snapshot.val().banana
      };
      this.setState({ messages: [diary].concat(this.state.messages)});
    });

    var graphData = {}
    app.database().ref("diaryEntries/" + "nfESSRX4ByNjD7DPeUs2UysN9vD3").on('value', function(snapshot) {
      snapshot.forEach((child) => {
        child.forEach((question) => {
          if(graphData[question.key.toString()] != null) {
            graphData[question.key.toString()].push({x: child.key, y: parseInt(question.val())})
          } else {
            graphData[question.key.toString()] = [{x: child.key, y: parseInt(question.val())}]
          }
        });
      });
    });
    this.setState({ graphData: graphData});
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

    function getChart(data) {
      let chart;
      var randomNum = Math.floor(Math.random() * 3); 
      if (randomNum == 0) {
        chart = <VictoryLine data={data}/>
      } else if (randomNum == 1) {
        chart = <VictoryScatter style={{ data: { fill: "#c43a31" } }} size={7} data={data}/>
      } else {
        chart = <VictoryBar style={{ data: { fill: "#c43a31" } }} alignment="start" data={data}/>
      }
      return chart;
    }

    return (
      <div>
        <ButtonAppBar />

        <Grid container spacing={4}>
          {
            Object.keys(this.state.graphData).map(key => (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center"> 
                <VictoryChart theme={VictoryTheme.material}>
                  {getChart(this.state.graphData[key])}
                </VictoryChart>
              </Grid>
            ))
          }
        </Grid>

      </div>
    );
  }
}

export default Summary;
