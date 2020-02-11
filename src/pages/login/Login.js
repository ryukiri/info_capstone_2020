import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBar';
import './Login.css';

function Login() {
  return (
    <div>
      <ButtonAppBar/>
      <Typography variant="h1" component="h2">
        Login Page
      </Typography>
    </div>
  );
}

export default Login;
