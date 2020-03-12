import React, {Component} from 'react';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Quiz.css';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import {ExpansionPanel, 
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio} from '@material-ui/core/';


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
    margin: theme.spacing(2)
  },
  body: {
    margin:'auto',
    padding: theme.spacing(1),
  }
}));


function QuizComplete(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  
  // handle change event when user clicks on a different radio
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">
        Quiz Completed
      </Typography>
      <Typography variant="h5">Score ={props.score}</Typography>

      <FormControl component="fieldset">
        
        {props.quiz.map(function(item, i){
            let answers = [];
            item.choices.forEach(choice => {
              if (choice === item.answer) {
                answers.push(<FormControlLabel
                  value="disabled"
                  control={<Radio />}
                  label={choice}
                  color='primary'
                  checked
                />);
              } else {
                answers.push(<FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label={choice}
                />)
              }
          });
            return <div><Typography variant="h5">{props.quiz[i].question}</Typography>
            <FormControl component="fieldset" className={classes.formControl}>
            {answers}
            </FormControl>
            <ExpansionPanel className={classes.expansion}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Explanation</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>;
          })}
      </FormControl>
    </div>
  );
}

export default QuizComplete;
