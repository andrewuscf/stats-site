'use strict';
import React from 'react';

import Match from './Match';

const MatchList = React.createClass({

    propTypes: {
        summonerId: React.PropTypes.string.isRequired,
        region: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            data: null,
            displayedMatches: 5
        }
    },

    componentDidMount() {
        $.get('/api/matchlist/' + this.props.summonerId, {region: this.props.region}, function (result) {
            this.setState({
                data: result
            });
        }.bind(this));
    },

    handleShowMore() {
        if (this.state.displayedMatches < this.state.data.totalGames) {
            this.setState({
                displayedMatches: this.state.displayedMatches + 5
            })
        } else {
            this.setState({
                displayedMatches: this.state.data.totalGames - 1
            })
        }
    },


    render() {
        if (this.state.data) {
            const shownMatches = [];
            var matches = this.state.data.matches;
            for (var x = 0; x < this.state.displayedMatches; x++) {
                shownMatches.push(<Match key={matches[x].matchId}
                                         matchId={matches[x].matchId}
                                         region={this.props.region}
                                         summonerId={this.props.summonerId}/>)
            }
            return (
                <div className="match-list">
                    <h3>Total Game Stats:</h3>
                    <hr/>
                    <span>Top: {this.state.data.lane.TOP}</span>

                    <span className="lane-spacing">Bottom: {this.state.data.lane.BOTTOM}</span>

                    <span className="lane-spacing">Mid: {this.state.data.lane.MID}</span>

                    <span className="lane-spacing">Jungle: {this.state.data.lane.JUNGLE}</span>

                    <span className="lane-spacing">= {this.state.data.totalGames} Total Games</span>

                    <hr/>
                    <h3>Recent Ranked Games:</h3>
                    {shownMatches}
                    <button className="btn btn-success pull-right" onClick={this.handleShowMore}>Show More +</button>
                </div>
            );
        } else {
            return null;
        }
    }

});

module.exports = MatchList;