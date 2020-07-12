import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';


import '../style/bgcard.css';



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
      
      if (this.props.bg !== undefined && this.props.bg !==null){
        isLoaded=true
        description = bg.description



        amazonLink = amazon[bg.bgg_id]


      }
      return (
        <div>
          {isLoaded ? 
          <Card style={{marginBottom:22}}>
          <CardContent>
            <CardMedia className ="bg-card-image"
              component="img"
              loading="lazy"
              alt={bg.name}
              height="200"
              image={bg.image}
              title={bg.name}
            />
            <CardContent >



       

              <Grid style={{marginBottom: 24}} item container xs={12}>
                <Grid item xs ={12} sm = {9}>
                  <Typography gutterBottom variant="h5" component="h5">
                    {topX-order}. {bg.name}
                  </Typography>
                  <Typography style={{minHeight: 120, maxHeight: 120, overflow: "hidden", marginRight: 12}} variant="body2" color="textSecondary" component="p">
                    {this.convert(description)}
                  </Typography>
                  <Grid item container xs={12} style={{paddingBottom: 12, paddingTop: 24}}>
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
                    <iframe style={{width:120, height:240}} marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=budgy-20&language=en_US&marketplace=amazon&region=US&placement=B07YQ641NQ&asins=B07YQ641NQ&linkId=1fbefb7802dd7f0d5d426a0a58276c3b&show_border=true&link_opens_in_new_window=true"></iframe>
                  </Grid>
                </Hidden>
              </Grid>

              <Grid item container xs = {12}>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Author/Reviewer</TableCell>
                        <TableCell align="right">Channel</TableCell>
                        <TableCell align="right">Rating</TableCell>
                        <TableCell align="right">Source</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bg.author_results.map((result)=> (
                        <TableRow key={result.author}>
                          <TableCell component="th" scope="row">{result.author}</TableCell>
                          <TableCell component="th" scope="row" align="right"><a href = {result.channel_link} target="_blank">{result.channel}</a></TableCell>
                          <TableCell align="right">{result.rating}</TableCell>
                          <TableCell align="right"><a href = {result.source} target="_blank"> Source </a></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </CardContent>
          


          </CardContent>


          <CardActions>
            {amazonLink !== undefined ?
            <Button size="small" color="primary" href={amazonLink}>
              Buy
            </Button>:
            <div></div>
            }

            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card> :
        <div></div>}
      </div>
      )
    }
  }

export default BGCard