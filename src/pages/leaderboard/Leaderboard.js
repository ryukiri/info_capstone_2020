import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Leaderboard.css';

function Leaderboard() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1">
        LEADERBOARD PAGE
      </Typography>
    </div>
  );
}

export default Leaderboard;
