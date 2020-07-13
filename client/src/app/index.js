import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import {NavBar, Footer} from '../components'
import { Top10List, Top10Insert, Top10Update } from '../pages'

import { Helmet } from 'react-helmet';


import '../style/index.css';



function App() {
    return (

        <Router>
            <Helmet>
                <title>Top 10 Boardgame Lists</title>
                <meta charSet="utf-8" />
                <meta name="description" content="A dynamic top 10 list of boardgames by year" />
            </Helmet>
            <NavBar />
            <Switch>
                <Route path="/top10/:year" exact component={Top10List} />
                <Route path="/top10/create" exact component={Top10Insert} />
                <Route
                    path="/top10/update/:id"
                    exact
                    component={Top10Update}
                />
                <Route render={() => <Redirect to="/top10/2019" />} />
            </Switch>
            <Footer/>

        </Router>


    )
}

export default App
