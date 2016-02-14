'use strict';
import React from 'react';


const Match = React.createClass({

    propTypes: {
        matchId: React.PropTypes.number.isRequired,
        region: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            match: null,
        }
    },

    componentDidMount() {
        $.get('/api/match/' + this.props.matchId, {region: this.props.region}, function (result) {
            this.setState({
                match: result.data
            });
            console.log(this.state.match)
        }.bind(this));
    },


    render() {
        const match = this.state.match;
        if(match){
            return (
                <li>
                    <h5 class="clear-fix">
                        <span class="text-success">{match.matchMode}</span>
                        <span class="text-danger">d</span>
                        <span class="text-info">ds</span>
                    </h5>
                </li>
            );
        } else {
            return null;
        }
    }

});

module.exports = Match;