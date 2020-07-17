
import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <div style={{height: 78}}>

                        <Toolbar style={{height: 108, backgroundColor: "#F2F2F2", zIndex: 0}}>
                        <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
                            <Grid item xs= {12} sm = {10} md={10} lg={8} xl={6} container direction="row" spacing={4}  >
                            <Grid item container xs={12}>
                                <Grid item container alignContent= {"center"} justify={"center"} xs={12}>

                                        
                                            <Grid container alignContent= {"center"} justify={"center"} item xs={12}>
                                            <Typography >
                                                Created By:&nbsp;<a style= {{color: "#333333", textDecoration: "none"}} href="https://matthew-wright.com/"> Matthew Wright</a>
                                                </Typography>
                                            </Grid>
                                            <Grid container alignContent= {"center"} justify={"center"} item xs={12}>
                                            <Typography >
                                            <a style= {{color: "#333333", textDecoration: "none"}} href = "mailto: tabletop10@support.com">Contact us</a>
                                            </Typography>
                                            </Grid>
                                        



                                </Grid>
                            </Grid>
                            </Grid>
                        <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
                        </Toolbar>


            </div>
        )
    }
}

export default Footer
