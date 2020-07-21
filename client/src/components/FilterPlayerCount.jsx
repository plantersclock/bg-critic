import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

const marks = [
  {
    value: 0,
    label: "All",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
];

class FilterPlayerCount extends Component {
  constructor(props) {
    super(props);
    this.state = { playerCount: this.props.filterPlayerCount };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCommitted = this.handleChangeCommitted.bind(this);
  }

  handleChange = (e, newValue) => {
    this.setState({ playerCount: Number(newValue) });
  };

  handleChangeCommitted = (e, newValue) => {
    let playerCount = Number(newValue);
    this.props.changeListState("filterPlayerCount", playerCount);
  };

  render() {
    let { playerCount } = this.state;
    if (playerCount) {
      console.log("meow");
    } else {
      console.log("POOP");
    }
    return (
      <form noValidate autoComplete="off" style={{ marginLeft: 12 }}>
        <div style={{ width: "100%" }}>
          <Grid item container xs={12} style={{ marginBottom: 24 }}>
            <Grid item xs={12}>
              <Typography style={{ fontWeight: 500, marginBottom: 12 }}>
                Player Count
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Slider
                id="standard-select-year"
                label="Player Count"
                aria-label="custom thumb label"
                valueLabelDisplay="auto"
                onChangeCommitted={this.handleChangeCommitted}
                onChange={this.handleChange}
                value={playerCount ? playerCount : 0}
                min={0}
                max={20}
                style={{ marginLeft: 6, width: 200 }}
                marks={marks}
              />
            </Grid>
          </Grid>
        </div>
      </form>
    );
  }
}

export default FilterPlayerCount;
