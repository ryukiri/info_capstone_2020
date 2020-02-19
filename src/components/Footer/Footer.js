import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';  
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: '#B4DFE5',
      minHeight: '40px',
      paddingTop: '1%'
    },
    footerText: {
        textAlign: 'center'
    }
}));

export default function Footer({memberName, role, imageSrc, email, bio}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="body1" className={classes.footerText}>
            Team IKEA | University of Washington Capstone | Sponsered by Microsoft PowerBI
            </Typography>
        </div>
    );
}
