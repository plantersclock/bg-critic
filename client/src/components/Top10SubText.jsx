import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import Divider from "@material-ui/core/Divider";

class Top10SubText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Grid item xs={12}>
          <Divider style={{ width: "100%" }} />
        </Grid>
        <Typography style={{ padding: "12px 0px" }} variant="body1">
          The following list has been generated from {this.props.xReviewers}{" "}
          reviewers' lists of the best boardgames of {this.props.year}. Games
          are scored and ranked based on their appearance on Top 10 lists by
          popular reviewers, as well as their rankings on said lists. Please{" "}
          <a style={{ color: "#333333" }} href="mailto: tabletop10@support.com">
            contact us
          </a>{" "}
          if you feel a list should be added to the data set.{" "}
        </Typography>

        <Grid item xs={12}>
          <Divider style={{ width: "100%" }} />
        </Grid>
        <Grid container item xs={12}>
          <Typography style={{ padding: "12px 0px" }} variant="caption">
            Data Compiled By: Matthew Wright
          </Typography>
        </Grid>
      </div>
    );
  }
}

export default Top10SubText;
