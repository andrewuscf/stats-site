'use strict';
import React from 'react';


const RegionSelect = React.createClass({
    propTypes: {
        handleClick: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            region: 'Select Your Region',
            regions: null
        }
    },

    componentDidMount() {
        $.get('/api/regions', function (result) {
            this.setState({
                regions: result
            });
        }.bind(this));
    },

    handleClick(region,title) {
        this.props.handleClick(region);
        this.setState({
            region: title
        });
    },

    render() {
        if (this.state.regions) {
            return (
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle search-dropdown" type="button" data-toggle="dropdown">
                        {this.state.region}
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        {this.state.regions.map((each) =>
                                <li key={each.region}>
                                    <a href='javascript:' onClick={this.handleClick.bind(this, each.region, each.title)}>{each.title}</a>
                                </li>
                        )}
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    }

});

module.exports = RegionSelect;