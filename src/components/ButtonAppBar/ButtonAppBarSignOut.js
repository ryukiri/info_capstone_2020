import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import "./ButtonAppBar.css";
import { Link } from "react-router-dom";
import app from "./../firebase/base";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#B4DFE5"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#F4976C"
  },
  menuBackgroundColor: {
    backgroundColor: "#B4DFE5"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link to="/overview" className={"noDecorations"}>
          <ListItem button key={"Overview"}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Overview"} />
          </ListItem>
        </Link>
        <Link to="/dataDiary" className={"noDecorations"}>
          <ListItem button key={"Data Diary"}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Data Diary"} />
          </ListItem>
        </Link>
        <Link to="/summary" className={"noDecorations"}>
          <ListItem button key={"Summary"}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Summary"} />
          </ListItem>
        </Link>
        <Link to="/quizCategory" className={"noDecorations"}>
          <ListItem button key={"Quiz Category"}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Quiz Category"} />
          </ListItem>
        </Link>
        {/* <Link to="/quiz" className={"noDecorations"}>
          <ListItem button key={"Quiz"}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Quiz"} />
          </ListItem>
        </Link> */}
        <Link to="/leaderboard" className={"noDecorations"}>
          <ListItem button key={"Leaderboard"}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Leaderboard"} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="white">
        <Toolbar className={classes.menuBackgroundColor}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Button color="white">
                <Typography
                  variant="h6"
                  className={(classes.title, "blackFont")}
                >
                  Data Diary
                </Typography>
              </Button>
              <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
                {sideList("left")}
              </Drawer>
            </Grid>
            <Grid item>
              <div>
                <Button
                  color="white"
                  style={{ float: "right" }}
                  onClick={() => app.auth().signOut()}
                >
                  <Typography variant="body1" gutterBottom>
                    <Link to="/" className={"noDecorations"}>
                      Sign Out
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
