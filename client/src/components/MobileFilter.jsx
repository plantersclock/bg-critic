
import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab';
import {FilterOutChannel, FilterOutAuthor, SelectYear} from '../components'
import FilterListIcon from '@material-ui/icons/FilterList';
import { Typography, Accordion, AccordionSummary, Drawer, AccordionDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';






class MobileFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }

        this.toggleDrawer = this.toggleDrawer.bind(this)

    }

      changeYear(year){
        console.log(year)
      }

      toggleDrawer(open){
        this.setState({drawerOpen: open});
      };




    render() {
        let {channels, authors, filterOutAuthors, filterOutChannels} = this.props
        return (

            <div style={{width: "100%"}}>
                <Fab color="secondary" aria-label="filter" className = "filter-list-button" onClick={()=>this.toggleDrawer(true)}>
                  <FilterListIcon />
                </Fab>
                <Drawer className = "filter-list-drawer" anchor="right" open={this.state.drawerOpen} onClose={()=>this.toggleDrawer(false)}>
                    <div style={{padding: "24px"}}>
                    <Typography style={{marginBottom: 12}} variant="h6">Change Year: </Typography>
                    <SelectYear year={this.props.year} changeYear={this.props.changeYear}/>
                    <Typography style={{marginBottom: 24}} variant="h6">Filter Out: </Typography>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="channels-content"
                        id="channels-header"
                      >
                        <Typography >Channels</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                      {channels !== undefined ?
                      <FilterOutChannel channels={channels} removedChannels={filterOutChannels} changeListState={this.props.changeListState}/>
                      :
                      <div></div>}
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="authors-content"
                        id="authors-header"
                      >
                        <Typography >Reviewers</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                      {authors !== undefined ?
                      <FilterOutAuthor removedAuthors={filterOutAuthors} authors={authors} changeListState={this.props.changeListState}/>
                      :
                      <div></div>}
                      </AccordionDetails>
                    </Accordion>


                    </div>
                </Drawer>


            </div>
        )
    }
}

export default MobileFilter
