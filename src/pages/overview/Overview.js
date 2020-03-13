import React, { Component } from "react";
import * as $ from "jquery";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import hash from "./../signup/hash";
import GroupGraphList from  "../../components/GroupGraphList/GroupGraphList"

import "./Overview.css";

import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes
} from "./../../components/spotify/config";
import TopArtist from "./../signup/TopArtist";
import Summary from "../summary/Summary";

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      top_artist: null
    };
    this.getTopArtist = this.getTopArtist.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getTopArtist(_token);
    }
  }

  getTopArtist(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          top_artist: data.items[0].name
        });
        console.log(data.items);
      }
    });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <ButtonAppBar />
        <div>
          <header>
            <Typography variant="h3" component="h4" className="titleText">
              John Doe
            </Typography>

            <div className={"header"}>
              <Grid container spacing={2} className={"topGrid"}>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <div className={"center"}>
                      <CircularProgress
                        variant="static"
                        value={66}
                        size={300}
                        thickness={7}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <Typography
                      variant="h4"
                      align="center"
                      className={"rank"}
                      gutterBottom
                    >
                      Level:
                    </Typography>
                    <Typography variant="h4" align="center" gutterBottom>
                      Rank:
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2} className={"groups"}>
                <GroupGraphList />
              </Grid>

              <Grid container spacing={2} className={"summary"}>
                {/*<Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    {!this.state.token && (
                      <a
                        className="btn btn--loginApp-link"
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                          "%20"
                        )}&response_type=token&show_dialog=true`}
                      >
                        Login to Spotify
                      </a>
                    )}
                    {this.state.token && (
                      <Typography>
                        Your top artist is {this.state.top_artist}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item>
                    <Typography>Side 2</Typography>
                  </Grid>
                    </Grid>*/}
              </Grid>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default Overview;
