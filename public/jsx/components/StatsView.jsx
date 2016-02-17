'use strict';
import React from 'react';

import MatchList from './MatchList';

const toProfileIcon = function(id) {
    return `http://ddragon.leagueoflegends.com/cdn/6.3.1/img/profileicon/${id}.png`
};


const StatsView = React.createClass({

    getInitialState() {
        return {
            summoner: null,
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
                <div className="col-xs-12 stats-view">
                    <h1>{this.state.summoner.name}</h1>
                    <p className="level-text">Level : {this.state.summoner.summonerLevel}</p>
                    <img src={toProfileIcon(this.state.summoner.profileIconId)} alt="" />
                    <MatchList summonerId={this.state.summoner.summonerId} region={this.props.params.region}/>
                </div>
            );
        } else {
            return null;
        }
    }

});

module.exports = StatsView;