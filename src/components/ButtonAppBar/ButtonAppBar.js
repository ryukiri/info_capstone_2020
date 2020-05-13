import "./ButtonAppBar.css";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#B4DFE5",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#F4976C",
  },
  menuBackgroundColor: {
    backgroundColor: "#B4DFE5",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="white">
        <Toolbar className={classes.menuBackgroundColor}>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Button color="white">
                <Typography variant="h6" className={classes.title}>
                  <Link to="/" className={"noDecorations"}>
                    Data Diary
                  </Link>
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <div>
                <Button color="white" style={{ float: "right" }}>
                  <Typography variant="body1" gutterBottom>
                    <Link to="/login" className={"noDecorations"}>
                      Login
                    </Link>
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
