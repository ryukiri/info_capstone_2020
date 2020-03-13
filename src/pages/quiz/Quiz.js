import React, {Component} from 'react';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Quiz.css';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Button,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Container} from '@material-ui/core/';
import app from "./../../components/firebase/base";
import sport1 from "./visualizations/sports1.jpg"
import sport2 from "./visualizations/sports2.jpg"
import { Link } from "react-router-dom";
import NavLink from '@material-ui/core/Link'


const useStyles = makeStyles(theme => ({
    root: {
      margin: 'auto',
      padding: theme.spacing(4)
    },
    formTitle: {
      fontSize: '17pt',
      fontWeight:'bold'
    },
    button: {
      margin: '5px'
    }
  }));

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = { questionNum: 1,
        value:'',
        score: 0,
        disabled: true,
        questionSnapshot: undefined,
        answersRef: undefined,
        uID: undefined,
        image: sport1,
        isLastQuestion: false,
        link: "https://www.slideteam.net/blog/tweak-it-to-work-it-10-golden-rules-for-data-visualization",
        answers:[]
       }; // <- set up react state

       this.handleChange = this.handleChange.bind(this); // to control component
      }
    
    componentDidMount() {
      /* Create reference to quiz in Firebase Database */
      let messagesRef = app.database().ref("quiz/Sports")
      let answers = app.database().ref("quizAnswers")
      this.setState({answersRef: answers})
      messagesRef.on('value', (snapshot) => {
        this.setState({questionSnapshot: snapshot.val()})
      });
      var user = app.auth().currentUser;

      if (user) {
        this.setState({uID: user.uid})
      } else {
        // No user is signed in.
      }
      // const question = {
      //   question: "How many 1-2 shots did Miami Heat shoot when facing Good Defense Team?",
      //   choices: ["691", "472", "304", "747"],
      //   answer: "304"
      // }
      // messagesRef.child(5).remove();
    }
        
        // handle change event when user clicks on a different radio
        handleChange = event => {
          event.preventDefault();
          this.setState({
            value: event.target.value
          });
        };
      
        // handle change when user clicks on next button
        // checks answer and updates score
        // update page with next question
        handleClick = event => {
          this.setState(state => {
            let list = this.state.answers.concat(this.state.value);

            return {
              answers: list
            };
          });
          if (this.state.questionNum < this.state.questionSnapshot.length - 1) {

            if (this.state.questionNum >= 2) {
              this.setState(state => ({
                image: sport2,
                link: "http://www.visualeverything.co.uk/weve-been-checking-out-the-wonderful-work-coming/"
              }))
            }
            this.setState(state => {
              return {
                questionNum: this.state.questionNum + 1,
                value: '',
              };
            });
            console.log(this.state.answers)
            if (this.state.value === this.state.questionSnapshot[this.state.questionNum].answer) {
              
            }
          } else {
            this.setState({
              isLastQuestion: true
            })
          }
        }
      
        render() {
          if (this.state.questionSnapshot === undefined) {
            return <div><ButtonAppBar/>
            <Container maxWidth="md">
            <h3>Loading...</h3>
            </Container>
            </div>
          }
          return (
              <div>
                <ButtonAppBar/>
                <Container maxWidth="md">
                <Typography variant="h3" style={{ padding: '15px'}}>
                  Sports Quiz
                </Typography>
                <Typography variant="h6">The following graph shows the relationship between the number of championships each team have won and the years they have been competing. Please reach the graph carefully and click <NavLink href={this.state.link}>here </NavLink>if you need help.</Typography>
                <img src={this.state.image} alt="visualization" height='300px'/>
                
                <Typography variant="h6">{this.state.questionSnapshot[this.state.questionNum].question}</Typography>

                <FormControl component="fieldset" >
                  {/* <FormLabel component="legend" >{quiz[this.state.questionNum - 1].question} of {quiz.length}</FormLabel> */}

                  <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChange}>
                    {/* map out answer options */}
                    {this.state.questionSnapshot[this.state.questionNum].choices.map(function(item, i){
                      return <FormControlLabel value={item} control={<Radio />} label={item} />;
                    })}
                  </RadioGroup>
                  
                  {this.state.isLastQuestion ? <Button variant="contained" style={{ margin: '10px'}} onClick={this.handleClick}>
                    <Link to={{
                        pathname: '/quizComplete',
                        state: {
                          questionSnapshot: this.state.questionSnapshot,
                          answers: this.state.answers
                        }
                      }}>
                        Submit
                      </Link>
                    </Button> : <Button variant="contained" style={{ margin: '10px'}} onClick={this.handleClick} disabled={!this.state.value}>Next</Button>}
                </FormControl>
                </Container>
              </div>
            );
        
      }
}

export default Quiz;
