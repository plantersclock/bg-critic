
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';





class FilterOutAuthors extends Component {
    constructor(props) {
        super(props);
        this.state = {
          channel:"",
          removedAuthors : this.props.removedAuthors

      };

        this.handleChange = this.handleChange.bind(this);
      }

    componentDidUpdate(prevProps) {
      if (prevProps.removedAuthors !== this.props.removedAuthors) {
        this.setState({removedAuthors: this.props.removedAuthors})
      }
    }

    handleChange = async (e) => {
      let name = e.target.name
      let arrayRemovedAuthors = [...this.state.removedAuthors]

      if (e.target.checked===true) {
        await this.setState(prevState => ({
          removedAuthors: [...prevState.removedAuthors, name]
        }), )
      }
      else {
        let index = arrayRemovedAuthors.indexOf(name)
        arrayRemovedAuthors.splice(index, 1)
        await this.setState({removedAuthors: arrayRemovedAuthors})
      }

      console.log (this.state.removedAuthors)
      this.props.changeListState("filterOutAuthors", this.state.removedAuthors)
    }



    render() {
      let {authors} = this.props
      let { removedAuthors} = this.state


        return (
            <div style={{width: "100%"}}>               
              <Grid item xs={12}>
                <Typography variant="h6"> Filter Out Author/Reviewer </Typography>
              </Grid>
              {authors.map((author) => (
              <Grid key={author} item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={removedAuthors.includes(author)}
                      onChange={this.handleChange}
                      name={author}
                      color="primary"
                    />
                  }
                  label={author}
              />
              </Grid>
              ))}
                          
            </div>
        )
    }
}

export default FilterOutAuthors