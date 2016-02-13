'use strict';
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import Search from './components/SearchView';

const App = React.createClass({
    //propTypes: {
    //    currentPage: React.PropTypes.number.isRequired,
    //    hasPrev: React.PropTypes.bool.isRequired,
    //    hasNext: React.PropTypes.bool.isRequired,
    //    pageCount: React.PropTypes.number.isRequired,
    //},

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
        </Route>
    </Router>
);

render(routes, document.getElementById('main'));