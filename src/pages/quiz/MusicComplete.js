import React, {Component} from 'react';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Quiz.css';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ExpansionPanel, 
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Container} from '@material-ui/core/';
import music1 from "./visualizations/music1.jpg"
import music2 from "./visualizations/music2.jpg"


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


function MusicComplete(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  console.log(props.location.state.answers)
  
  
  // handle change event when user clicks on a different radio
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (<React.Fragment>
    <ButtonAppBar/>
    <Container maxWidth="lg">

    
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginBottom: '10px'}}>
        Quiz Completed
      </Typography>
      {/* <Typography variant="h5">Score ={props.score}</Typography> */}

      <FormControl component="fieldset">
        
        {props.location.state.questionSnapshot.map(function(item, i){
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
            return <div>{i >= 3 ? <img src={music2} height="400px" className={classes.img}></img> : <img src={music1} height="400px"className={classes.img}></img>}
              <Typography variant="h5">{props.location.state.questionSnapshot[i].question}</Typography>
            <FormControl component="fieldset" className={classes.formControl}>
            {answers}
            </FormControl>
            <Typography variant="h6">You chose:</Typography>
            {props.location.state.answers[i - 1] === props.location.state.questionSnapshot[i].answer ? <FormControlLabel
                  value="disabled"
                  control={<Radio style={{color: 'green'}}/>}
                  label={props.location.state.answers[i - 1]}
                  color='primary'
                  checked
                /> : <React.Fragment><FormControlLabel
                value="disabled"
                control={<Radio style={{color: 'red'}}/>}
                label={props.location.state.answers[i - 1]}
                color='primary'
                checked
              />
              <ExpansionPanel defaultExpanded className={classes.expansion}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Explanation</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {props.location.state.questionSnapshot[i].explanation}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            </React.Fragment>}
            
            </div>;
          }
            
          })}
      </FormControl>
    </div>
    </Container>
    </React.Fragment>
  );
}

export default MusicComplete;
