
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';





class FilterTopX extends Component {
    constructor(props) {
        super(props);


        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(e){
      this.props.changeListState(e.target.name, e.target.value)
    }



    render() {
      let {topX} = this.props

        return (
            <div style={{width: "100%"}}>               
              <Grid container xs={12}>
                <TextField style={{minWidth: 120}}
                    labelId="top-x-filter"
                    id="top-x-filter"
                    name="topX"
                    label="Display"
                    select
                    defaultValue={topX}
                    value={topX}
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