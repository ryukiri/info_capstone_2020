import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';  

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
            Team IKEA &nbsp;| &nbsp;
                <a href="https://ischool.uw.edu/capstone" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'black'}}>
                    University of Washington Information School Capstone
                </a> 
            &nbsp; |&nbsp; Sponsered by Microsoft PowerBI
            </Typography>
        </div>
    );
}
