const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../model/user_model');
const apiResponse = require('../helper/api_response');

/**
 * Register user
 * @param {string} full_name
 * @param {string} username
 * @param {string} email
 * @param {string} phone_num
 * @param {string} password
 */
exports.register = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponse.unprocessableResponse(res, 'unprocessed', errors.array());
		}

		const usernameExist = await UserModel.findOne({ username: req.body.username });
		if (usernameExist) return apiResponse.conflictResponse(res, 'username already registered');

		const emailExist = await UserModel.findOne({ email: req.body.email });
		if (emailExist) return apiResponse.conflictResponse(res, 'email already registered');

		const phoneExist = await UserModel.findOne({ phone_num: req.body.phone_num });
		if (phoneExist) return apiResponse.conflictResponse(res, 'phone_num already registered');

		const hashedPwd = bcrypt.hashSync(req.body.password, 10);
		const user = new UserModel({
			full_name: req.body.full_name,
			username: req.body.username,
			email: req.body.email,
			phone_num: req.body.phone_num,
			password: hashedPwd
		});

		user.save((err) => {
			if (err) return apiResponse.errorResponse(res, 'a problem occurred', err);

			const userData = {
				_id: user._id,
				full_name: user.full_name,
				username: user.username,
				email: user.email,
				phone_num: user.phone_num,
				role: user.role,
				image: user.image,
				created_at: user.created_at,
				updated_at: user.updated_at
			};

			return apiResponse.createdResponse(res, 'registration success', userData);
		});
	} catch (error) {
		return apiResponse.errorResponse(res, 'a problem occurred', error);
	}
};

/**
 * Login user
 * @param {string} username
 * @param {string} password
 */
exports.login = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return apiResponse.unprocessableResponse(res, 'unprocessed', errors.array());
		}

		UserModel.findOne({ username: req.body.username }).then(user => {
			if (user) {
				bcrypt.compare(req.body.password, user.password, (err, same) => {
					if (same) {
						const userData = {
							_id: user._id,
							full_name: user.full_name,
							username: user.username,
							email: user.email,
							phone_num: user.phone_num,
							role: user.role,
							image: user.image,
							created_at: user.created_at,
							updated_at: user.updated_at
						};

						const key = process.env.JWT_KEY;
						const expired = process.env.JWT_EXPIRATION_TIME;

						// generate jwt
						userData.token = jwt.sign({ _id: user._id }, key, { expiresIn: expired });

						return apiResponse.successResponse(res, 'authorized', userData);
					} else {
						return apiResponse.unauthorizedResponse(res, 'password is wrong');
					}
				});
			} else {
				return apiResponse.unauthorizedResponse(res, 'username is not registered');
			}
		});
	} catch (error) {
		return apiResponse.errorResponse(res, 'a problem occurred', error);
	}
};