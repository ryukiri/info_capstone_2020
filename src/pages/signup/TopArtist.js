import "./Player.css";

import React from "react";

const TopArtist = props => {
  console.log(props)

  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.top_artist}</div>
        </div>
      </div>
    </div>
  );
}

export default TopArtist;
