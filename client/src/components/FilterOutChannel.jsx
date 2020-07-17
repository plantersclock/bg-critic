
import React, { Component } from 'react'

import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';






class FilterOutChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
          channel:"",
          removedChannels : this.props.removedChannels

      };

        this.handleChange = this.handleChange.bind(this);
      }

    componentDidUpdate(prevProps) {
      if (prevProps.removedChannels !== this.props.removedChannels) {
        this.setState({removedChannels: this.props.removedChannels})
      }
    }

    handleChange = async (e) => {
      let name = e.target.name
      let arrayRemovedChannels = [...this.state.removedChannels]

      if (e.target.checked===true) {
        await this.setState(prevState => ({
          removedChannels: [...prevState.removedChannels, name]
        }), )
      }
      else {
        let index = arrayRemovedChannels.indexOf(name)
        arrayRemovedChannels.splice(index, 1)
        await this.setState({removedChannels: arrayRemovedChannels})
      }

      console.log (this.state.removedChannels)
      this.props.changeListState("filterOutChannels", this.state.removedChannels)
    }



    render() {
      let {channels} = this.props
      let { removedChannels} = this.state

      console.log (removedChannels)


        return (
            <div style={{width: "100%", marginBottom: 12}}>

            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="channels-content"
                id="channels-header"
              >
                <Typography style={{fontWeight: 500}}>Channels</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Grid item container xs={12}>
                {channels !== undefined ?
                  channels.map((channel) => (
                    <Grid key={channel} item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={removedChannels.includes(channel)}
                            onChange={this.handleChange}
                            name={channel}
                            color="primary"
                          />
                        }
                        label={<Typography style={{fontSize: ".9rem", fontWeight: 400}}>{channel}</Typography>}
                    />
                    </Grid>
                  ))
                  :
                  <div></div>}
                </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
        )
    }
}

export default FilterOutChannel
