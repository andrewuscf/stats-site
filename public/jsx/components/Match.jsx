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
                <tr>
                    <td>Tiger Nixon</td>
                    <td>{match.matchMode}</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                </tr>
            );
        } else {
            return null;
        }
    }

});

module.exports = Match;