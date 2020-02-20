import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Quiz.css';

function Quiz() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1">
        QUIZ PAGE
      </Typography>
    </div>
  );
}

export default Quiz;
