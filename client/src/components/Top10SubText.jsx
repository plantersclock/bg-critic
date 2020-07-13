
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';





class Top10SubText extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <div style={{width: "100%"}}>
                  <Grid item xs={12}>
                    <Divider style={{width: "100%"}} />
                  </Grid>
                  <Typography style={{padding: "12px 0px"}} variant="body1">Generated from {this.props.xReviewers} reviewers' lists of the best boardgames of 2019</Typography>

                  <Grid  item xs={12}>
                    <Divider style={{width: "100%"}} />
                  </Grid>
                  <Grid container item xs={12}>
                    <Typography style={{padding: "12px 0px"}} variant="caption">Data Compiled By: Matthew Wright</Typography>
                  </Grid>

            </div>
        )
    }
}

export default Top10SubText
