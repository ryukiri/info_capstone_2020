import "./Graphs.css";

import React, { Component } from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from "victory";

import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import app from "../../components/firebase/base";

// This component takes a userid and a category as a prop. It will then render a graph for each of the users daily question that matches 
// the type of category that was passed in.

class Graphs extends Component {

    constructor(props) { 
        super(props)     

        this.state = {
          titles: {},
          graphData: {},
          dataCategory:[],
          isLoadingGraph: false,
          isLoadingTitles: false,
        }
    }

    componentDidMount() {
      // Checks to make sure a usuer is logged in before displaying their graphs
      this.authUser().then(
        (user) => {
          var dataCategory = []
          var graphData = {}
          var titles = {}
          
          // Fetches the Categories that a user has chosen from the Firebase DB
          app.database().ref("users/" + this.props.userid + "/diaryQuestionCategories").once("value", (snapshot) => {
              snapshot.forEach((child) => {
                  dataCategory.push(child.val())
              });
          });
  
          // Fetches the all the user's daily questions from the Firebase DB for the titles of the graphs
          app.database().ref("users/" + this.props.userid + "/diaryQuestions").once("value", (snapshot) => {
            snapshot.forEach((child) => {
              titles[child.key.toString()] = child.val()
            });
            this.setState({
              isLoadingTitles: true,
            })
          });
  
          // Fetches the user's answer to all their daily questions for the past 5 recorded days in order to plot in the graph
          app.database().ref("diaryEntries/" + this.props.userid).limitToLast(5).once("value", (snapshot) => {
            snapshot.forEach((child) => {
                  child.forEach((question) => {
                    if(graphData[question.key.toString()] != null) {
                      graphData[question.key.toString()].push({x: (child.key.substring(0,2) + "/" + child.key.substring(2,4)), y: parseInt(question.val())})
                    } else {
                      graphData[question.key.toString()] = [{x: (child.key.substring(0,2) + "/" + child.key.substring(2,4)), y: parseInt(question.val())}]
                    }
                  });
            });
            this.setState({
              titles: titles,
              graphData: graphData,
              dataCategory: dataCategory,
              isLoadingGraph: true,
            })
          });
        },
        (error) => {
          alert(error);
        }
      ); 
    }

    getCurrentUser() {
      var user = app.auth().currentUser;
  
      if (user) {
        return user.uid;
      } else {
        // No user is signed in.
      }
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

    render() {

      var newTitles = { ...this.state.titles };
      var oldGraphData = { ...this.state.graphData };
      var categories = this.state.dataCategory
      if(this.state.graphData != null) {
        for (let i = 0; i < 5; i++) {
          if(categories[i] != this.props.category && this.props.category != "") {
            delete oldGraphData[('q' + (i + 1))]
            delete newTitles[('q' + (i + 1))]
          }
        }
      }

      // Randomly returns either a Line Chart, Scatter Plot, or a Bar Chart. 
      function getChart(data) {
          let chart;
          var randomNum = Math.floor(Math.random() * 3); 
          if (randomNum == 0) {
            chart = <VictoryLine data={data} style={{ data: { stroke: "#F4976C" } }}/>
          } else if (randomNum == 1) {
            chart = <VictoryScatter style={{ data: { fill: "#F4976C" } }} size={7} data={data}/>
          } else {
            chart = <VictoryBar style={{ data: { fill: "#F4976C" }, labels: { padding: 100 } }} alignment="start" data={data}/>
          }
          return chart;
        }

      return (
        this.state.isLoadingGraph &&
        this.state.isLoadingTitles && (
        
        <div style={{ padding: "30px"}}>
            <Grid container spacing={4}>
            {
                Object.keys(oldGraphData).map(key => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center"> 
                  <Paper variant="outlined" style={{ padding: "30px", height: "90%"}}>
                    <Typography variant="h4">{newTitles[key]}</Typography>
                    <VictoryChart theme={VictoryTheme.material}>
                    <VictoryAxis
                        style={{axisLabel: {padding: 30}}}
                        label="Date"
                    />
                    <VictoryAxis dependentAxis domain={[0, 5]}/>
                    {getChart(oldGraphData[key])}
                    </VictoryChart>
                  </Paper>
                </Grid>
                ))
            }
            </Grid>
          </div>)
      )
    }

}

export default Graphs;