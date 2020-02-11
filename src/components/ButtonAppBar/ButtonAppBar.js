import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './ButtonAppBar.css';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="white">
        <Toolbar>
          <Grid
            justify="space-between"
            container 
            spacing={24}
          >
            <Grid item>
              <Button color="white">
                <Typography variant="h6" className={classes.title}>
                  <Link to="/" className={"noDecorations"}>Scorecard</Link>
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <div>

                <Button color="white" style={{float: "right"}}>
                  <Typography variant="body1" gutterBottom>
                    <Link to="/login" className={"noDecorations"}>Login</Link>
                  </Typography>
                </Button>
                
                <Button color="white" style={{float: "right"}}>
                  <Typography variant="body1" gutterBottom>
                    <Link to="/about" className={"noDecorations"}>About</Link>
                  </Typography>
                </Button>
                
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

    </div>
  );
}