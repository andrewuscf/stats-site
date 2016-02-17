'use strict';
import React from 'react';
import { browserHistory } from 'react-router';

import RegionSelect from './RegionSelect';


const SearchView = React.createClass({

    getInitialState() {
        return {
            region: null,
            name: null,
            errors: null
        }
    },

    handleRegionChange(region){
        this.setState({
            region: region
        });
    },

    handleSummonerInput() {
        this.setState({
            name: this.refs.name.value
        });
    },

    handleSubmit() {
        var self = this;
        if (this.state.region && this.state.name) {
            browserHistory.push(`/summoner/${this.state.region}/${this.state.name}`)
        } else if (!this.state.region) {
            self.setState({
                errors: 'Please select a Region'
            });
        } else if (!this.state.name) {
            self.setState({
                errors: 'Please enter your Summoner Name'
            });
        }
    },

    render() {
        return (
            <div className="search-view">
                <div>
                    <h1 className="search-title text-center">League of Legends Stats</h1>

                    {(this.state.errors) ?
                        <p className="alert-danger text-center">{this.state.errors}</p>
                        : null
                    }

                    <div className="col-sm-offset-2 row">
                        <div className="col-xs-12 col-sm-3">
                            <RegionSelect handleClick={this.handleRegionChange}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <div className="input-group">
                                <input type="text"
                                       className="form-control"
                                       placeholder="Summoner Name"
                                       ref="name" onChange={this.handleSummonerInput}/>
                            <span className="input-group-addon summoner-find-icon" onClick={this.handleSubmit}>
                                <i className="glyphicon glyphicon-search"></i>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = SearchView;