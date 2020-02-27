const JAStatusModel = require('../model/ja_status_model');
const apiResponse = require('../helper/api_response');

exports.create = async (req, res) => {
	try {
		const jAStatus = new JAStatusModel({
			status: req.body.status
		});

		const savedData = await jAStatus.save();
		return apiResponse.createdResponse(res, 'status created', savedData);
	} catch (error) {
		return apiResponse.errorResponse(res, 'a problem occurred', error);
	}
};

exports.get = async (req, res) => {
	try {
		JAStatusModel.get((err, result) => {
			if (err) {
				return apiResponse.badRequestResponse(res, 'something wrong', err);
			} else {
				return apiResponse.successResponse(res, '', result);
			}
		});
	} catch (error) {
		return apiResponse.errorResponse(res, 'a problem occurred', error);
	}
};

exports.update = async (req, res) => {
	try {
		const JAStatus = new JAStatusModel({
			_id: req.params.id,
			status: req.body.status
		});

		JAStatusModel.findById(req.params.id, (err, found) => {
			if (found === null) {
				return apiResponse.notFoundResponse(res, 'data not found');
			} else {
				JAStatusModel.findByIdAndUpdate(req.params.id, JAStatus, {}, (err) => {
					if (err) {
						return apiResponse.badRequestResponse(res, 'something wrong', err);
					} else {
						return apiResponse.successResponse(res, 'status updated', JAStatus);
					}
				});
			}
		});
	} catch (error) {
		return apiResponse.errorResponse(res, 'a problem occurred', error);
	}
};

exports.delete = async (req, res) => {
	JAStatusModel.findByIdAndRemove(req.params.id)
		.then((found) => {
			if (!found) return apiResponse.notFoundResponse(res, 'data not found');

			apiResponse.successResponse(res, 'success deleted', []);
		}).catch((err) => {
			return apiResponse.errorResponse(res, 'a problem occurred', err);
		});
};