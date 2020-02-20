import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Food.css';

function Food() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1">
        FOOD PAGE
      </Typography>
    </div>
  );
}

export default Food;
