import React, { Component } from "react";
import * as $ from "jquery";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import hash from "./../signup/hash";
import GroupGraphList from  "../../components/GroupGraphList/GroupGraphList"
import Tabs from "../../components/Tabs/Tabs";
import Button from '@material-ui/core/Button';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLine, VictoryScatter, VictoryAxis } from "victory";


import "./Overview.css";
import app from "../../components/firebase/base";

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

var graphData = {}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D2FDFF',
    },
    secondary: {
      main: '#303C6C',
    },
  },
});


class Overview extends Component {

  componentDidMount() {
    this.authUser().then(
      (user) => {
        console.log("USER " + this.getCurrentUser());
        app.database().ref("diaryEntries/" + this.getCurrentUser()).limitToLast(5).once("value", (snapshot) => {
          snapshot.forEach((child) => {
            child.forEach((question) => {
              if(graphData[question.key.toString()] != null) {
                graphData[question.key.toString()].push({x: (child.key.substring(0,2) + "/" + child.key.substring(2,4)), y: parseInt(question.val())})
              } else {
                graphData[question.key.toString()] = [{x: (child.key.substring(0,2) + "/" + child.key.substring(2,4)), y: parseInt(question.val())}]
              }
            });
          });
        })
      },
      (error) => {
        this.setState({ isAuthenticating: false });
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

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

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
        <MuiThemeProvider theme={theme}>
          <ButtonAppBar />
          <div>
            <header style={{backgroundColor: "#303C6C", padding: "30px"}}>
              <div style= {{paddingLeft: "20px"}}>
                <Typography variant="h3" component="h4" className="titleText" style={{padding: "10px", color: "white", fontWeight: "bold"}}>
                  Welcome Back!
                </Typography>
                <Button size="large" variant="outlined" color="primary" href="/dataDiary">
                  Fill Out Data Diary?
                </Button>
              </div>
            </header>
            <Tabs></Tabs>
          </div>
        </MuiThemeProvider>
        <Grid container spacing={4}>
          {
            Object.keys(graphData).map(key => (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center"> 
                <Typography variant="h4">{key}</Typography>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryAxis
                    style={{axisLabel: {padding: 30}}}
                    label="Date"
                  />
                  <VictoryAxis dependentAxis/>
                  {getChart(graphData[key])}
                </VictoryChart>
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}

export default Overview;
