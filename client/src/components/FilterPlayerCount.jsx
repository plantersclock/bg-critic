import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

class FilterPlayerCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: this.props.filterPlayerCount,
    };

    this.handleChange = this.handleChange.bind(this);

    this.updateList = _.debounce(this.updateList, 300);
  }

  handleChange = (e) => {
    let playerCount = e.target.value;
    this.setState({ playerCount: playerCount });

    this.updateList(playerCount);
  };

  updateList(playerCount) {
    this.props.changeListState("filterPlayerCount", playerCount);
  }

  render() {
    let { playerCount } = this.state;
    console.log(this.props.filterPlayerCount);
    return (
      <form noValidate autoComplete="off">
        <div style={{ width: "100%" }}>
          <Grid item container xs={12} style={{ marginBottom: 24 }}>
            <TextField
              id="standard-select-year"
              label="Player Count"
              value={playerCount}
              onChange={this.handleChange}
              style={{ width: 100 }}
            ></TextField>
          </Grid>
        </div>
      </form>
    );
  }
}

export default FilterPlayerCount;
