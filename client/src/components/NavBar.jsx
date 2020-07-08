
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';





class NavBar extends Component {
    render() {
        return (
            <div style={{backgroundColor: "gray", height: 80}}>
                <Grid container >
                    <Grid item lg={2}></Grid>
                    <Grid container item lg={8}>
                        <Grid container item alignItems="center" justify="center" lg={4}>
                            <Link to="/top10/list">list</Link>
                        </Grid>
                        <Grid container item  alignItems="center" justify="center" lg={4}>
                            <Link to="/top10/create">create</Link>
                        </Grid>
                        <Grid container item alignItems="center" justify="center" lg={4}>
                            <Link to="/top10/update/1">update</Link>
                        </Grid>
                    </Grid>
                    <Grid item lg={2}></Grid>
                </Grid>
            </div>
        )
    }
}

export default NavBar