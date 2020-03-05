import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Quiz.css';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    padding: theme.spacing(4)
  },
  formTitle: {
    fontSize: '17pt',
    fontWeight:'bold'
  }
}));

var quiz = [{
  "question": "Question 1",
  "choices": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  "answer": "Answer 2"
}, {
  "question": "Question 2",
  "choices": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  "answer": "Answer 3"
}, {
  "question": "Question 3",
  "choices": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  "answer": "Answer 1"
}, {
  "question": "Question 4",
  "choices": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  "answer": "Answer 4"
}, {
  "question": "Question 5",
  "choices": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  "answer": "Answer 3"
}, {
  "question": "Question 6",
  "choices": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  "answer": "Answer 2"
}];

function Quiz() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [questionNum, setQNum] = React.useState(0);
  const [score, setScore] = React.useState(0);
  
  // handle change event when user clicks on a different radio
  const handleChange = event => {
    setValue(event.target.value);
  };

  // handle change when user clicks on next button
  // checks answer and updates score
  // update page with next question
  const handleClick = event => {
    if(questionNum < quiz.length - 1) {
      if (value == quiz[questionNum].answer) {
        setScore(score+1);
      }
      setQNum(questionNum + 1);
      setValue('')
    }
  }

  return (
    <div>
      <ButtonAppBar/>
      <Typography className={classes.root} variant="h3">
        QUIZ PAGE
      </Typography>
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend" className={classes.formTitle}>{quiz[questionNum].question} of {quiz.length}</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          {/* map out answer options */}
          {quiz[questionNum].choices.map(function(item, i){
            return <FormControlLabel value={item} control={<Radio />} label={item} />;
          })}
        </RadioGroup>
        <Button variant="contained" onClick={handleClick}>Next</Button>
        <Typography>[Temporary for testing] Score = {score}</Typography>
      </FormControl>
    </div>
  );
}

export default Quiz;
