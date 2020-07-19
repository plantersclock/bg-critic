
import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'



class FilterPlayerCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
          playerCount: ""
        };

        this.handleChange=this.handleChange.bind(this)

        this.updateList = _.debounce(this.updateList, 500);
      }

    

    handleChange = (e) => {
      let playerCount = e.target.value
      this.setState({playerCount: playerCount})

      this.updateList()
    }

    updateList(){
      this.props.changeListState("filterPlayerCount", this.state.playerCount)
    }

    render() {
      let {minPlayer} = this.state
        return (
          <form noValidate autoComplete="off">
            <div style={{width: "100%"}}>
              <Grid item container xs={12} style={{marginBottom: 24}}>
                <TextField
                  id="standard-select-year"
                  label="Player Count"
                  value={minPlayer}
                  onChange={this.handleChange}
                  style={{width: 100}}
                >

                </TextField>
              </Grid>

            </div>
          </form>
        )
    }
}

export default FilterPlayerCount
