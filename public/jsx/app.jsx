'use strict';
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import Search from './components/SearchView';
import Stats from './components/StatsView';

const App = React.createClass({

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

});

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Search}/>
            <Route path="summoner/:name" component={Stats} />
        </Route>
    </Router>
);

render(routes, document.getElementById('main'));