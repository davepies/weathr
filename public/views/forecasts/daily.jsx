/* eslint-env node */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'forecastDaily',
    render: function render() {
        return (
            <div className='forecast'>
                <h1>Daily forecast for: {this.props.location}</h1>
                <h2>Summary</h2>
                <p>{this.props.forecast.data.summary}</p>
            </div>
        );
    }
});
