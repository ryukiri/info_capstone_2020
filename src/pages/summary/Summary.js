import React from "react";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBarSignOut";
import "./Summary.css";

function Summary() {
  return (
    <div>
      <ButtonAppBar />
      <Typography variant="h1">Summary PAGE</Typography>
    </div>
  );
}

export default Summary;
