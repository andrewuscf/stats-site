'use strict';
import React from 'react';

import RegionSelect from './RegionSelect';


const Search = React.createClass({
    //propTypes: {
    //    currentPage: React.PropTypes.number.isRequired,
    //    hasPrev: React.PropTypes.bool.isRequired,
    //    hasNext: React.PropTypes.bool.isRequired,
    //    pageCount: React.PropTypes.number.isRequired,
    //},

    getInitialState() {
        return {
            region: null,
        }
    },

    handleRegionChange(region){
        this.setState({
            region: region
        });
    },

    render() {
        return (
            <div>
                <RegionSelect handleClick={this.handleRegionChange} />
                <h1>another</h1>
            </div>
        );
    }

});

module.exports = Search;