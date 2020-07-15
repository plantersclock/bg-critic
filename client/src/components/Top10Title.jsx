
import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';






class Top10Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
      let {topX, year} = this.props
        return (
            <div style={{width: "100%"}}>
              <Grid item container xs={12}>
                <Typography style={{paddingTop: 30}} gutterBottom variant="h4">Top {topX} Boardgames of {year}</Typography>
              </Grid>

            </div>
        )
    }
}

export default Top10Title
