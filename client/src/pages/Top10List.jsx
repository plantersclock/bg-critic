
import React, { Component } from 'react'
import api from '../api'
import {BGCard, Top10Title, Top10SubText, FilterOutChannel, FilterOutAuthor, MobileFilter, SelectYear} from '../components'
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
            top10items: [],
            top10ItemsBGG: [],
            listLoaded: false,
            topXLoaded: true,
            structuredTop10: [],
            sortedTop10Items: [],
            combinedBGGWithTop10: [],
            topX: 10,
            channels: [],
            authors: [],
            filterOutChannels: [],
            filterOutAuthors: [],
            channelAuthors: [],
            authorChannels: [],
            year: this.props.match.params.year
        };


        this.getTopX = this.getTopX.bind(this);
        this.setupList = this.setupList.bind(this);
        this.changeListState = this.changeListState.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.updateList = this.updateList.bind(this);
        this.alignChannelAuthor = this.alignChannelAuthor.bind(this);
        this.getChannelAuthors = this.getChannelAuthors.bind(this);
        this.getTop10DataForYear = this.getTop10DataForYear.bind(this);
        this.getMinMaxPlayers = this.getMinMaxPlayers.bind(this);
        this.getMaxTime = this.getMaxTime.bind(this)
      }

      componentDidMount = async () => {
        await this.getBGGList() 
        this.setupList("first")
      }

      componentDidUpdate = async(prevProps, prevState) =>{
        if (this.state.year !== prevState.year){
          this.setState({topXLoaded: false})
          await this.getTop10DataForYear()
          this.setupList()
        } 
        if (this.state.top10items !== prevState.top10items){
          this.getBGGList()
          }     
        if (this.state.top10ItemsBGG !== prevState.top10ItemsBGG || this.state.top10items !== prevState.top10items){
          this.combineBGGWithTop10()
        }   
        }

      getBGGList = ()=>{
        return api.getBGGBases().then( response => this.setState({top10ItemsBGG: response.data.data})) 

      }

      combineBGGWithTop10(){
        let itemsWithBGG = this.state.top10ItemsBGG
          let combinedBGGWithTop10 = {}
          let newItem
          for (let i = 0; i < this.state.top10items.length; i++) {

            let filterData = itemsWithBGG.filter(dict => dict.gameId === this.state.top10items[i].bgg_id)
            
            newItem = {[this.state.top10items[i].bgg_id]: Object.assign({}, this.state.top10items[i], filterData[0])}
     
            combinedBGGWithTop10 = Object.assign({}, combinedBGGWithTop10, newItem);
          }
          // this.combineTop10BGG().then(item =>console.log(item))

          this.setState({combinedBGGWithTop10: combinedBGGWithTop10})


      }
      

      getTop10DataForYear = async() =>{
        await api.getTop10ItemsByYear(this.state.year).then(top10items => {
          this.setState({
              top10items: top10items.data.data,
          })
        })
      }

      setupList = async(attempt) =>{

          if (attempt === "first"){
            await this.getTop10DataForYear()
            this.getChannels(this.state.top10items)
            this.getAuthors(this.state.top10items)
            this.getChannelAuthors()

          }
          this.getMinMaxPlayers(this.state.top10items)
          this.getMaxTime(this.state.top10items)
          this.getTopX(this.state.top10items, this.state.topX)


          let result = (this.state.sortedTop10Items.map(item => Object.assign({}, this.state.combinedBGGWithTop10[item.bgg_id], item)))
          this.setState({structuredTop10: result,
          topXLoaded: true})
    
      }

      getChannels(items){
        let uniqueChannels = items.map( (item) => item.channel).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        this.setState ({channels: uniqueChannels})
      }

      getMinMaxPlayers(items){        
       
      }

      getMaxTime(items){
        
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

        this.setState ({authors: uniqueAuthors})
        this.setState ({authorChannels: authorChannels})
      }

      getChannelAuthors= async ()=>{
        let {channels, top10items} = this.state



        if (channels.length > 0){


          let channelAuthors = {}
          channels.map(channel => {
            let authors = []
            for (let i = 0; i < top10items.length; i++) {
              if (top10items[i].channel === channel && !authors.includes(top10items[i].author)){
                authors.push(top10items[i].author)
              }
            }
            let newDict = {[channel]: authors}
            channelAuthors = Object.assign({}, channelAuthors, newDict)
            return null

          })

        this.setState ({channelAuthors: channelAuthors})
        }



      }

      alignChannelAuthor(){
        let {filterOutChannels, filterOutAuthors, channelAuthors} = this.state

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
            this.setState(prevState => ({
              filterOutAuthors: [...prevState.filterOutAuthors, ...array]
            }))
            return null
          })

        }


      }

      getTopX = async (items, topX) => {
        this.alignChannelAuthor()
        let arrayFilteredOutChannels = this.state.filterOutChannels
        let arrayFilteredOutAuthors = this.state.filterOutAuthors
        let filteredItemsChannel = items.filter(({channel}) => !arrayFilteredOutChannels.includes(channel))
        let filteredItems = filteredItemsChannel.filter(({author}) => !arrayFilteredOutAuthors.includes(author))
        let uniqueItems = filteredItems.map( (item) => item.bgg_id).filter( (item, index, _arr) => _arr.indexOf(item) === index);
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
                    "tie_breaker": result.length,
                    "author_results": result}
          }
          return null
        })

        itemArray = itemArray.sort(function(a, b){return b.score - a.score})


        let beforeScore = 0
        let count = topX
        for (let j = 0; j < count; j++){
          if (itemArray[j].score === beforeScore){
            count += 1
          }
          beforeScore = itemArray[j].score
        }

        itemArray = itemArray.slice(0, count)
        itemArray = itemArray.sort(function(a, b){return a.score - b.score})

        this.setState({sortedTop10Items: itemArray})
        return null
      }

      // getBGGArray = async (items) => {
      //   return Promise.all(items.map(item=>this.checkBGGInDB(item)))
      // }

      // checkBGGInDB = async (item) => {
      //   return await api.getBGGBaseById(item.bgg_id).then(async (response) => {

      //     if (response.statusText==="OK"){
      //       let bgg_data = response.data.data
      //       return Object.assign({}, item, bgg_data);
      //     }
      //   }).catch(()=> api.insertBGGBaseById(item.bgg_id))
      // }

      changeYear = async (new_year) => {

        await this.setState({year: new_year})
        this.props.history.push("/top10/"+new_year)
      }

      changeListState = async (name, value) => {
        this.setState({topXLoaded: false})
        await this.setState({[name]: value})
        this.updateList()
      }

      updateList = async () => {
        
        this.getTopX(this.state.top10items, this.state.topX)
        let result = (this.state.sortedTop10Items.map(item => Object.assign({}, this.state.combinedBGGWithTop10[item.bgg_id], item)))

        this.setState({structuredTop10: result,
        topXLoaded: true})
        
        

      }


    render() {
        let topXLoaded = false
        let { topX, channels, authors, authorChannels, filterOutAuthors, filterOutChannels } = this.state
        let order = -1
        let beforeScore = 0
        if (this.state.structuredTop10.length > 0){
          topXLoaded = true
        }

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
                    {topXLoaded && this.state.topXLoaded ? this.state.structuredTop10.map((item, index) => {

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

                      <div style={{marginBottom: 24}}>
                        <Skeleton variant="rect" height={200} className="bg-skele-image" style={{marginBottom:24}} />
                        <Skeleton variant="text" height={60} width={264} style={{marginBottom: 12}}/>
                        <Skeleton variant="text" width="90%"/>
                        <Skeleton variant="text" width="98%"/>
                        <Skeleton variant="text" width="91%"/>
                        <Skeleton variant="text" width="100%"/>
                        <Skeleton variant="text" width="95%"/>
                        <Skeleton variant="text" width="92%"/>
                      </div>
                      <div style={{marginBottom: 24}}>
                        <Skeleton variant="rect" height={200} className="bg-skele-image" style={{marginBottom:24}} />
                        <Skeleton variant="text" height={60} width={264} style={{marginBottom: 12}}/>
                        <Skeleton variant="text" width="90%"/>
                        <Skeleton variant="text" width="98%"/>
                        <Skeleton variant="text" width="91%"/>
                        <Skeleton variant="text" width="100%"/>
                        <Skeleton variant="text" width="95%"/>
                        <Skeleton variant="text" width="92%"/>
                      </div>
                      <div style={{marginBottom: 24}}>
                        <Skeleton variant="rect" height={200} className="bg-skele-image" style={{marginBottom:24}} />
                        <Skeleton variant="text" height={60} width={264} style={{marginBottom: 12}}/>
                        <Skeleton variant="text" width="90%"/>
                        <Skeleton variant="text" width="98%"/>
                        <Skeleton variant="text" width="91%"/>
                        <Skeleton variant="text" width="100%"/>
                        <Skeleton variant="text" width="95%"/>
                        <Skeleton variant="text" width="92%"/>
                      </div>

                    </div>}
                  </Grid>
                  <Hidden smDown>
                  <Grid item md={4}>
                    <div style={{width:"100%", height:"auto", marginTop:38}}>
                      <Typography style={{marginBottom: 12}} variant="h6">Change Year: </Typography>
                      <SelectYear year={this.state.year} changeYear={this.changeYear}/>
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
