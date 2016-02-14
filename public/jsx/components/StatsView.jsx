'use strict';
import React from 'react';

import MatchList from './MatchList';


const StatsView = React.createClass({

    getInitialState() {
        return {
            summoner: null,
            stats: null,
        }
    },

    componentDidMount() {
        $.get('/api/summoner/'+this.props.params.name,{region: this.props.params.region}, function (result) {
            this.setState({
                summoner: result
            });
        }.bind(this));
    },


    render() {
        if(this.state.summoner){
            return (
                <div className="stats-view">
                    <h1>{this.state.summoner.name}</h1>
                    <MatchList summonerId={this.state.summoner.summonerId} region={this.props.params.region}/>
                </div>
            );
        } else {
            return null;
        }
    }

});

module.exports = StatsView;