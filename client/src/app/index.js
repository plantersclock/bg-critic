import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import {NavBar, Footer} from '../components'
import { Top10List } from '../pages'

import { Helmet } from 'react-helmet';


import '../style/index.css';


function App() {
    return (

        <Router>
            <Helmet>
                <title>Top 10 Board Games By Year</title>
                <meta charSet="utf-8" />
                <meta name="description" content="A Dynamic Top 10 List of Board Games by Year" />
            </Helmet>
            <NavBar />
            <Switch>
                <Route path="/top10/:year" exact component={Top10List} />
                {/* <Route path="/admin/top10/create" exact component={Top10Insert} />
                <Route
                    path="/top10/update/:id"
                    exact
                    component={Top10Update}
                /> */}
                <Route render={() => <Redirect to="/top10/2019" />} />
            </Switch>
            <Footer/>

        </Router>


    )
}

export default App
