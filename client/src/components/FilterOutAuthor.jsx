
import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';






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
