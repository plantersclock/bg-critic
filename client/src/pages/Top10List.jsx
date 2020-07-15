
import React, { Component } from 'react'
import api from '../api'
import {BGCard, Top10Title, Top10SubText, FilterOutChannel, FilterOutAuthor, MobileFilter, SelectYear} from '../components'
import Grid from '@material-ui/core/Grid';
import { Typography, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Helmet } from 'react-helmet';
import Hidden from '@material-ui/core/Hidden';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




import '../style/Top10List.css';


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
            filterOutAuthors: [],
            channelAuthors: [],
            year: this.props.match.params.year
        };


        this.getTopX = this.getTopX.bind(this);
        this.setupList = this.setupList.bind(this);
        this.changeListState = this.changeListState.bind(this);
        this.changeYear = this.changeYear.bind(this);
        // this.addBGGData = this.addBGGData.bind(this);
        this.checkBGGInDB = this.checkBGGInDB.bind(this);
        this.getBGGArray = this.getBGGArray.bind(this);
        // this.postBGGBase = this.postBGGBase.bind(this);
        this.updateList = this.updateList.bind(this);
        this.alignChannelAuthor = this.alignChannelAuthor.bind(this);
        this.getChannelAuthors = this.getChannelAuthors.bind(this);

      }

      componentDidMount = async () => {
        
        this.setupList()


      }

      componentDidUpdate = async(prevProps, prevState) =>{
        if (this.state.year !== prevState.year){
          this.setState({topXLoaded: false})
          console.log("New State")
          console.log(this.state.year)
          console.log("Old State")
          console.log(prevState.year)
          this.setupList()



        } else{
          console.log ("ELSE")
          console.log(this.state.year)
          console.log(prevState.year)
        }




      }

      setupList = async() =>{
        console.log("my test")
        this.setState({ isLoading: true })
        await api.getTop10ItemsByYear(this.state.year).then(top10items => {
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

          this.getChannelAuthors()
          this.getBGGArray().then(result => {
          this.setState({structuredTop10: result,
          topXLoaded: true})
        })

      }

      getChannels(items){
        let uniqueChannels = items.map( (item) => item.channel).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        this.setState ({channels: uniqueChannels})
      }

      getAuthors(items){
        let uniqueAuthors = items.map( (item) => item.author).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        this.setState ({authors: uniqueAuthors})
      }

      getChannelAuthors= async ()=>{
        let {channels, top10items} = this.state

        console.log(channels)


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
            console.log ("THIS IS THE STUFF")
            console.log (channel)
            console.log (channelAuthors)
            console.log (channelAuthors[channel])
            let authors = channelAuthors[channel]
            let array = []

            authors.map(author =>{
              if (!filterOutAuthors.includes(author)){
                array.push(author)
              }
              return null
            })
            console.log (array)
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
        }).catch(()=> api.insertBGGBaseById(item.bgg_id))
      }

      changeListState = async (name, value) => {
        this.setState({topXLoaded: false})
        await this.setState({[name]: value})
        await this.updateList()

      }

      changeYear = async (new_year) => {
        console.log(new_year)
        await this.setState({year: new_year})
        console.log(this.state.year)
        this.props.history.push("/top10/"+new_year)
      }

      updateList(){
        console.log(this.state.topX)
        this.getTopX(this.state.top10items, this.state.topX)
        this.getBGGArray().then(result => {this.setState({structuredTop10: result, topXLoaded: true})}
        )

      }


    render() {
        let topXLoaded = false
        let { topX, channels, authors, filterOutAuthors, filterOutChannels } = this.state
        if (this.state.structuredTop10.length > 0){
          topXLoaded = true
        }
        console.log (this.state.structuredTop10)
        // console.log (this.state.top10items)
        return (
            <div style={{width:"100%"}}>
              <Helmet>
                <title>Top 10 Boardgames of {this.state.year}</title>
                <meta charSet="utf-8" />
                <meta name="description" content={"A dynamic top 10 boardgames list for the year " + this.state.year} />
              </Helmet>
              <Grid item xs={12} container justify="center" direction="row">
                <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
                <Grid item xs= {12} sm = {10} md={10} lg={8} xl={6} container direction="row" spacing={4}  >
                  <Grid item xs={12} md={8}>
                    <Top10Title topX={this.state.topX} year={this.state.year}></Top10Title>
                    <Top10SubText xReviewers = {authors.length - filterOutAuthors.length} year = {this.state.year}></Top10SubText>
                    {topXLoaded && this.state.topXLoaded ? this.state.structuredTop10.map((item, index) => (
                      <Grid item xs = {12} key={item.bgg_id}>
                        <BGCard bg={item} order={index} topX={topX}/>
                      </Grid>
                    ))
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
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="channels-content"
                          id="channels-header"
                        >
                          <Typography >Channels</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FilterOutChannel removedChannels={filterOutChannels} channels={channels} changeListState={this.changeListState}></FilterOutChannel>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="authors-content"
                          id="authors-header"
                        >
                          <Typography >Reviewers</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FilterOutAuthor removedAuthors={filterOutAuthors} authors={authors} changeListState={this.changeListState}></FilterOutAuthor>
                        </AccordionDetails>
                      </Accordion>
                      {/* <FilterTopX changeListState={this.changeListState}></FilterTopX> */}


                    </div>
                  </Grid>
                  </Hidden>
                </Grid>

                <Grid item sm = {1} md={1} lg={2} xl={3} ></Grid>
              </Grid>
              <Hidden mdUp>
                <MobileFilter year={this.state.year} channels={channels} filterOutChannels={filterOutChannels} filterOutAuthors={filterOutAuthors} authors={authors} changeYear={this.changeYear} changeListState={this.changeListState}/>
              </Hidden>
            </div>
        )
    }
}

export default Top10List
