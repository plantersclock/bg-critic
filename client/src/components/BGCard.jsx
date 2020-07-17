import React, { Component } from 'react';

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {amazon} from '../affiliates'
import PeopleIcon from '@material-ui/icons/People';
import TimerIcon from '@material-ui/icons/Timer';
import GradeIcon from '@material-ui/icons/Grade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Hidden from '@material-ui/core/Hidden';
import { Typography, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import '../style/BGCard.css';



class BGCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.convert = this.convert.bind(this);
  }

      convert(string) {
        try{
        var multiple = {
        '&amp;' : '&',
        '&ndash;' : '-',
        '&nbsp;' : ' ',
        '&mdash;' : ' - ',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': '`',
        '&#10;': ' '

      };
      for(var char in multiple) {
        var before = char;
        var after= multiple[char];
        var pattern = new RegExp(before, 'g');
        string = string.replace(pattern,after);
      }
      return string;}
      catch {
        return null
      }
    }

    render() {
      let isLoaded = false
      let {bg, order, topX} = this.props
      let description = ""
      let amazonLink = undefined
      let amazonLinkText

      if (this.props.bg !== undefined && this.props.bg !==null){
        isLoaded=true
        description = bg.description

        if (amazon[bg.bgg_id] !== undefined){
          amazonLinkText = amazon[bg.bgg_id].text
          amazonLink = amazon[bg.bgg_id].text_image
        }

      }
      return (
        <div>
          {isLoaded ?
          <div>
            <div className="bg-card-image-parent">
              <div className="bg-card-image-background" style={{backgroundImage: `url(${bg.thumbnail})` }}>
              </div>
              <Hidden xsDown>
                <div className="bg-card-image-center">
                  <CardMedia className ="bg-card-image"
                    component="img"
                    loading="lazy"
                    alt={bg.name}
                    height="300"
                    image={bg.image}
                    title={bg.name}
                    style={{marginBottom: 0}}
                  />
                </div>
              </Hidden>
              <Hidden smUp>
                <div className="bg-card-image-center">
                  <CardMedia className ="bg-card-image"
                    component="img"
                    loading="lazy"
                    alt={bg.name}
                    height="150"
                    image={bg.thumbnail}
                    title={bg.name}
                    style={{marginBottom: 0}}
                  />
                </div>
              </Hidden>
            </div>
 
            <a style={{marginBottom: 24, color:"gray", textDecoration: "none"}} href={'https://www.boardgamegeek.com/boardgame/'+bg.bgg_id}><Typography variant="caption">(source)</Typography></a>





              {amazonLink !== undefined ?
              <Grid style={{marginBottom: 24}} item container xs={12}>

                <Grid item xs ={12} sm = {9}>
                  <Typography gutterBottom>
                    <span className="bggcard-game-title">{topX-order}. {bg.name}</span>
                  </Typography>
                  <Typography style={{minHeight: 120, maxHeight: 120, overflow: "hidden"}} variant="body2" color="textSecondary" component="p">
                    {this.convert(description)}
                  </Typography>
                  <Hidden smUp>
                    <Button target="_blank" variant="outlined" color="secondary" style={{marginTop: 12}} href={amazonLinkText}>Buy</Button>
                  </Hidden>
                  <Grid item container xs={12} style={{paddingBottom: 0, paddingTop: 24}}>
                    <Grid item container direction="column" xs={4} justify="center" alignItems="center">
                      <PeopleIcon/>
                      <Typography variant="h6">{bg.minPlayers} - {bg.maxPlayers}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={4} justify="center" alignItems="center">
                      <TimerIcon/>
                      <Typography variant="h6">{bg.playingTime}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={4} justify="center" alignItems="center">
                      <GradeIcon/>
                      <Typography variant="h6">{bg.score}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Hidden xsDown>
                  <Grid item container justify="flex-end" xs = {3}>
                    <iframe title={"amazon link for "+bg.name} style={{width:120, height:240, paddingLeft: 22}} marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src={amazonLink}></iframe>
                  </Grid>
                </Hidden>
              </Grid>
              :
              <Grid style={{marginBottom: 24}} item container xs={12}>
                <Grid item xs ={12} sm = {12}>
                  <Typography gutterBottom>
                    <span className="bggcard-game-title">{topX-order}. {bg.name}</span>
                  </Typography>
                  <Typography style={{maxHeight: 120, overflow: "hidden"}} variant="body2" color="textSecondary" component="p">
                    {this.convert(description)}
                  </Typography>
                  <Grid item container xs={12} style={{paddingBottom: 0, paddingTop: 24}}>
                    <Grid item container direction="column" xs={4} justify="center" alignItems="center">
                      <PeopleIcon/>
                      <Typography variant="h6">{bg.minPlayers} - {bg.maxPlayers}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={4} justify="center" alignItems="center">
                      <TimerIcon/>
                      <Typography variant="h6">{bg.playingTime}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={4} justify="center" alignItems="center">
                      <GradeIcon/>
                      <Typography variant="h6">{bg.score}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>}



              <Grid item container xs = {12} style={{marginBottom: 24}}>
              <div style={{width: "100%"}}>
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="reviewer-rankings-content"
                  id="reviewer-rankings-header"
                >
                  <Typography >Reviewer Rankings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Reviewer</TableCell>
                        <TableCell align="right">Ranking</TableCell>
                        <TableCell align="right">Channel</TableCell>
                        <TableCell align="right">Source</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bg.author_results.map((result)=> (
                        <TableRow key={result.author}>
                          <TableCell component="th" scope="row">{result.author}</TableCell>
                          <TableCell align="right">{result.rating}</TableCell>
                          <TableCell align="right"><a href = {result.channel_link} target="_blank" rel="noopener noreferrer">{result.channel}</a></TableCell>

                          <TableCell align="right"><a href = {result.source} target="_blank" rel="noopener noreferrer"> Source </a></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                </AccordionDetails>
              </Accordion>
              </div>

              </Grid>




        </div> :
        <div></div>}
      </div>
      )
    }
  }

export default BGCard
