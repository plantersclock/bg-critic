
import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import '../style/NavBar.css';
// import {ReactComponent as TT10Logo} from '../media/logo.svg';





class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <div style={{height: 78}}>

                        <Toolbar style={{height: 78, backgroundColor: "#64817a"}}>
                        <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
                            <Grid item xs= {12} sm = {10} md={10} lg={8} xl={6} container direction="row" spacing={4}  >
                            <Grid item container xs={12}>
                                <Grid item container xs={12}>
                                    <div className="navbar-left-text">
                                        {/* <TT10Logo className="navbar-logo"  /> */}
                                        <Typography style={{paddingLeft: 12}} className ="navbar-left-text-font">
                                            <span style={{color: "white"}}>Table</span>
                                            <span style={{color: "white", textDecoration: "underline"}}>Top10</span>
                                        </Typography>
                                    </div>


                                </Grid>
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
                            </Grid>
                        <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
                        </Toolbar>


            </div>
        )
    }
}

export default NavBar
