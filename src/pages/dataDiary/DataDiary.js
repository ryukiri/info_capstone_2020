import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import "./DataDiary.css";

class DataDiary extends Component {
  render() {
    return (
      <div>
        <ButtonAppBar />

        <header className="diaryHeader">
          <Typography variant="h3" className="center title">
            Your Personalized Data Diary
          </Typography>
        </header>

        <div className="questions">
          <Container maxWidth="md">
            <Card>
              <CardContent>
                <Container maxWidth="md">
                  <form noValidate autoComplete="off" className="form">
                    <div className="form">
                      <Typography variant="h6">
                        1. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ut quam quam, pretium non augue in, aliq?
                      </Typography>
                      <TextField fullWidth id="standard-basic" label="" />
                    </div>
                    <div className="form">
                      <Typography variant="h6">
                        2. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ut quam quam, pretium non augue in, aliq?
                      </Typography>
                      <TextField fullWidth id="standard-basic" label="" />
                    </div>
                    <div className="form">
                      <Typography variant="h6">
                        3. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ut quam quam, pretium non augue in, aliq?
                      </Typography>
                      <TextField fullWidth id="standard-basic" label="" />
                    </div>
                    <div className="form">
                      <Typography variant="h6">
                        4. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ut quam quam, pretium non augue in, aliq?
                      </Typography>
                      <TextField fullWidth id="standard-basic" label="" />
                    </div>
                    <div className="form">
                      <Typography variant="h6">
                        5. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ut quam quam, pretium non augue in, aliq?
                      </Typography>
                      <TextField fullWidth id="standard-basic" label="" />
                    </div>
                  </form>
                  <Button variant="contained">
                    <Link to='/summary' className="noDecorations">Submit</Link>
                  </Button>
                </Container>
              </CardContent>
            </Card>
          </Container>
        </div>
      </div>
    );
  }
}

export default DataDiary;
