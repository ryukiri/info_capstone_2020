import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import { Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/teal";
import "./Leaderboard.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

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
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div>
      <ButtonAppBar />
      <Container className={classes.container}>
        <Typography variant="h3">Leaderboard</Typography>

        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Friends" {...a11yProps(0)} />
            <Tab label="School" {...a11yProps(1)} />
            <Tab label="Grade" {...a11yProps(2)} />
            <Tab label="All" {...a11yProps(3)} />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
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
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              School
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Grade
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              All
            </TabPanel>
          </SwipeableViews>
        </div>
      </Container>
    </div>
  );
}

export default Leaderboard;
