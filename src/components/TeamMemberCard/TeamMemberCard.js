import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 175,
    },
    root2: {
      textAlign: "left",
      [theme.breakpoints.down('sm')]: {
        textAlign: "center",
      },
      emailIcon: {
        padding: '20px',
      },
    },
  }));
  
  export default function TeamMemberCard({memberName, role, imageSrc, email, bio}) {
    const classes = useStyles();
  
    return (
      <Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <img src={imageSrc} alt='' className={classes.root}></img>
            </Grid>
            <Grid item item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.root2}>
                <Typography variant="h5" component="h5">{memberName}</Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">{role}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{bio}</Typography>
                <Grid container>
                  <Grid item className={classes.emailIcon}>
                    <EmailIcon />
                  </Grid>
                  <Grid item className={classes.emailIcon}> 
                    <Typography variant="caption" color="textSecondary" component="p">{email}</Typography>
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
      </Box>
    );
  }