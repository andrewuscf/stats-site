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
                                         region={this.props.region}/>)
            }
            return (
                <div className="match-list">
                    <p>Top: <span>{this.state.data.lane.TOP}</span></p>

                    <p>Bottom: <span>{this.state.data.lane.BOTTOM}</span></p>

                    <p>Mid: <span>{this.state.data.lane.MID}</span></p>

                    <p>Jungle: <span>{this.state.data.lane.JUNGLE}</span></p>
                        {shownMatches}
                    <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                        <tr>
                            <th>Player</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                        </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.handleShowMore}>Add</button>
                </div>
            );
        } else {
            return null;
        }
    }

});

module.exports = MatchList;