import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {amazon} from '../affiliates'

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
      let {bg, order} = this.props
      let description = ""
      let amazonLink = undefined
      
      if (this.props.bg !== undefined && this.props.bg !==null){
        isLoaded=true
        description = bg.description
        console.log(bg)


        amazonLink = amazon[bg.bgg_id]

        console.log (amazonLink)
      }
      return (
        <div>
          {isLoaded ? 
          <Card style={{marginBottom:22}}>
          <CardActionArea>
            <CardMedia className ="bg-card-image"
              component="img"
              alt={bg.name}
              height="200"
              image={bg.image}
              title={bg.name}
            />


            
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2">
                {10-order}. {bg.name}
              </Typography>
              <Typography style={{maxHeight: 120, overflow: "hidden"}} variant="body2" color="textSecondary" component="p">
                {this.convert(description)}
              </Typography>
            </CardContent>
          </CardActionArea>

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