/*! Copyright Globant. All rights reserved. */
'use strict';

const actions = require('./actions');
const Joi = require('joi');


module.exports = {
    v1: { // Initial version
        getAll: getAll,
        getById: getById,
        validateParams: validateParams
    }
};

/////////////////////////////////////////////////////////////

/**
 * Retrieve all profiles
 * @param {Object} req - http.ServerRequest
 * @param {Object} res - http.ServerResponse
 */
function getAll(req, res) {
    res.status(200).send(actions.getAllProfiles());
}

/**
 * Retrieve a role
 * @param {Object} req 
 * @param {Object} res 
 */
function getById(req, res) {
    let response = actions.profileById(req.params.profileid);
    res.status(response.res).send(response.profile);
}

/**
 * Validates the params
 * @param {Object} req 
 * @param {Object} res 
 * @param {*} next 
 */
function validateParams(req, res, next) {
    const schema = Joi.object().keys({
        profileid: Joi.number().positive()
    });
    const data = req.params;
    Joi.validate(data, schema, (err, value) => {
        if (err) {
            res.status(422).json({
                status: 'error',
                message: 'Invalid ID',
                data: data
            })
        } else {
            next();
        }
    })

}