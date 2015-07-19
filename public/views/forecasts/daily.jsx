/* eslint-env node */

'use strict';

var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
    displayName: 'forecastDaily',

    render: function render() {
        var hourlyForecasts = this.props.forecast.data.hourly;
        var day = moment.unix(this.props.forecast.data.currently.time).format('ddd, MMMM Do');

        var hourlyForecastNodes = hourlyForecasts.data.map(function (forecast) {
            var time = moment.unix(forecast.time).format('hA');
            return (
                <li key={forecast.time}>
                    <h3>{time}</h3>
                    <span className='summary'>{forecast.summary}</span>
                </li>
            );
        });

        return (
            <div className='forecast'>
                <h1>Forecast for: {day} - {this.props.location}</h1>
                <h2>Summary</h2>
                <p>{hourlyForecasts.summary}</p>

                <h2>Hourly Forecasts</h2>
                <ul>
                    {hourlyForecastNodes}
                </ul>
            </div>
        );
    }
});
