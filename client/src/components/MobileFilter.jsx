
import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab';
import {FilterOutChannel, FilterOutAuthor, SelectYear, FilterPlayerCount} from '../components'
import FilterListIcon from '@material-ui/icons/FilterList';
import { Typography, Drawer} from '@material-ui/core';


import '../style/MobileFilter.css';






class MobileFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }

        this.toggleDrawer = this.toggleDrawer.bind(this)

    }

      toggleDrawer(open){
        this.setState({drawerOpen: open});
      };




    render() {
        let {channels, authors, authorChannels, filterOutAuthors, filterOutChannels} = this.props
        return (

            <div>
                <Fab color="secondary" aria-label="filter" className = "filter-list-button" onClick={()=>this.toggleDrawer(true)}>
                  <FilterListIcon />
                </Fab>
                <Drawer anchor="right" open={this.state.drawerOpen} onClose={()=>this.toggleDrawer(false)}>

                  <div style={{width: 250, padding: "24px"}}>
                    <Typography style={{marginBottom: 12}} variant="h6">Change Year: </Typography>
                    <SelectYear year={this.props.year} changeYear={this.props.changeYear}/>
                    <FilterPlayerCount changeListState={this.props.changeListState}/>
                    <Typography style={{marginBottom: 12}} variant="h6">Filter Out: </Typography>
                    <FilterOutChannel channels={channels} removedChannels={filterOutChannels} changeListState={this.props.changeListState}/>
                    <FilterOutAuthor removedAuthors={filterOutAuthors} authors={authors} authorChannels={authorChannels} changeListState={this.props.changeListState}/>

                  </div>

                </Drawer>


            </div>
        )
    }
}

export default MobileFilter
