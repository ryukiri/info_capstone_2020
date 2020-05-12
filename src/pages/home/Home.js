import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBar";
import "./Home.css";
import Grid from "@material-ui/core/Grid";
import TeamMemberCard from "../../components/TeamMemberCard/TeamMemberCard";
import Footer from "../../components/Footer/Footer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import BarChartIcon from "@material-ui/icons/BarChart";
import GetAppIcon from "@material-ui/icons/GetApp";
import GroupIcon from "@material-ui/icons/Group";
import { VictoryPie } from "victory";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import austin from "../../assets/images/austin_pic.jpg";
import emma from "../../assets/images/emma_pic.jpg";
import ian from "../../assets/images/ian_pic.jpeg";
import kathy from "../../assets/images/kathy_pic.jpg";
import data_vis from "../../assets/images/data_vis.svg";
import blue_person from "../../assets/images/blue_person.svg";
import data from "../../assets/images/data.svg";
import orange_person from "../../assets/images/orange_person.svg";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px",
  },
  root3: {
    paddingRight: "50px",
    paddingLeft: "50px",
    paddingBottom: "50px",
  },
  featurePage: {
    backgroundColor: "#303C6C",
  },
  feature: {
    maxWidth: "200px",
    textAlign: "center",
  },
  featureContainer: {
    justifyContent: "space-around",
    padding: "50px",
  },
  icon: {
    padding: "20px",
    fontSize: "100px",
    color: "#F4976C",
  },
  aboutPage: {
    padding: "30px",
    fontWeight: "bold",
    color: "#F4976C",
  },
  featureTitle: {
    paddingTop: "30px",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  featureText: {
    color: "#FFFFFF",
  },
  dataIcon: {
    maxWidth: "400px",
  },
  definitionTitle: {
    paddingBottom: "60px",
    fontWeight: "bold",
    color: "#B4DFE5",
  },
  statHighlight: {
    color: "#F4976C",
    fontWeight: "bold",
    fontSize: "38pt",
  },
  statBody: {
    textAlign: "left",
    maxWidth: "200px",
  },
  body2: {
    fontSize: "14pt",
    color: "#303C6C",
  },
  personIcon: {
    maxWidth: "40px",
  },
  problemContainer: {
    maxWidth: "200px",
  },
  problem2Container: {
    maxWidth: "400px",
  },
  header: {
    margin: "auto",
    padding: theme.spacing(8),
    paddingTop: theme.spacing(12),
  },
  titleText: {
    fontWeight: "bold",
    color: "#D2FDFF",
  },
  button: {
    backgroundColor: "#303C6C",
    color: "#FFF",
  },
}));

function Home() {
  const [graphicData, setGraphicData] = useState([{ y: 0 }, { y: 100 }]);
  useEffect(() => {
    setGraphicData([
      { x: " ", y: 86 },
      { x: " ", y: 14 },
    ]); // Setting the data that we want to display
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <div>
        <div>
          <ButtonAppBar />
          <header id="landingheader">
            <div className={classes.header}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs spacing={10}>
                      <Typography
                        variant="h3"
                        component="h4"
                        className={classes.titleText}
                      >
                        Data with Friends.
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        As data becomes more and more pervasive with the 4th
                        industrial revolution, the skills to analyze and
                        interpret data become even more essential for students.
                        However, for K-12 schools, the data culture is almost
                        nonexistent, with only about 14% of schools in the US
                        offering data analytics and data visualization
                        opportunities to students. Data Diary allows for
                        students to track their own data and increase their data
                        literacy skills.
                      </Typography>
                    </Grid>
                    <Grid item xs spacing={10}>
                      {/*<Button variant="contained" className={classes.button}>
                        <Link
                          to="/login"
                          className="noDecorations signInButton"
                        >
                          Sign In
                        </Link>
                      </Button>*/}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={6} />
              </Grid>
            </div>
          </header>
        </div>

        <div>
          <Grid
            container
            className={classes.root}
            spacing={8}
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center">
              <img src={data_vis} alt="" className={classes.dataIcon} />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center">
              <Typography variant="h3" className={classes.definitionTitle}>
                Why care about teaching data literacy?
              </Typography>
              <Grid container spacing={7} justify="center">
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Grid container justify="center">
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      className={classes.problemContainer}
                    >
                      <Typography
                        variant="h4"
                        display="block"
                        className={classes.statHighlight}
                      >
                        86%
                      </Typography>
                      <VictoryPie
                        colorScale={["#F4976C", "#303C6C"]}
                        animate={{ easing: "exp", duration: 20000 }}
                        data={graphicData}
                        innerRadius={100}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      className={classes.statBody}
                    >
                      <Typography
                        variant="body1"
                        display="inline"
                        className={classes.body2}
                      >
                        of schools don't provide data analytics and data
                        visualization opportunities to students
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className={classes.problem2Container}
                >
                  <img
                    src={orange_person}
                    alt=""
                    className={classes.personIcon}
                  />
                  <img
                    src={blue_person}
                    alt=""
                    className={classes.personIcon}
                  />
                  <img
                    src={blue_person}
                    alt=""
                    className={classes.personIcon}
                  />
                  <img
                    src={blue_person}
                    alt=""
                    className={classes.personIcon}
                  />
                  <img
                    src={blue_person}
                    alt=""
                    className={classes.personIcon}
                  />
                  <Typography variant="h4" className={classes.statHighlight}>
                    1 out of 5
                  </Typography>
                  <Typography variant="body1" className={classes.body2}>
                    people felt they were data literate based on a worldwide
                    study with over 11,000 participants
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={8}
            justify="center"
            className={classes.root3}
            mx="auto"
          >
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center">
              <Typography variant="h3" className={classes.definitionTitle}>
                What is Data Diary?
              </Typography>
              <Typography variant="subtitle1" className={classes.body2}>
                Data Diary teaches critical data literacy skills to middle
                school students by providing data visualizations based on data
                that is relevent to their lives. Through this platform, students
                will answer several questions about different topics such as
                their interests and their daily life every night. Then the app
                will display data visualizations created by aggregating the data
                from all the students in a school so students are exxposed to
                data visualizations that are relevent to their daily lives.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} align="center">
              <img src={data} alt="" className={classes.dataIcon} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.featurePage}>
          <Typography
            color={theme.primary}
            variant="h2"
            component="h3"
            align="center"
            className={classes.featureTitle}
          >
            Features
          </Typography>

          <Grid
            container
            spacing={4}
            justify="center"
            className={classes.featureContainer}
          >
            <Grid item>
              <Box className={classes.feature}>
                <LibraryMusicIcon className={classes.icon} />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                  className={classes.featureText}
                >
                  Connected with Entertainment apps such as Spotify and Netflix
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classes.feature}>
                <BarChartIcon className={classes.icon} />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                  className={classes.featureText}
                >
                  Unique interactive data visualization game based on data
                  inputed from students
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classes.feature}>
                <GetAppIcon className={classes.icon} />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                  className={classes.featureText}
                >
                  Allow teachers to export data in order to incorporate relevant
                  data into their daily lessons
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classes.feature}>
                <GroupIcon className={classes.icon} />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                  className={classes.featureText}
                >
                  Ability to create groups (i.e. classrooms or friend groups)
                  and only see data from that group
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>

        <div>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            This project will be continuned by the Microsoft Power BI Team after
            May 27th 2020. If you have any question about our project please
            email Maggie Tsang at <strong>Maggie.Tsang@microsoft.com</strong>
          </Alert>

          <Typography
            variant="h2"
            component="h3"
            align="center"
            className={classes.aboutPage}
          >
            About Us
          </Typography>

          <Grid container spacing={4} className={classes.root}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3} align="center">
              <TeamMemberCard
                memberName="Ian Callender"
                role="UX Designer"
                email="iancalle@uw.edu"
                imageSrc={ian}
                bio="Ian is a senior student in the Information school at the University of Washington.
            He is interested in UX Design and Front-end Development. He has experience in full stack
            development and is excited to apply what he has learned to help improve data literacy education"
              ></TeamMemberCard>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3} align="center">
              <TeamMemberCard
                memberName="Katherine Lu"
                role="Front-end Developer"
                email="kathlu@uw.edu"
                imageSrc={kathy}
                bio="Katherine is majoring in Informatics and Korean. She is interested in front end web development 
            and spent the past summer interning at Liberty Mutual Insurance working with projects in React."
              ></TeamMemberCard>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3} align="center">
              <TeamMemberCard
                memberName="Xueqi Xia"
                role="Product Manager"
                email="bukiemma@uw.edu"
                imageSrc={emma}
                bio="Emma Xia is a senior majoring in Informatics and Business. Her interest in SDLC development and project management 
            has helped her lead several student projects and will continue grow along with our project."
              ></TeamMemberCard>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3} align="center">
              <TeamMemberCard
                memberName="Austin Quach"
                role="Back-end Developer"
                email="austinqq@uw.edu"
                imageSrc={austin}
                bio="Austin is an Informatics senior on the Data Science track. He is interested in building useful applications that 
            help make everyday tasks more efficient. In his free time, he enjoys listening and producing music, photography,
             and creating cinematic films."
              ></TeamMemberCard>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
