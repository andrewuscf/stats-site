'use strict';
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';


const App = React.createClass({
    //propTypes: {
    //    currentPage: React.PropTypes.number.isRequired,
    //    hasPrev: React.PropTypes.bool.isRequired,
    //    hasNext: React.PropTypes.bool.isRequired,
    //    pageCount: React.PropTypes.number.isRequired,
    //},

    render() {
        return (<div><h1>test</h1></div>);
    }

});

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App} />
    </Router>
);

render(routes, document.getElementById('main'));