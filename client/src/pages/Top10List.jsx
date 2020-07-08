
import React, { Component } from 'react'
import api from '../api'
import {BGCard} from '../components'
import Grid from '@material-ui/core/Grid';

class Top10List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            top10items: [],
            listLoaded: false,
            structuredTop10: [],
            sortedTop10Items: [],
            topX: 10

        };

    
        this.getTopX = this.getTopX.bind(this);
        this.addBGGData = this.addBGGData.bind(this);
        this.getBGGArray = this.getBGGArray.bind(this);

      }
    
      componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllTop10Items().then(top10items => {
            this.setState({
                top10items: top10items.data.data,
                isLoading: false,
                listLoaded: true,
            }, () => (this.getTopX(this.state.top10items, this.state.topX)))
        })

        this.getBGGArray().then(result => {
          this.setState({structuredTop10: result})
        })

        

      }
    
      componentDidUpdate(){
    

      }

      addBGGData = async (item) => {
        let response = await fetch(`https://bgg-json.azurewebsites.net/thing/${item.bgg_id}`);
        let stuff = await response.json()
        return Object.assign({}, item, stuff);
      }

      getBGGArray = async () => {
        return Promise.all(this.state.sortedTop10Items.map(item=>this.addBGGData(item)))
      }
    
      getTopX(items, topX){

        let uniqueItems = items.map( (item) => item.bgg_id).filter( (item, index, _arr) => _arr.indexOf(item) === index);
        console.log (uniqueItems)
        let itemArray = uniqueItems.map(uniqueItem => {

          let result = items.filter(item => item.bgg_id === uniqueItem)

          if (result.length > 0){
            let itemScore = 0
            for (let h = 0; h < result.length; h++) {
                itemScore += (11-result[h].rating)
            }

            return {"bgg_id": result[0].bgg_id,
                            "score": itemScore}
          }

          return null

        })

        itemArray = itemArray.sort(function(a, b){return b.score - a.score})
        itemArray = itemArray.slice(0,topX)
        itemArray = itemArray.sort(function(a, b){return a.score - b.score})

        this.setState({sortedTop10Items: itemArray})
        
            
        return null
      }

    render() {
        let content = this.state.structuredTop10.map(item => (<div key={item.bgg_id}>{item.name} - {item.bgg_id} - {item.score}</div>))
        let topXLoaded = false
        if (this.state.structuredTop10.length > 0){
          topXLoaded = true
        }
        console.log (this.state.structuredTop10[0])
        console.log (this.state.top10items)
        return (
            <div style={{width:"100%"}}>
                <p>The Top 10 Board Games Are:</p> <br/>
                <Grid xs={12} container justify="center" direction="row">
                  <Grid xs= {0} sm = {0} md={1} lg={2} ></Grid>
                  <Grid xs= {12} sm = {12} md={10} lg={8}  container direction="row" spacing={4}  >
                    {topXLoaded ? this.state.structuredTop10.map((item, index) => (
                      <Grid item xs = {12} sm = {6} md={4} lg={4} xl={3}>
                        <BGCard bg={item} order={index}/>
                      </Grid>
                    )) : <div></div>}
                  </Grid>
                  <Grid xs= {0} sm = {0} md={1} lg={2} ></Grid>
                </Grid>
                {content}
            </div>
        )
    }
}

export default Top10List