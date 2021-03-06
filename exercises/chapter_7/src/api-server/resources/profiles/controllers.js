/*! Copyright Globant. All rights reserved. */

const models = require("../../models");
const _ = require("lodash");

module.exports = {
	v1: {
		// Initial version
		getAll: getAll,
		getProfileById: getProfileById,
		createProfile: createProfile,
		deleteProfile: deleteProfile,
		updateProfile: updateProfile,
		setProfileToUsers: setProfileToUsers
	}
};

/**
 * Retrieve all profiles
 * @param {Object} req - http.ServerRequest
 * @param {Object} res - http.ServerResponse
 */
function getAll(req, res) {
	return models.Profile.findAll({})
		.then(profiles => {
			res.status(200).send(profiles);
		})
		.catch(err => {
			res.status(404).send(err);
		});
}

/**
 * Returns a single profile finded by his id
 * @param {Object} req
 * @param {Object} res
 */
function getProfileById(req, res) {
	return models.Profile.findByPk(req.params.profileId)
		.then(profile => {
			if (profile) {
				res.status(200).send(profile);
			} else {
				res.status(404).send({ msg: "Profile doesn't exists" });
			}
		})
		.catch(err => {
			res.status(500).send(err);
		});
}

function createProfile(req, res) {
	return models.Profile.create({
		name: req.body.name,
		description: req.body.description
	})
		.then(succes => {
			res.status(200).send("Profile created");
		})
		.catch(err => {
			res.status(500).send(err);
		});
}

function setProfileToUsers(req, res) {
	return models.Profile.findByPk(req.params.profileId)
		.then(profile => {
			if (profile) {
				models.User.update({ ProfileId: req.params.profileId }, { omitNull: true, where: { id: req.body.usersId } })
					.then(() => {
						res.status(200).send("Users updated");
					})
			}
			else {
				res.status(404).send("profileId does't exists");
			}
		})
		.catch(err=>{
			res.status(500).send("profileId does't exists");
		})
}

function updateProfile(req, res) {
	return models.Profile.findByPk(req.params.profileId)
		.then(profile => {
			if (profile) {
				profile.update({
					name: req.body.name,
					description: req.body.description
				}, { omitNull: true }).then(() => {
					res.status(200).send(profile)
				});
			} else {
				res.status(404).send("profileId does't exists");
			}
		}).catch(err => {
			res.status(500).send(err);
		})
}

function deleteProfile(req, res) {
	return models.Profile.findByPk(req.params.profileId)
		.then(profile => {
			if (profile) {
				profile.destroy()
					.then(succes => {
						res.status(200).send("Profile destroyed");
					});
			} else {
				res.status(404).send("ProfileId does't exists");
			}
		})
		.catch(err => {
			res.status(500).send(err);
		});

}

