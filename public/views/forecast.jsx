/* eslint-env node */

'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function render() {
        return (
            <div class='forecast'>
                <h1>{this.props.name} - {this.props.location}</h1>
                <h6>I am a React Router rendered view</h6>
            </div>
        );
    }
});
