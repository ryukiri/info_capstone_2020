import React from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import { Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/teal";
import "./Leaderboard.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    paddingTop: theme.spacing(5)
  },
  paddingBottom: {
    paddingBottom: theme.spacing(5)
  },
  paperRed: {
    backgroundColor: red[400],
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center"
  },
  paperPurple: {
    backgroundColor: purple[400],
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center"
  },
  paperBlue: {
    backgroundColor: blue[400],
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center"
  },
  paperTeal: {
    backgroundColor: teal[600],
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center"
  }
}));

function Leaderboard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ButtonAppBar />
      <Container className={classes.container}>
        <Typography variant="h3">Leaderboard</Typography>

        <Tabs
          className={classes.paddingBottom}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Friends" />
          <Tab label="All" />
          <Tab label="School" />
          <Tab label="Grade" />
        </Tabs>

        <Container className={classes.paddingBottom}>
          <Paper className={classes.paperRed}>xs=12</Paper>
        </Container>

        <Container className={classes.paddingBottom}>
          <Paper className={classes.paperPurple}>xs=12</Paper>
        </Container>

        <Container className={classes.paddingBottom}>
          <Paper className={classes.paperBlue}>xs=12</Paper>
        </Container>

        <Container className={classes.paddingBottom}>
          <Paper className={classes.paperTeal}>xs=12</Paper>
        </Container>
      </Container>
    </div>
  );
}

export default Leaderboard;
