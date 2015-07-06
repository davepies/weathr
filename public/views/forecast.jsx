/* eslint-env node */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'forecast',
    render: function render() {
        return (
            <div className='forecast'>
                <h1>Forecast ({this.props.forecast.type}) for: {this.props.location}</h1>
                <h2>Summary</h2>
                <p>{this.props.forecast.data.summary}</p>
            </div>
        );
    }
});
