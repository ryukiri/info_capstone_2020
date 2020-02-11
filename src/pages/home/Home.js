import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBar';
import './Home.css';

function Home() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1" component="h2">
        Home Page
      </Typography>
    </div>
  );
}

export default Home;
