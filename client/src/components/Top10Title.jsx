
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';





class Top10Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
      let {topX} = this.props
        return (
            <div style={{width: "100%"}}>               
              <Grid item container xs={12}>
                <Typography style={{paddingTop: 30, paddingLeft: 10}} gutterBottom variant="h3">Top {topX} Boardgames of 2019</Typography>
              </Grid>     
                          
            </div>
        )
    }
}

export default Top10Title