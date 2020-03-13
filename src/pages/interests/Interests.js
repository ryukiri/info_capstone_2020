import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import "./Interests.css";
import app from "./../../components/firebase/base";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

function submit(s) {
  console.log(s.interests);
  var interests = s.interests
  var currentUser = getCurrentUser()
  currentUser = String(currentUser)
  var email = getUserEmail()
  email = String(email)
  var diaryRef = app.database().ref("users/");
  diaryRef.child(currentUser).set({
    interests,
    email
  });

  //getInterests(s);
}

function getCurrentUser() {
  var user = app.auth().currentUser;

  if (user) {
    //console.log(user.uid)
    return user.uid;
  } else {
    // No user is signed in.
  }
}

function getUserEmail() {
    var user = app.auth().currentUser;
  
    if (user) {
      //console.log(user.uid)
      return user.email;
    } else {
      // No user is signed in.
    }
  }

export default function Interests() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    baseball: false,
    basketball: false,
    football: false,
    frisbee: false,
    pizza: false,
    soccer: false,
    spiderman: false,
    starwars: false,
    swimming: false,
    interests: []
  });

  const handleChange = name => event => {
    console.log(event.target.value);
    setState({
      ...state,
      [name]: event.target.checked,
      interests: state.interests.concat(event.target.value)
    });
  };

  const {
    baseball,
    basketball,
    football,
    frisbee,
    pizza,
    soccer,
    spiderman,
    starwars,
    swimming
  } = state;

  const error =
    [
      baseball,
      basketball,
      football,
      frisbee,
      pizza,
      soccer,
      spiderman,
      starwars,
      swimming
    ].filter(v => v).length !== 2;

  return (
    <div>
      <ButtonAppBar />
      <Typography variant="h1">INTERESTS PAGE</Typography>

      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            Please pick all your interests
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={baseball}
                  onChange={handleChange("baseball")}
                  value="baseball"
                />
              }
              label="baseball"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={basketball}
                  onChange={handleChange("basketball")}
                  value="basketball"
                />
              }
              label="basketball"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={football}
                  onChange={handleChange("football")}
                  value="football"
                />
              }
              label="football"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={pizza}
                  onChange={handleChange("pizza")}
                  value="pizza"
                />
              }
              label="pizza"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={soccer}
                  onChange={handleChange("soccer")}
                  value="soccer"
                />
              }
              label="soccer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={spiderman}
                  onChange={handleChange("spiderman")}
                  value="spiderman"
                />
              }
              label="spiderman"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={starwars}
                  onChange={handleChange("starwars")}
                  value="star wars"
                />
              }
              label="starwars"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={swimming}
                  onChange={handleChange("swimming")}
                  value="swimming"
                />
              }
              label="swimming"
            />
          </FormGroup>
        </FormControl>
      </div>
      <Button variant="contained" onClick={submit(state)}>
        <Link to="/datadiary" className="noDecorations">
          Submit
        </Link>
      </Button>
    </div>
  );
}
