import "./About.css";

import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBar";
import React from "react";
import Typography from "@material-ui/core/Typography";

function About() {
  return (
    <div>
      <ButtonAppBar />
      <Typography variant="h1" component="h2">
        About Page
      </Typography>
    </div>
  );
}

export default About;
