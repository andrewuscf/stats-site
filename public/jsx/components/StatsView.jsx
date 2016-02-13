'use strict';
import React from 'react';


const Stats = React.createClass({

    getInitialState() {
        return {
            stats: null,
        }
    },


    render() {
        return (
            <div className="stats-view">
                stats
            </div>
        );
    }

});

module.exports = Stats;