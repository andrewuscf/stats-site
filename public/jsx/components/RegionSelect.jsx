'use strict';
import React from 'react';

const regions = [
    {region: 'na', title: 'North America'},
    {region: 'br', title: 'Brazil'},
    {region: 'eune', title: 'Europe Nordic & East'},
    {region: 'euw', title: 'Europe West'},
    {region: 'kr', title: 'Korea'},
    {region: 'lan', title: 'LAN'},
    {region: 'las', title: 'LAS'},
    {region: 'oce', title: 'Oceania'},
    {region: 'ru', title: 'Russia'},
    {region: 'tr', title: 'Turkey'}
];



const RegionSelect = React.createClass({
    //propTypes: {
    //    currentPage: React.PropTypes.number.isRequired,
    //    hasPrev: React.PropTypes.bool.isRequired,
    //    hasNext: React.PropTypes.bool.isRequired,
    //    pageCount: React.PropTypes.number.isRequired,
    //},
    getInitialState() {
        return {
            region: ''
        }
    },

    handleClick(region) {
        console.log(region);
        this.setState({
            region: region
        });
    },

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                    Dropdown
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {regions.map((region, title) =>
                            <li key={region}>
                                <a href='javascript:;' onClick={this.handleClick.bind(this, region)}>{title}</a>
                            </li>
                    )}
                </ul>
            </div>
        );
    }

});

module.exports = RegionSelect;