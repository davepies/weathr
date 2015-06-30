/* eslint-env node */

'use strict';

module.exports = function (app) {

    // set up app configs
    require('./app-config')(app);
    // set up view engine
    require('./view-engine')(app);

};
