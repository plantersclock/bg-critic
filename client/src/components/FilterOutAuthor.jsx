import React, { Component } from "react";

import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class FilterOutAuthors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      removedAuthors: this.props.removedAuthors,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.removedAuthors !== this.props.removedAuthors) {
      this.setState({ removedAuthors: this.props.removedAuthors });
    }
  }

  handleChange = async (e) => {
    let name = e.target.name;
    let arrayRemovedAuthors = [...this.state.removedAuthors];
    this.props.changeListState("filterOutAuthors", name);

    if (e.target.checked === true) {
      await this.setState((prevState) => ({
        removedAuthors: [...prevState.removedAuthors, name],
      }));
    } else {
      let index = arrayRemovedAuthors.indexOf(name);
      arrayRemovedAuthors.splice(index, 1);
      await this.setState({ removedAuthors: arrayRemovedAuthors });
    }
  };

  render() {
    let { authorChannels } = this.props;
    let { removedAuthors } = this.state;

    return (
      <div style={{ width: "100%" }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="authors-content"
            id="authors-header"
          >
            <Typography style={{ fontWeight: 500 }}>Reviewers</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item container xs={12}>
              {authorChannels !== undefined ? (
                authorChannels.map((authorChannel) => (
                  <Grid key={authorChannel.author} item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            !removedAuthors.includes(authorChannel.author)
                          }
                          onChange={this.handleChange}
                          name={authorChannel.author}
                          color="primary"
                        />
                      }
                      label={
                        <div style={{ marginBottom: 6 }}>
                          <Typography
                            style={{
                              fontSize: ".9rem",
                              fontWeight: 400,
                              marginTop: 12,
                            }}
                          >
                            {authorChannel.author}
                          </Typography>
                          <Typography style={{ fontSize: ".7rem" }}>
                            {authorChannel.channel}
                          </Typography>
                        </div>
                      }
                    />
                  </Grid>
                ))
              ) : (
                <div></div>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default FilterOutAuthors;
