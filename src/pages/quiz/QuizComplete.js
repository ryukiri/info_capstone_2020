import './Quiz.css';

import {
  Button,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  FormControlLabel,
  Radio,
  Typography
} from '@material-ui/core/';
import React, {Component} from 'react';

import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";
import app from "./../../components/firebase/base";
import { makeStyles } from "@material-ui/core/styles";
import sport1 from "./visualizations/sports1.jpg"
import sport2 from "./visualizations/sports2.jpg"

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    padding: theme.spacing(4)
  },
  formTitle: {
    fontSize: '17pt',
    fontWeight:'bold'
  },
  expansion: {
    maxWidth: '50%',
    margin: theme.spacing(3),
    marginBottom: theme.spacing(4)
  },
  body: {
    margin:'auto',
    padding: theme.spacing(1),
  },
  img: {
    margin: '10px'
  }
}));

class QuizComplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    questionNum: 1,
    value:'',
    score: 0,
    disabled: true,
    questionSnapshot: undefined,
    answersRef: undefined,
    uID: undefined,
    image: sport1,
   }; // <- set up react state
  this.printQuestions = this.printQuestions.bind(this)

  }

componentDidMount() {
  var level = 1;
  /* Create reference to quiz in Firebase Database */

  let messagesRef = app.database().ref("quiz/Sports/" + level);
        //  messagesRef.child("Sports").child.set(1);
  // console.log(messagesRef.child("level").set(1))

// let answers = app.database().ref("quizAnswers/" + undefined.id)
  
  messagesRef.on('value', (snapshot) => {
    this.setState({questionSnapshot: snapshot.val()})
  });
  var user = app.auth().currentUser;
  // var test = app.database().ref("quizAnswers/" + getCurrentUser());
  // console.log(test)
  app.auth().onAuthStateChanged((user) => {
    if(user){
      console.log("User logined");
      this.setState({
        uID : user.uid
      })
      let answers = app.database().ref("quizAnswers/" + user.uid)
      answers = answers.child("Sports").child(level)
      answers.on('value', (snapshot) => {
        this.setState({answersRef: snapshot.val()})
      });
      let pointsRef = app.database().ref("users/" + user.uid + "/points");
      let levelRef = app.database().ref("users/" + user.uid + "/level");
      pointsRef.once('value').then((snapshot) => {
        pointsRef.set(parseInt(snapshot.val()) + 50);
        levelRef.set( Math.floor((parseInt(snapshot.val()) + 50) / 100) )
      });

    } else {
      console.log("User isn't logined");
    }
  })

}


printQuestions() {
  return (this.state.questionSnapshot.map((item, i) => {
    if (item.choices != undefined) {
      let answers = [];
      item.choices.forEach(choice => {
        if (choice === item.answer) {
          answers.push(<FormControlLabel
            value="disabled"
            control={<Radio style={{color: 'green'}}/>}
            label={choice}
            checked
          />);
        } else {
          answers.push(<FormControlLabel
            value="disabled"
            disabled
            control={<Radio s/>}
            label={choice}
          />)
        }
    });
      return (<div>{i >= 3 ? <img src={sport2} height="400px" ></img> : <img src={sport1} height="400px"></img>}
        <Typography variant="h5">{item.question}</Typography>
      <FormControl component="fieldset" >
        {answers}
      </FormControl>
      <Typography variant="h6">You chose:</Typography>
      {this.state.answersRef[i - 1] === item.answer ? <FormControlLabel
                  value="disabled"
                  control={<Radio style={{color: 'green'}}/>}
                  label={this.state.answersRef[i - 1]}
                  color='primary'
                  checked
                /> : <React.Fragment><FormControlLabel
                value="disabled"
                control={<Radio style={{color: 'red'}}/>}
                label={this.state.answersRef[i - 1]}
                color='primary'
                checked
              />
              <ExpansionPanel defaultExpanded >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Explanation</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {item.explanation}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            </React.Fragment>}
      </div>);
    }
      
    }))
}

render() {
  if (this.state.uID === undefined || this.state.questionSnapshot === undefined || this.state.answersRef === undefined) {
    return <div><ButtonAppBar/>
    <Container maxWidth="md">
    <h3>Loading...</h3>
    </Container>
    </div>
  }
  return (<React.Fragment>
    <ButtonAppBar/>
    <Container maxWidth="lg">
    
    <div>
      <Typography variant="h4" style={{ marginBottom: '10px'}}>
        Quiz Completed
      </Typography>
      <Typography>You earned 50 points for completing a quiz!</Typography>
      {/* <Typography variant="h5">Score ={this.state.score}</Typography> */}
      {this.printQuestions()}
      {/* <FormControl component="fieldset"> 
      </FormControl> */}
        <Button>
        <Link to={{
            pathname: '/quizCategory',
          }}>
            Take Another Quiz
          </Link>
        </Button>
    </div>
    </Container>
    </React.Fragment>
  );
        }
}

export default QuizComplete;
