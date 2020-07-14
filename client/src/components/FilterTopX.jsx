
import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';






class FilterTopX extends Component {
    constructor(props) {
        super(props);
        this.state = {
          topX: this.props.topX
        }

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = async (e) => {
      await this.setState({topX: e.target.value})
      this.props.changeListState(e.target.name, e.target.value)
    }



    render() {

        return (
            <div style={{width: "100%"}}>               
              <Grid item container xs={12}>
                <TextField style={{minWidth: 120}}
                    id="top-x-filter"
                    name="topX"
                    label="Display"
                    select
                    defaultValue={this.state.topX}
                    value={this.state.topX}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    <MenuItem value={70}>70</MenuItem>
                    <MenuItem value={80}>80</MenuItem>
                    <MenuItem value={90}>90</MenuItem>
                    <MenuItem value={100}>100</MenuItem>

                  
                </TextField>
              </Grid>     
                          
            </div>
        )
    }
}

export default FilterTopX