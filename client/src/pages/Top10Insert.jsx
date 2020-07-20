import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import api from "../api";

class Top10Insert extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createBGGInDB = this.createBGGInDB.bind(this);
  }

  handleChange = (e) => {
    console.log("CHANGED");
    this.setState({ [e.target.name]: e.target.value });
  };

  postTop10Items = async (data) => {
    await api.insertTop10Item(data).then((res) => {
      window.alert(`Items inserted successfully`);
    });
  };

  createBGGInDB = async (bgg_id) => {
    return await api
      .insertBGGBaseById(bgg_id)
      .then(async (response) => {
        if (response.statusText === "OK") {
          console.log("success");
          return true;
        }
      })
      .catch(() => console.log("FAILURE"));
  };

  // checkBGGInDB = async (item) => {
  //     return await api.getBGGBaseById(item.bgg_id).then(async (response) => {

  //       if (response.statusText==="OK"){
  //         let bgg_data = response.data.data
  //         return Object.assign({}, item, bgg_data);
  //       }
  //     }).catch(()=> this.addBGGData(item))
  //   }

  //   addBGGData = async (item, retries=100) => {

  //     return await fetch(`https://bgg-json.azurewebsites.net/thing/${item.bgg_id}`).then(async (response) => {
  //       if (response.ok){
  //         console.log ("success")
  //         let bgg_data = await response.json()
  //         this.postBGGBase(bgg_data)
  //         // console.log(response)
  //         return Object.assign({}, item, bgg_data);
  //       }

  //       if (retries > 0 && response.status !== 400) {
  //         console.log ("Retrying retries")
  //         console.log(response)
  //         return this.addBGGData(item, retries - 1)
  //       } else {
  //         console.log("Can't find "+(item.manual_name) +` In Database or BGG`)
  //         console.log(item)
  //         return item;

  //       }
  //     })

  //   }

  //   postBGGBase = async (data) => {
  //     let BGGData =
  //       [{
  //         gameId: data.gameId,
  //         playingTime: data.playingTime,
  //         yearPublished: data.yearPublished,
  //         minPlayers: data.minPlayers,
  //         maxPlayers: data.maxPlayers,
  //         name: data.name,
  //         artists: data.artists,
  //         description: data.description,
  //         designers: data.designers,
  //         expansions: data.expansions,
  //         publishers: data.publishers,
  //         image: data.image,
  //         thumbnail: data.thumbnail,
  //         mechanics: data.mechanics,
  //         isExpansion: data.isExpansion,
  //       }]

  //     await api.insertBGGBase(BGGData).then(async () => {
  //         await console.log(BGGData[0].gameId + ` inserted successfully`)
  //     })
  //   }

  checkBGGInDB = async (item) => {
    return await api
      .getBGGBaseById(item.bgg_id)
      .then(async (response) => {
        if (response.statusText === "OK") {
          let bgg_data = response.data.data;
          return Object.assign({}, item, bgg_data);
        }
      })
      .catch(() => api.insertBGGBaseById(item.bgg_id));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let games = this.state.games.split(/\r?\n/);

    let data = games.map((item) => {
      let rating = item.split(".")[0];
      let other = item.split(". ")[1];
      let game = other.split(" - ")[0];
      let bgg_id = other.split(" - ")[1];

      let dataItem = {
        author: this.state.author,
        channel: this.state.channel,
        channel_link: this.state.channel_link,
        source: this.state.source,
        year: parseInt(this.state.year),
        game: game,
        rating: parseInt(rating),
        bgg_id: parseInt(bgg_id),
      };

      this.checkBGGInDB(dataItem);

      return dataItem;
    });
    console.log(data);
    this.postTop10Items(data);
  };

  render() {
    let { author, channel, channel_link, source, year, games } = this.state;
    this.createBGGInDB(123);
    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <Grid item lg={12} container>
          <Grid item lg={1}></Grid>
          <Grid item lg={10} container direction="column">
            <TextField
              id="standard-basic"
              label="Author"
              value={author}
              name="author"
              onChange={this.handleChange}
            />
            <TextField
              id="standard-basic"
              label="Channel"
              value={channel}
              name="channel"
              onChange={this.handleChange}
            />
            <TextField
              id="standard-basic"
              label="Channel Link"
              value={channel_link}
              name="channel_link"
              onChange={this.handleChange}
            />
            <TextField
              id="standard-basic"
              label="Source"
              value={source}
              name="source"
              onChange={this.handleChange}
            />
            <TextField
              id="standard-basic"
              label="Year"
              value={year}
              name="year"
              onChange={this.handleChange}
            />
            <TextField
              id="standard-basic"
              label="Games"
              multiline
              rows={10}
              value={games}
              name="games"
              onChange={this.handleChange}
            />
            <input
              style={{ marginTop: 10, float: "right", width: 150 }}
              type="submit"
              value="Add Top 10 List"
            />
          </Grid>
          <Grid item lg={1}></Grid>
        </Grid>
      </form>
    );
  }
}

export default Top10Insert;
