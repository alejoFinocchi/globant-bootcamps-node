/*! Copyright Globant. All rights reserved. */

const models = require('../../models');
const _ = require('lodash');


module.exports = {
    v1: { // Initial version
        getAll: getAll,
        getUserById: getUserById,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    }
};

/////////////////////////////////////////////////////////////

/**
 * Retrieve all users
 * @param {Object} req - http.ServerRequest
 * @param {Object} res - http.ServerResponse
 */
function getAll(req, res) {
    return models.User.findAll({
        attributes: {
            exclude: ['password']
        }
    }).then(users => {
        res.status(200).send(users);
    }).catch(err => {
        res.status(404).send(err);
    });
}

/**
 * Returns a single user finded by his id
 * @param {Object} req 
 * @param {Object} res 
 */
function getUserById(req, res) {
    return models.User.findByPk(req.params.userId, {
        attributes: {
            exclude: ['password']
        },
        include: [{
            model: models.Profile,
            attributes: {
                exclude: ['id']
            }
        }]
    }).then(user => {
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ msg: "User doesn't exists" });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
}

function createUser(req, res) {
    return models.User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        ProfileId: req.body.ProfileId
    })
        .then(() => {
            res.status(200).send("User created");
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

function updateUser(req, res) {
    return models.User.findByPk(req.params.userId).then(user => {
        if (user) {
            user.update({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                ProfileId: req.body.ProfileId
            }, { omitNull: true }).then(succes => {
                res.status(200).send(user)
            });
        } else {
            res.status(404).send("userId does't exists");
        }
    }).catch(err => {
        res.status(500).send(err);
    })
}

function deleteUser(req, res) {
    return models.User.findByPk(req.params.userId)
        .then(user => {
            if (user) {
                 user.destroy()
                    .then(() => {
                        res.status(200).send("user destroyed");
                    });
            } else {
                res.status(404).send("userId does't exists");
            }
        }).catch(err => {
            res.status(500).send(err);
        });

}



