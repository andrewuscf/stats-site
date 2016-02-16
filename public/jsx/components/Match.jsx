'use strict';
import React from 'react';
import _ from 'lodash';

const toChampionImage = function(id) {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}.jpg`
};


const Match = React.createClass({

    propTypes: {
        matchId: React.PropTypes.number.isRequired,
        region: React.PropTypes.string.isRequired,
        summonerId: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            match: null,
            summoner: null,
            teamStats: null
        }
    },

    componentDidMount() {
        $.get('/api/match/' + this.props.matchId, {region: this.props.region}, function (result) {
            const playerIdentity = _.filter(result.data.participantIdentities, (each) => {
                return each.player.summonerId === parseInt(this.props.summonerId);
            })[0];

            const playerStats = _.find(result.data.participants, {'participantId': playerIdentity.participantId});
            const teamStats = _.find(result.data.teams, {'teamId': playerStats.teamId});

            this.setState({
                match: result.data,
                summoner: _.extend(playerIdentity, playerStats),
                teamStats: teamStats
            });

            $.get('/api/champion/'+playerIdentity.championId, function(champ){
                console.log(champ);
            }.bind(this));
        }.bind(this));
    },


    render() {
        const match = this.state.match;
        if (match) {
            var className;
            (this.state.teamStats.winner) ? className = 'alert-success' : className = 'alert-danger';
            return (
                <div className={'game-stats-box alert '+ className }>
                    <div className="row">
                        <div>
                            {_.startCase(match.matchMode)}
                            <span className="pull-right">{new Date(match.matchCreation).toDateString()}</span>
                        </div>
                        <hr/>
                    </div>
                    <div className="row">
                        <div>
                            {this.state.summoner.stats.kills}/
                            {this.state.summoner.stats.deaths}/
                            {this.state.summoner.stats.assists}
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

});

module.exports = Match;