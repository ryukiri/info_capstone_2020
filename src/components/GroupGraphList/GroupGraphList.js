import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import graphExample from '../../assets/images/graph_example.jpg';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

const tileData = [
    {
        img: graphExample,
        title: 'Group Graph Example',
    },
    {
        img: graphExample,
        title: 'Group Graph Example',
    },
    {
        img: graphExample,
        title: 'Group Graph Example',
    },
    {
        img: graphExample,
        title: 'Group Graph Example',
    },
]

export default function GroupGraphList() {

    const classes = useStyles();

    return (
    <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
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