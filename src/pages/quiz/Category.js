import React from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import "./Quiz.css";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


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
  bottomPad: {
    paddingBottom: theme.spacing(5)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

function Category() {
  const classes = useStyles();

  return (
    <div>
      <ButtonAppBar />
      <Container className={classes.container}>
        <Typography variant="h3">
          Pick a Quiz Category
        </Typography>
        <Typography variant="h6" className={classes.bottomPad}>Earn 50 points for every quiz you take!</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Quiz Category
                </Typography>
                <Typography variant="h5" component="h2">
                  Sports
                </Typography>
                <Typography variant="body2" component="p">
                  Take a quiz about sports data visualizations.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                <Link to='/quiz' className={"noDecorations"}>
                  Take Quiz
                </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Quiz Category
                </Typography>
                <Typography variant="h5" component="h2">
                  Music
                </Typography>
                <Typography variant="body2" component="p">
                  Enjoy listening to music? Here's a quiz about music data.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                <Link to='/musicQuiz' className={"noDecorations"}>
                  Take Quiz
                </Link></Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Lorem ipsum
                </Typography>
                <Typography variant="h5" component="h2">
                  Category Name
                </Typography>
                <Typography variant="body2" component="p">
                  Category description goes here.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Button</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Lorem ipsum
                </Typography>
                <Typography variant="h5" component="h2">
                  Category Name
                </Typography>
                <Typography variant="body2" component="p">
                  Category description goes here.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Button</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Category;
