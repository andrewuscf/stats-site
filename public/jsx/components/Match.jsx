'use strict';
import React from 'react';
import _ from 'lodash';

const toChampionImage = function (id) {
    return `http://ddragon.leagueoflegends.com/cdn/6.3.1/img/champion/${id}.png`
};

const itemIamge = function (id) {
    if (id != 0)
        return <img src={`http://ddragon.leagueoflegends.com/cdn/6.3.1/img/item/${id}.png`} alt=""/>;
    else
        return null;
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

            let playerStats = _.find(result.data.participants, {'participantId': playerIdentity.participantId});
            const teamStats = _.find(result.data.teams, {'teamId': playerStats.teamId});

            $.get('/api/champion/' + playerStats.championId, function (champ) {
                this.setState({
                    match: result.data,
                    summoner: _.extend({champ: champ}, playerIdentity, playerStats),
                    teamStats: teamStats
                });
            }.bind(this));

        }.bind(this));
    },


    render() {
        const match = this.state.match;
        const summoner = this.state.summoner;
        if (match) {
            var className;
            (this.state.teamStats.winner) ? className = 'alert-success' : className = 'alert-danger';
            return (
                <div className={'col-xs-12 game-stats-box alert '+ className }>
                    <div className="kda-box">
                        {_.startCase(summoner.timeline.lane)}
                        <span className="pull-right">{new Date(match.matchCreation).toDateString()}</span>
                    </div>
                    <hr/>
                    <div className="col-xs-12">
                        {summoner.champ.name}
                    </div>
                    <div>

                        <div className="col-xs-5 col-md-2">
                            <img src={toChampionImage(summoner.champ.name)} alt=""/>
                        </div>

                        <div className="col-xs-7 col-md-3 kda-box">
                            <div className="col-xs-6">
                                K/D/A
                                <p>
                                    {summoner.stats.kills}/
                                    {summoner.stats.deaths}/
                                    {summoner.stats.assists}
                                </p>
                            </div>
                            <div className="col-xs-6">
                                <span className="no-wrap">Level {summoner.stats.champLevel}</span>

                                <p className="no-wrap">{summoner.stats.minionsKilled + summoner.stats.neutralMinionsKilled} CS</p>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-5 match-items">
                            <div className="col-xs-12 col-sm-8 xs-no-padding">
                                {itemIamge(summoner.stats.item0)}
                                {itemIamge(summoner.stats.item1)}
                                {itemIamge(summoner.stats.item2)}
                            </div>
                            <div className="col-xs-12 col-sm-8 xs-no-padding">
                                {itemIamge(summoner.stats.item3)}
                                {itemIamge(summoner.stats.item4)}
                                {itemIamge(summoner.stats.item5)}
                            </div>
                            <div className="hidden-xs item-six">
                                {itemIamge(summoner.stats.item6)}
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-2">
                            Wards Placed : {summoner.stats.wardsPlaced}
                            <p>Gold Earned : {summoner.stats.goldEarned}</p>
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