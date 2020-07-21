import React, { Component } from "react";
import api from "../api";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class SelectYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: this.props.year,
      selectableYears: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.getYears();
  }

  componentDidMount() {
    this.getYears();
  }

  getYears = async () => {
    let stuff = await api.getYears();
    let years = stuff.data.data.map((year) => year.toString());
    this.setState({ selectableYears: years });
  };

  handleChange = async (e) => {
    let newYear = e.target.value;
    this.setState({ year: newYear });
    this.props.changeYear(newYear);
  };

  render() {
    let { year, selectableYears } = this.state;

    return (
      <div style={{ width: "100%", marginLeft: 12 }}>
        <Grid item container xs={12} style={{ marginBottom: 12 }}>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: 500, marginBottom: 6 }}>
              Year
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-select-year"
              select
              value={year}
              onChange={this.handleChange}
              style={{ width: 100 }}
            >
              {selectableYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SelectYear;
