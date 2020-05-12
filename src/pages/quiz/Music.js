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
import music1 from "./visualizations/music1.jpg"
import music2 from "./visualizations/music2.jpg"
import { Link } from "react-router-dom";
import NavLink from '@material-ui/core/Link'


class Music extends Component {
    constructor(props) {
        super(props);
        this.state = { questionNum: 1,
        value:'',
        score: 0,
        disabled: true,
        questionSnapshot: undefined,
        answersRef: undefined,
        uID: undefined,
        image: music1,
        isLastQuestion: false,
        link: "https://www.tableau.com/about/blog/2019/7/how-visualize-spotify-music-trends-tableau",
        answers:[]
       }; // <- set up react state

       this.handleChange = this.handleChange.bind(this); // to control component
      }
    
    componentDidMount() {
      /* Create reference to quiz in Firebase Database */
      var level = 1;
      let messagesRef = app.database().ref("quiz/Music/" + level)
     
      console.log(messagesRef)
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
          this.setState({answersRef: answers})
        }else{
          console.log("User isn't logined");
          
        }
      })

      // inputing questions into DB
      const q1 = {
        question: "Based on the bar graphs on the right, who is the most popular artist on Spotify?",
        choices: ["Drake", "Jul", "Taylor Swift", "Shape of You"],
        answer: "Jul",
         explanation: "On the top left graph, there is a graph titled Most Popular Artist. At the top of the list, with the highest bar, the artist is Jul. "
      }
      messagesRef.child(1).set(q1);

      const q2 = {
        question: "Read the line graph on the bottom left, what was the lowest steaming numbers from May 2017 to May 2019?",
        choices: ["1B", "22", "30", "0"],
        answer: "1B",
         explanation: "Looking at the line graph, the lowest point was in May 2019 with 18 billion streams."
      }
      messagesRef.child(2).set(q2);

      const q3 = {
        question: "Find Youtube in the graph, what color represents Youtube?",
        choices: ["Bright yellow", "Dark Purple", "Neon Green", "Gold"],
        answer: "Gold",
         explanation: "To the left of the grpah, there are various company logos. Once you find YouTube, you can see that Youtube is in a gold color throughout. "
      }
      messagesRef.child(3).set(q3);
      const q4 = {
        question: "If you were an artist on Spotify, how many plays do you need for you to make the minimum wage ($1472)",
        choices: ["95", "366k", "230k", "159"],
        answer: "366k",
         explanation: "Following the turquoise blue line that represents spoitfy, we can see on the table to the left that spotify  is the second row. There is a column labeled plays needed to earn minimum wage ($1472). If you  go down to the second row, it says 366k streams is needed."
      }
      messagesRef.child(4).set(q4);
    }
        
        // handle change event when user clicks on a different radio
        handleChange = event => {
          event.preventDefault();
          this.setState({
            value: event.target.value
          });
          this.state.answers.concat(event.target.value)
        };
      
        // handle change when user clicks on next button
        // checks answer and updates score
        // update page with next question
        handleClick = event => {
          this.answers = this.state.answers.concat(this.state.value);

          this.setState(state => {
            let list = this.state.answers.concat(this.state.value);
            this.state.answersRef.child("Music").child(1).set(list);
            return {
              answers: list
            };
          });
          if (this.state.questionNum == this.state.questionSnapshot.length - 2) {
            this.setState({
              isLastQuestion: true
            })
          }
          if (this.state.questionNum >= 1) {
            this.setState(state => ({
              image: music2,
              link: "http://www.visualeverything.co.uk/weve-been-checking-out-the-wonderful-work-coming/"
            }))
          }
          this.setState(state => {
            return {
              questionNum: this.state.questionNum + 1,
              value: '',
            };
          });
        }
      
        render() {
          if (this.state.uID === undefined || this.state.questionSnapshot === undefined) {
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
                  Music Quiz
                </Typography>
                {this.state.questionNum >=3 ? 
                <Typography variant="h6">
                    In the music industry, many artist complain about not making enough money on music streaming apps. The following graph shows how much these applications pay their artists. Read the following graph and answer the questions.
                </Typography> : 
                <Typography variant="h6">
                    Spotify is a streaming service that is popular among younger generations. The following graph shows the daily streaming information on Spotify. Read the graph carefully and click <NavLink href={this.state.link}>here </NavLink>if you need help.
                </Typography>}
                
                <img src={this.state.image} alt="visualization" height='500px'/>
                
                <Typography variant="h6">{this.state.questionSnapshot[this.state.questionNum].question}</Typography>

                <FormControl component="fieldset" >
                  {/* <FormLabel component="legend" >{quiz[this.state.questionNum - 1].question} of {quiz.length}</FormLabel> */}

                  <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChange}>
                    {/* map out answer options */}
                    {this.state.questionSnapshot[this.state.questionNum].choices.map(function(item, i){
                      return <FormControlLabel value={item} control={<Radio />} label={item} />;
                    })}
                  </RadioGroup>
                  
                  {this.state.isLastQuestion ? <Button variant="contained" style={{ margin: '10px'}} onClick={(event)=> {
this.state.answersRef.child("Music").child(1).set(this.state.answers.concat(this.state.value))
                  }}>
                    <Link to={{
                        pathname: '/MusicComplete',  
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

export default Music;
