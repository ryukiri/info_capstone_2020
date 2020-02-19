import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/ButtonAppBar/ButtonAppBar';
import './Home.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  header: {
    margin: 'auto',
    padding: theme.spacing(8),
    paddingTop: theme.spacing(12)
  },
  titleText: {
    fontWeight: 'bold',
    color: '#D2FDFF'
  },
  button: {
    backgroundColor: '#303C6C',
    color:'#FFF'
  }
}));

function Home() {
  const classes = useStyles();
  return (
    <div>
      <div>
        <ButtonAppBar/>
        <header id="landingheader"> 
          <div className={classes.header}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs spacing={10}>
                      <Typography variant="h3" component="h4" className={classes.titleText}>
                      Data with Friends.
                      </Typography>
                      </Grid>
                      <Grid item>
                      <Typography variant="subtitle2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis enim lobortis scelerisque fermentum dui faucibus in. Tristique risus nec feugiat in fermentum posuere urna nec.</Typography>
                      </Grid>
                      <Grid item xs spacing={10}>
                      <Button variant="contained" className={classes.button}>Sign In</Button>
                      </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={6} />
              </Grid>
          </div>
        </header>
        </div>
    </div>
  );
}

export default Home;
