import "./Signup.css";

import * as $ from "jquery";

import React, { Component } from "react";
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes
} from "./../../components/spotify/config";

import Overview from "../overview/Overview";
import hash from "./hash";

class Personalize extends Component {
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
    return (
      <div className="App">
        <header className="App-header">
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
            <Overview
              top_artist={this.state.top_artist}
            />
          )}
        </header>
      </div>
    );
  }
}

export default Personalize;
