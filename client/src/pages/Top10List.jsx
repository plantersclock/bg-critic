
import React, { Component } from 'react'
import api from '../api'
import {BGCard, Top10Title, Top10SubText, FilterTopX, FilterOutChannel, FilterOutAuthor} from '../components'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ReactLoading from 'react-loading';
import Button from '@material-ui/core/Button';


class Top10List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            top10items: [],
            listLoaded: false,
            topXLoaded: true,
            structuredTop10: [],
            sortedTop10Items: [],
            topX: 10,
            channels: [],
            authors: [],
            filterOutChannels: [],
            filterOutAuthors: []

        };

    
        this.getTopX = this.getTopX.bind(this);
        this.changeListState = this.changeListState.bind(this);
        this.addBGGData = this.addBGGData.bind(this);
        this.checkBGGInDB = this.checkBGGInDB.bind(this);
        this.getBGGArray = this.getBGGArray.bind(this);
        this.postBGGBase = this.postBGGBase.bind(this);
        this.updateList = this.updateList.bind(this);

      }
    
      componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllTop10Items().then(top10items => {
            this.setState({
                top10items: top10items.data.data,
                isLoading: false,
                listLoaded: true,
            }, () => {
              this.getTopX(this.state.top10items, this.state.topX)
              this.getChannels(this.state.top10items)
              this.getAuthors(this.state.top10items)
            })
        })

        this.getBGGArray().then(result => {
          this.setState({structuredTop10: result})
        })

        

      }
    
      componentDidUpdate(){

    

      }

      getChannels(items){
        let uniqueChannels = items.map( (item) => item.channel).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        this.setState ({channels: uniqueChannels})
      }

      getAuthors(items){
        let uniqueAuthors = items.map( (item) => item.author).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        this.setState ({authors: uniqueAuthors})
      }

      getTopX = async (items, topX) => {
        let arrayFilteredOutChannels = this.state.filterOutChannels
        let arrayFilteredOutAuthors = this.state.filterOutAuthors
        let filteredItemsChannel = items.filter(({channel}) => !arrayFilteredOutChannels.includes(channel))
        let filteredItems = filteredItemsChannel.filter(({author}) => !arrayFilteredOutAuthors.includes(author))

        let uniqueItems = filteredItems.map( (item) => item.bgg_id).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        // console.log (uniqueItems)
        let itemArray = uniqueItems.map(uniqueItem => {

          let result = filteredItems.filter(item => item.bgg_id === uniqueItem)

          if (result.length > 0){
            let itemScore = result.length * 5.5
            for (let h = 0; h < result.length; h++) {
                itemScore += (11-result[h].rating)
            }

            return {"bgg_id": result[0].bgg_id,
                    "manual_name": result[0].game,
                    "score": itemScore,
                    "tie_breaker": result.length}
          }
          return null
        })

        itemArray = itemArray.sort(function(a, b){return b.score - a.score})
        itemArray = itemArray.slice(0, topX)
        itemArray = itemArray.sort(function(a, b){return a.score - b.score})

        this.setState({sortedTop10Items: itemArray})  
        return null
      }

      
      getBGGArray = async () => {
        return Promise.all(this.state.sortedTop10Items.map(item=>this.checkBGGInDB(item)))
      }

      checkBGGInDB = async (item) => {
        return await api.getBGGBaseById(item.bgg_id).then(async (response) => {

          if (response.statusText==="OK"){
            let bgg_data = response.data.data
            return Object.assign({}, item, bgg_data);
          }
        }).catch(()=> this.addBGGData(item))
      }

      addBGGData = async (item, retries=100) => {

        return await fetch(`https://bgg-json.azurewebsites.net/thing/${item.bgg_id}`).then(async (response) => {
          if (response.ok){
            console.log ("success")
            let bgg_data = await response.json()
            this.postBGGBase(bgg_data)
            // console.log(response)
            return Object.assign({}, item, bgg_data);
          }
         
          if (retries > 0 && response.status !== 400) {
            console.log ("Retrying retries")
            console.log(response)
            return this.addBGGData(item, retries - 1)
          } else {
            console.log("Can't find "+(item.manual_name) +` In Database or BGG`)
            console.log(item)
            return item;
    
          }
        })

      }

      postBGGBase = async (data) => {
        let BGGData = 
          [{
            gameId: data.gameId,
            playingTime: data.playingTime,
            yearPublished: data.yearPublished,
            minPlayers: data.minPlayers,
            maxPlayers: data.maxPlayers,
            name: data.name,
            artists: data.artists,
            description: data.description,
            designers: data.designers,
            expansions: data.expansions,
            publishers: data.publishers,
            image: data.image,
            thumbnail: data.thumbnail,
            mechanics: data.mechanics,
            isExpansion: data.isExpansion,        
          }]


        // await api.getBGGBaseById(BGGData.gameID).then(res => {
        //   console.log(res)
        //   console.log(`Found inserted successfully`)
        // })
        
        await api.insertBGGBase(BGGData).then(async () => {
            await console.log(BGGData[0].gameId + ` inserted successfully`)
        })
      }






      changeListState = async (name, value) => {
        this.setState({topXLoaded: false})
        await this.setState({[name]: value})
        await this.updateList()
        
      }

      updateList(){
        console.log(this.state.topX)
        this.getTopX(this.state.top10items, this.state.topX)
        this.getBGGArray().then(result => {this.setState({structuredTop10: result, topXLoaded: true})}
        )

      }


    render() {
        let content = this.state.structuredTop10.map(item => (<div key={item.bgg_id}>{item.name} - {item.bgg_id} - {item.score}</div>))
        let topXLoaded = false
        let { topX, channels, authors } = this.state

        if (this.state.structuredTop10.length > 0){
          topXLoaded = true
        }
        // console.log (this.state.structuredTop10[0])
        // console.log (this.state.top10items)
        return (
            <div style={{width:"100%"}}>
              <Grid item xs={12} container justify="center" direction="row">
                <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
                <Grid item xs= {12} sm = {10} md={10} lg={8} xl={6} container direction="row" spacing={4}  >
                  <Grid item xs={12} md={8}>
                    <Top10Title topX={this.state.topX}></Top10Title>
                    <Top10SubText></Top10SubText>
                    {topXLoaded && this.state.topXLoaded ? this.state.structuredTop10.map((item, index) => (
                      <Grid item xs = {12} key={item.bgg_id}>
                        <BGCard bg={item} order={index} topX={topX}/>
                      </Grid>
                    )) : <div><ReactLoading type="spinningBubbles" color="red" height={'20%'} width={'20%'} /></div>}
                  </Grid>
                  <Grid item md={4}>
                    <div style={{minWidth: 288, width:"100%", height:"100%", border:"1px solid lightgray", padding: 12}}>
                      <Typography variant="h5">Filters: </Typography>
                      <FilterTopX changeListState={this.changeListState}></FilterTopX>
                      <FilterOutChannel channels={channels} changeListState={this.changeListState}></FilterOutChannel>
                      <FilterOutAuthor authors={authors} changeListState={this.changeListState}></FilterOutAuthor>
                    </div>
                  </Grid>
                </Grid>
                
                <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
              </Grid>
              {content}
            </div>
        )
    }
}

export default Top10List