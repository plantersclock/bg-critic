
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';


function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <div style={{height: 72}}>
                <HideOnScroll >
                    <AppBar>
                        <Toolbar>
                            
                            <Grid container >
                                <Grid item xs={12}><Typography variant="h4">Top 10 Boardgames</Typography></Grid>
                                {/* <Grid item xs={2}></Grid>
                                <Grid container item xs={12}>
                                    <Grid container item alignItems="center" justify="center" xs={4}>
                                        <Link style={{color:"white"}} to="/">List</Link>
                                    </Grid>
                                    <Grid container item  alignItems="center" justify="center" xs={4}>
                                        <Link style={{color:"white"}} to="/top10/create">Create</Link>
                                    </Grid>
                                    <Grid container item alignItems="center" justify="center" xs={4}>
                                        <Link style={{color:"white"}} to="/top10/update/1">Update</Link>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}></Grid> */}
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                
            </div>
        )
    }
}

export default NavBar