
import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab';
import {FilterOutChannel, FilterOutAuthor} from '../components'
import Hidden from '@material-ui/core/Hidden';
import FilterListIcon from '@material-ui/icons/FilterList';
import Drawer from '@material-ui/core/Drawer';






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
        let {channels, authors, filterOutAuthors} = this.props
        return (

            <div style={{width: "100%"}}>
                <Fab color="secondary" aria-label="filter" className = "filter-list-button" onClick={()=>this.toggleDrawer(true)}>
                  <FilterListIcon />
                </Fab>
                <Drawer anchor="right" open={this.state.drawerOpen} onClose={()=>this.toggleDrawer(false)}>
                    <div style={{padding: "24px"}}>
                    {channels !== undefined ?
                    <FilterOutChannel channels={channels} changeListState={this.props.changeListState}/>
                    :
                    <div></div>}
                    {authors !== undefined ?
                    <FilterOutAuthor removedAuthors={filterOutAuthors} authors={authors} changeListState={this.props.changeListState}/>
                    :
                    <div></div>}
                    </div>
                </Drawer>


            </div>
        )
    }
}

export default MobileFilter
