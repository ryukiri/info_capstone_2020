import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBar';
import './About.css';

function About() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1" component="h2">
        About Page
      </Typography>
    </div>
  );
}

export default About;
