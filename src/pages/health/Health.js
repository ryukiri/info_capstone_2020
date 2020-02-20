import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Health.css';

function Health() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1">
        HEALTH PAGE
      </Typography>
    </div>
  );
}

export default Health;
