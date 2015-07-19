
/* eslint-env node */

'use strict';

var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
    displayName: 'forecastWeekly',
    render: function render() {

        var dailyForecasts = this.props.forecast.data.daily;

        var dailyForecastNodes = dailyForecasts.data.map(function (forecast) {
            var day = moment.unix(forecast.time).format('ddd, MMMM Do');
            return (
                <li key={forecast.time}>
                    <h3>{day}</h3>
                    <span className='summary'>{forecast.summary}</span>
                </li>
            );
        });

        return (
            <div className='forecast'>
                <h1>Weekly forecast for {this.props.location}</h1>

                <h2>Summary</h2>
                <p>{dailyForecasts.summary}</p>

                <h2>Days</h2>
                <ul>
                    {dailyForecastNodes}
                </ul>
            </div>
        );
    }
});
