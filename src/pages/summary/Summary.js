import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import app from "./../../components/firebase/base";
import "./Summary.css";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLine, VictoryScatter, VictoryAxis } from "victory";
import Grid from "@material-ui/core/Grid";

class Summary extends Component {
  constructor(props) {
    var graphData = {}
    app.database().ref("diaryEntries/" + app.auth().currentUser.uid.toString()).on('value', function(snapshot) {
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
    app.database().ref("diaryEntries/" + app.auth().currentUser.uid.toString()).on('value', function(snapshot) {
      snapshot.forEach((child) => {
        child.forEach((question) => {
          if(graphData[question.key.toString()] != null) {
            graphData[question.key.toString()].push({x: (child.key.substring(0,2) + "/" + child.key.substring(2,4)), y: parseInt(question.val())})
          } else {
            graphData[question.key.toString()] = [{x: (child.key.substring(0,2) + "/" + child.key.substring(2,4)), y: parseInt(question.val())}]
          }
        });
      });
    });
    this.setState({ graphData: graphData});
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
        chart = <VictoryBar style={{ data: { fill: "#c43a31" }, labels: { padding: 100 } }} alignment="start" data={data}/>
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
                <Typography variant="h4">{key}</Typography>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryAxis
                    style={{axisLabel: {padding: 30}}}
                    label="Date"
                  />
                  <VictoryAxis dependentAxis/>
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