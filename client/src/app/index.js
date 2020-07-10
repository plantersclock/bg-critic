import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import {NavBar} from '../components'
import { Top10List, Top10Insert, Top10Update } from '../pages'


import '../style/index.css';



function App() {
    return (

        <Router>
            
            <NavBar />
            <Switch>
                <Route path="/" exact component={Top10List} />
                <Route path="/top10/create" exact component={Top10Insert} />
                <Route
                    path="/top10/update/:id"
                    exact
                    component={Top10Update}
                />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
            
        </Router>


    )
}

export default App
