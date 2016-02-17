'use strict';
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import SearchView from './components/SearchView';
import StatsView from './components/StatsView';

const App = React.createClass({

    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }

});

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={SearchView}/>
            <Route path="summoner/:region/:name" component={StatsView} />
        </Route>
    </Router>
);

render(routes, document.getElementById('main'));