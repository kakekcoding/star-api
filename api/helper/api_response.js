const httpStatus = require('http-status');

/**
 * Success response
 * @param {string} res
 * @param {string} message
 * @param {string} result
 * @return http-status OK
 */
exports.successResponse = function (res, message, result) {
	const results = {
		status: 'success',
		message: message,
		result: result
	};

	return res.status(httpStatus.OK).send(results);
};

/**
 * Created response
 * @param {string} res
 * @param {string} message
 * @param {string} result
 * @return http-status CREATED
 */
exports.createdResponse = function (res, message, result) {
	const results = {
		status: 'success',
		message: message,
		result: result
	};

	return res.status(httpStatus.CREATED).send(results);
};

/**
 * Internal server error response
 * @param {string} res
 * @param {string} message
 * @param {string} result
 * @return http-stattus INTERNAL SERVER ERROR
 */
exports.errorResponse = function (res, message, result) {
	const results = {
		status: 'error',
		message: message,
		result: result
	};

	return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(results);
};

/**
 * Not found response
 * @param {string} res
 * @param {string} message
 * @return http-status NOT FOUND
 */
exports.notFoundResponse = function (res, message) {
	const results = {
		status: 'error',
		message: message,
		result: []
	};

	return res.status(httpStatus.NOT_FOUND).send(results);
};

/**
 * Unprocessable entity response
 * @param {string} res
 * @param {string} message
 * @param {string} result
 * @return http-status UNPROCESSABLE ENTITY
 */
exports.unprocessableResponse = function (res, message, result) {
	const results = {
		status: 'error',
		message: message,
		result: result
	};

	return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(results);
};

/**
 * Conflict or duplicate data response
 * @param {string} res
 * @param {string} message
 * @return http-status CONFLICT
 */
exports.conflictResponse = function (res, message) {
	const results = {
		status: 'error',
		message: message,
		result: []
	};

	return res.status(httpStatus.CONFLICT).send(results);
};

/**
 * Unauthorized response
 * @param {string} res
 * @param {string} message
 * @return http-status UNAUTHORIZED
 */
exports.unauthorizedResponse = function (res, message) {
	const results = {
		status: 'error',
		message: message,
		result: []
	};

	return res.status(httpStatus.UNAUTHORIZED).send(results);
};

/**
 * Forbidden response
 * @param {string} res
 * @param {string} message
 * @return http-status FORBIDDEN
 */
exports.forbiddenResponse = function (res, message) {
	const results = {
		status: 'error',
		message: message,
		result: []
	};

	return res.status(httpStatus.FORBIDDEN).send(results);
};

/**
 * Bad request response
 * @param {string} res
 * @param {string} message
 * @param {string} result
 * @return http-status BAD REQUEST
 */
exports.badRequestResponse = function (res, message, result) {
	const results = {
		status: 'error',
		message: message,
		result: result
	};

	return res.status(httpStatus.BAD_REQUEST).send(results);
};