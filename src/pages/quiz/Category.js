import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBarSignOut';
import './Quiz.css';

function Category() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1">
        Quiz Category PAGE
      </Typography>
    </div>
  );
}

export default Category;
