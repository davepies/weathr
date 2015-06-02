var express = require('express');

var app = module.exports = express();

app.listen(3000, function () {
    console.log('Listening on http://localhost:3000');
})
