/*! Copyright Globant. All rights reserved. */
'use strict';

const config = require('../../core/config');
const profiles = require('./controllers');

module.exports = function initRoutes(app) {
    // Profiles resource base route
    const basePath = config.basePath + '/profiles';

    //console.log(basePath);
    app.get(basePath, profiles.v1.getAll);
    
    //profileByIdPatch
    app.get(basePath+'/:profileid', profiles.v1.validateParams, profiles.v1.getById);
};
