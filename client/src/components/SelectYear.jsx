import React, { Component } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class SelectYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: this.props.year,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (e) => {
    this.setState({ year: e.target.value });
    this.props.changeYear(e.target.value);
  };

  render() {
    let { year } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <Grid item container xs={12} style={{ marginBottom: 12 }}>
          <TextField
            id="standard-select-year"
            select
            label="Select Year"
            value={year}
            onChange={this.handleChange}
            style={{ width: 100 }}
          >
            {["2019", "2018", "2017", "2016", "2015"].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </div>
    );
  }
}

export default SelectYear;
