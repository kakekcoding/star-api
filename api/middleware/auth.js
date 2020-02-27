const jwt = require('jsonwebtoken');
const apiResponse = require('../helper/api_response');

module.exports = (req, res, next) => {
	try {
		const token = req.header('x-access-token');
		if (!token) return apiResponse.forbiddenResponse(res, 'forbidden');

		const key = process.env.JWT_KEY;
		const verify = jwt.verify(token, key);
        
		req.user = verify;
		next();
	} catch (error) {
		return apiResponse.unauthorizedResponse(res, 'invalid token');
	}
};