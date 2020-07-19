
import React, { Component } from 'react'
import api from '../api'
import {BGCard, Top10Title, Top10SubText, FilterOutChannel, FilterOutAuthor, MobileFilter, SelectYear, FilterPlayerCount} from '../components'
import Grid from '@material-ui/core/Grid';
import { Typography} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Helmet } from 'react-helmet';
import Hidden from '@material-ui/core/Hidden';





import '../style/Top10List.css';


class Top10List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            top10Items: [],
            top10ItemsBGG: [],
            topXLoaded: false,
            structuredTop10: [],
            sortedTop10Items: [],
            combinedBGGWithTop10: [],
            topX: 10,
            channels: [],
            authors: [],
            filterOutChannels: [],
            filterOutAuthors: [],
            channelAuthors: [{}],
            authorChannels: [],
            year: this.props.match.params.year
        };


        this.getTopX = this.getTopX.bind(this);
        this.setupList = this.setupList.bind(this);
        this.changeListState = this.changeListState.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.alignChannelAuthor = this.alignChannelAuthor.bind(this);
        this.getChannelAuthors = this.getChannelAuthors.bind(this);
        this.getTop10DataForYear = this.getTop10DataForYear.bind(this);

      }

      componentDidMount = async () => {
        await this.getTop10DataForYear()
        this.setupList()
      }

      componentDidUpdate = async(prevProps, prevState) =>{
        if (this.state.year !== prevState.year){
          this.setState({topXLoaded: false})
          await this.getTop10DataForYear()
          this.setupList()
        } 
        }

      getTop10DataForYear = async() =>{
        await api.getTop10ItemsByYear(this.state.year).then(top10Items => {
          this.setState({
              top10Items: top10Items.data.data,
          })
        })
      }

      setupList = async() =>{

        
        let channels = this.getChannels(this.state.top10Items)
        let authors = this.getAuthors(this.state.top10Items)
        let channelAuthors = this.getChannelAuthors()
        let sortedTopXItems = this.getTopX(this.state.top10Items, 10)

        this.setState({authors: authors.authors,
                      authorChannels: authors.authorChannels,
                      channels: channels,
                      channelAuthors: channelAuthors,
                      topX: sortedTopXItems.topX,
                      structuredTop10: sortedTopXItems.sortedTop10Items,

                      topXLoaded: true})
          
  
      }

      getChannels(items){
        let uniqueChannels = items.map( (item) => item.channel).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        return uniqueChannels
      }



      getAuthors(items){
        let uniqueAuthors = items.map( (item) => item.author).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        let authorChannels = []
        let authorItems
        for (let i = 0; i < uniqueAuthors.length; i++) 
          {
            authorItems = items.filter(({author}) => author===uniqueAuthors[i])
            

            authorChannels.push(
              {
                "author": uniqueAuthors[i],
                "channel": authorItems[0]["channel"]
              }
            )
          }
        return {authors: uniqueAuthors,
                authorChannels: authorChannels}
      }

      getChannelAuthors (){
        let {channels, top10Items} = this.state



        if (channels.length > 0){


          let channelAuthors = {}
          channels.map(channel => {
            let authors = []
            for (let i = 0; i < top10Items.length; i++) {
              if (top10Items[i].channel === channel && !authors.includes(top10Items[i].author)){
                authors.push(top10Items[i].author)
              }
            }
            let newDict = {[channel]: authors}
            channelAuthors = Object.assign({}, channelAuthors, newDict)
            return null

          })

        return channelAuthors
        }



      }

      alignChannelAuthor(channelAuthors){
        let {filterOutChannels, filterOutAuthors} = this.state

        if (filterOutChannels.length > 0){

          filterOutChannels.map(channel => {

            let authors = channelAuthors[channel]
            let array = []

            authors.map(author =>{
              if (!filterOutAuthors.includes(author)){
                array.push(author)
              }
              return null
            })
            return array

          })

        }


      }

      filterItems(items, name, value){

        let { filterPlayerCount, filterOutChannels, filterOutAuthors } = this.state
        if (name === "filterPlayerCount"){
          filterPlayerCount = value
        }
        else if (name === "filterOutChannels"){
          if (this.state.filterOutChannels.includes(value)){
            filterOutChannels = (filterOutChannels.filter(channel => channel !== value))
            filterOutAuthors = filterOutAuthors.filter((author) => !this.getChannelAuthors()[value].includes(author))

          } else {
            filterOutChannels = [...filterOutChannels, value]

         }
        }
        else if (name === "filterOutAuthors"){
          if (this.state.filterOutAuthors.includes(value)){
            filterOutAuthors = (filterOutAuthors.filter(author => author !== value))

          } else {
            filterOutAuthors = [...filterOutAuthors, value]

         }
        }
        
        let filteredItems = items.filter(({channel}) => !filterOutChannels.includes(channel))

        filteredItems = filteredItems.filter(({author}) => !filterOutAuthors.includes(author))
        if (filterPlayerCount){
          filteredItems = filteredItems.filter(({minPlayers})=> (minPlayers <= filterPlayerCount))
          filteredItems = filteredItems.filter(({maxPlayers})=> (maxPlayers >= filterPlayerCount))
        }

        return filteredItems
      }

      getTopX(items, topX) {
        let uniqueItems = items.map( (item) => item.bgg_id).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        let itemArray = uniqueItems.map(uniqueItem => {
        let result = items.filter(item => item.bgg_id === uniqueItem)
        if (result.length > 0){
          let itemScore = result.length * 5.5
          for (let h = 0; h < result.length; h++) {
              itemScore += (11-result[h].rating)
          }
          return {"bgg_id": result[0].bgg_id,
                  "manual_name": result[0].game,
                  "name": result[0].name,
                  "description": result[0].description,
                  "image": result[0].image,
                  "thumbnail": result[0].thumbnail,
                  "minPlayers": result[0].minPlayers,
                  "maxPlayers": result[0].maxPlayers,
                  "playingTime": result[0].playingTime,
                  "mechanics": result[0].mechanics,
                  "designer": result[0].designer,
                  "publishers": result[0].publishers,
                  "expansions": result[0].expansions,
                  "yearPublished": result[0].yearPublished,
                  "score": itemScore,
                  "tie_breaker": result.length,
                  "author_results": result}
          }
          return null
        })

        itemArray = itemArray.sort(function(a, b){return b.score - a.score})
        let uniqueScores = itemArray.map( (item) => item.score).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        

        let beforeScore = 0
        let count = topX

        if (count > uniqueScores.length){
          count = uniqueScores.length
          topX = count

        }
        for (let j = 0; j < count; j++){
          if (itemArray[j].score === beforeScore){
            count += 1
          }
          beforeScore = itemArray[j].score
        }

        itemArray = itemArray.slice(0, count)
        itemArray = itemArray.sort(function(a, b){return a.score - b.score})


        return {sortedTop10Items: itemArray,
                topX: topX}
      }


      changeYear = async (new_year) => {

        await this.setState({year: new_year,
                            filterOutChannels: [],
                            filterOutAuthors: [],
                            filterPlayerCount: null
                                        })
        this.props.history.push("/top10/"+new_year)
      }

      changeListState = async (name, value) => {
        let sortedTopXItems = this.getTopX(this.filterItems(this.state.top10Items, name, value), 10)
        if (name === 'filterOutChannels'){
          if (this.state.filterOutChannels.includes(value)){
            let filterOutChannels = (this.state.filterOutChannels.filter(channel => channel !== value))
            let filterOutAuthors = this.state.filterOutAuthors.filter((author) => !this.getChannelAuthors()[value].includes(author))
            this.setState({
              topX: sortedTopXItems.topX,
              structuredTop10: sortedTopXItems.sortedTop10Items,
              [name]: filterOutChannels,
              filterOutAuthors: filterOutAuthors
              })
          } else {
            let authors = this.getChannelAuthors()[value]
            this.setState(prevState => ({
              topX: sortedTopXItems.topX,
              structuredTop10: sortedTopXItems.sortedTop10Items,
              [name]: [...prevState.filterOutChannels, value],
              filterOutAuthors: [...prevState.filterOutAuthors, ...authors]
              }))}
        } else {
        this.setState({
                      topX: sortedTopXItems.topX,
                      structuredTop10: sortedTopXItems.sortedTop10Items,
                      [name]: value,
                      })
                    }
      }



    render() {
        let { topX, channels, authors, authorChannels, filterOutAuthors, filterOutChannels, structuredTop10 } = this.state
        let order = -1
        let beforeScore = 0



        let bgCardSkeles = 10

        return (
            <div style={{width:"100%"}}>
              <Helmet>
                <title>Top 10 Board Games of {this.state.year}</title>
                <meta charSet="utf-8" />
                <meta name="description" content={"A Dynamic Top 10 Boardgames List for " + this.state.year} />
              </Helmet>
              <Grid item xs={12} container justify="center" direction="row">
                <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
                <Grid item xs= {12} sm = {10} md={10} lg={8} xl={6} container direction="row" spacing={4}  >
                  <Grid item xs={12} md={8}>
                    <Top10Title topX={this.state.topX} year={this.state.year}></Top10Title>
                    <Top10SubText xReviewers = {authors.length - filterOutAuthors.length} year = {this.state.year}></Top10SubText>
                    {this.state.topXLoaded ? structuredTop10.map((item, index) => {
                      if (beforeScore === this.state.structuredTop10[index].score){

                        order = order - 1
                      } else {

                        beforeScore = this.state.structuredTop10[index].score
                       
                      }
                      order += 1
                      return <Grid item xs = {12} key={item.bgg_id}>
                              <BGCard bg={item} order={order} topX={topX}/>
                            </Grid>
                    })
                    :
                    <div>
                      {[...Array(bgCardSkeles)].map((e, i) => 
                      <div style={{marginBottom: 24}} key={i}>
                        <Skeleton variant="rect" height={200} className="bg-skele-image" style={{marginBottom:24}} />
                        <Skeleton variant="text" height={60} width={264} style={{marginBottom: 12}}/>
                        <Skeleton variant="text" width="90%"/>
                        <Skeleton variant="text" width="98%"/>
                        <Skeleton variant="text" width="91%"/>
                        <Skeleton variant="text" width="100%"/>
                        <Skeleton variant="text" width="95%"/>
                        <Skeleton variant="text" width="92%"/>
                      </div>
                      )}

                    </div>}
                  </Grid>
                  <Hidden smDown>
                  <Grid item md={4}>
                    <div style={{width:"100%", height:"auto", marginTop:38}}>
                      <Typography style={{marginBottom: 12}} variant="h6">Filters: </Typography>
                      <SelectYear year={this.state.year} changeYear={this.changeYear}/>
                      <FilterPlayerCount changeListState={this.changeListState}/>
                      <Typography style={{marginBottom: 12}} variant="h6">Filter Out: </Typography>
                      <FilterOutChannel removedChannels={filterOutChannels} channels={channels} changeListState={this.changeListState}></FilterOutChannel>                      
                      <FilterOutAuthor removedAuthors={filterOutAuthors} authors={authors} authorChannels={authorChannels} changeListState={this.changeListState}></FilterOutAuthor>

                      {/* <FilterTopX changeListState={this.changeListState}></FilterTopX> */}


                    </div>
                  </Grid>
                  </Hidden>
                </Grid>

                <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
              </Grid>
              <Hidden mdUp>
                <MobileFilter year={this.state.year} authorChannels={authorChannels} channels={channels} filterOutChannels={filterOutChannels} filterOutAuthors={filterOutAuthors} authors={authors} changeYear={this.changeYear} changeListState={this.changeListState}/>
              </Hidden>
            </div>
        )
    }
}

export default Top10List
