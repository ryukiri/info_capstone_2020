import "./Quiz.css";

import { Container, Grid } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import music from "../../assets/images/music.svg";
import sports from "../../assets/images/sports.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    paddingTop: theme.spacing(5),
  },
  bottomPad: {
    paddingBottom: theme.spacing(5),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function Category() {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#D2FDFF",
      },
      secondary: {
        main: "#303C6C",
      },
    },
  });

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <ButtonAppBar />
        <header className="header">
          <Typography variant="h3" style={{ textAlign: "center" }}>
            Pick a Quiz Category
          </Typography>
          <Typography
            variant="h6"
            className={classes.bottomPad}
            style={{ textAlign: "center" }}
          >
            Earn 50 points for every quiz you take!
          </Typography>
        </header>
        <Container className={classes.container}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center">
              <Card style={{ margin: "20px" }}>
                <CardContent>
                  <Grid
                    container
                    spacing={8}
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      align="center"
                    >
                      <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        style={{
                          paddingTop: "10px",
                          color: "#303C6C",
                          fontWeight: "bold",
                        }}
                      >
                        Sports
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        component="p"
                        gutterBottom
                        style={{
                          paddingBottom: "20px",
                          color: "#303C6C",
                          fontWeight: "bold",
                        }}
                      >
                        Take a quiz about sports data visualizations.
                      </Typography>
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                      >
                        <Link
                          to="/quiz"
                          className={"noDecorationsButton"}
                          style={{ color: "white" }}
                        >
                          Take Quiz
                        </Link>
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      align="center"
                    >
                      <img src={sports} style={{ width: "75%" }} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center">
              <Card style={{ margin: "20px" }}>
                <CardContent>
                  <Grid container justify="flex-start" alignItems="center">
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      align="center"
                    >
                      <img src={music} style={{ width: "75%" }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      align="center"
                    >
                      <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        style={{
                          paddingTop: "10px",
                          color: "#303C6C",
                          fontWeight: "bold",
                        }}
                      >
                        Music
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        component="p"
                        gutterBottom
                        style={{
                          paddingBottom: "20px",
                          color: "#303C6C",
                          fontWeight: "bold",
                        }}
                      >
                        Enjoy listening to music? Here's a quiz about music
                        data.
                      </Typography>
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                      >
                        <Link
                          to="/musicQuiz"
                          className={"noDecorationsButton"}
                          style={{ color: "white" }}
                        >
                          Take Quiz
                        </Link>
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    </div>
  );
}

export default Category;
