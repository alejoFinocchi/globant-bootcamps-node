/*! Copyright Globant. All rights reserved. */
'use strict';

const config = require('../../core/config');
const users = require('./controllers');

module.exports = function initRoutes(app) {
    // Users resource base route
    const basePath = config.basePath + '/users';

    //console.log(basePath);
    app.get(basePath, users.v1.getAll); 

    //Path for a single user
    app.get(basePath+'/:userId', users.v1.validateId, users.v1.getById);
};
