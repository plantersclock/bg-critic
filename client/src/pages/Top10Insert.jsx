
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import api from '../api'

class Top10Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };

    
      }

    handleChange = (e) => {
        console.log ("CHANGED")
        this.setState({ [e.target.name]: e.target.value })
      }
    
    
    postTop10Items= async (data) => {
        await api.insertTop10Item(data).then(res => {
            window.alert(`Items inserted successfully`)
        })

    }
    
    handleSubmit = (e) => {
    e.preventDefault()
    let games = this.state.games.split(/\r?\n/)
    
    let data = games.map(item=>{
        let rating = item.split('.')[0]
        let other = item.split('. ')[1]
        let game = other.split(' - ')[0]
        let bgg_id = other.split(' - ')[1]
        


        let dataItem={
            "author": this.state.author,
            "channel": this.state.channel,
            "channel_link": this.state.channel_link,
            "source": this.state.source,
            "year": parseInt(this.state.year),
            "game": game,
            "rating": parseInt(rating),
            "bgg_id": parseInt(bgg_id)
        }

        return dataItem
        
    })
    console.log(data)
    this.postTop10Items(data)
    
    }

    render() {
        let {author, channel, channel_link, source, year, games} = this.state
        return (
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <Grid item lg = {12} container>
                    <Grid item lg = {1}></Grid>
                    <Grid item lg = {10} container direction="column">
                        <TextField id="standard-basic" label="Author" value={author} name="author" onChange={this.handleChange}/>
                        <TextField id="standard-basic" label="Channel" value={channel} name="channel" onChange={this.handleChange}/>
                        <TextField id="standard-basic" label="Channel Link" value={channel_link} name="channel_link" onChange={this.handleChange}/>
                        <TextField id="standard-basic" label="Source" value={source} name="source" onChange={this.handleChange}/>
                        <TextField id="standard-basic" label="Year" value={year} name="year" onChange={this.handleChange}/>
                        <TextField id="standard-basic" label="Games" multiline rows={10} value={games} name="games" onChange={this.handleChange}/>
                        <input style= {{ marginTop: 10, float: "right", width: 150}} type="submit" value="Add Top 10 List" />
                    </Grid>
                    <Grid item lg = {1}></Grid>
                </Grid>
                
            </form>
        )
    }
}

export default Top10Insert