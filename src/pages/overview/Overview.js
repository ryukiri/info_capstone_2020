import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Overview.css';

function Overview() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1">
        OVERVIEW PAGE
      </Typography>
    </div>
  );
}

export default Overview;
