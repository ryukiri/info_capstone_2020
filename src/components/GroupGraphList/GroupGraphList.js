import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import graphExample from "../../assets/images/graph_example.jpg";
import app from "../../components/firebase/base";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

function getCurrentUser() {
  var user = app.auth().currentUser;

  if (user) {
    //console.log(user.uid)
    return user.uid;
  } else {
    // No user is signed in.
  }
}

var friends = [];
function getFriends() {
  // Populate friends
  let friendsRef = app
    .database()
    .ref("users/" + getCurrentUser() + "/friends/friends");
  friendsRef.on("value", function (snapshot) {
    snapshot.forEach(function (item) {
      //console.log("Current Friends: " + item.val())
      if (!friends.includes(item.val())) {
        friends.push(item.val());
      }
    });
    console.log("Friends: " + friends);
  });
}

const tileData = [
  {
    img: graphExample,
    title: "Group Graph Example",
  },
  {
    img: graphExample,
    title: "Group Graph Example",
  },
  {
    img: graphExample,
    title: "Group Graph Example",
  },
  {
    img: graphExample,
    title: "Group Graph Example",
  },
];

export default function GroupGraphList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
