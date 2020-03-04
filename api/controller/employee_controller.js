const { validationResult } = require('express-validator');
const EmployeeModel = require('../model/employee_model');
const apiResponse = require('../helper/api_response');

exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.unprocessableResponse(res, 'unprocessed', errors.array());
        }

        const emailExist = await EmployeeModel.findOne({ email: req.body.email });
        if (emailExist) return apiResponse.conflictResponse(res, 'email already exist');

        const phoneExist = await EmployeeModel.findOne({ phone_num: req.body.phone_num });
        if (phoneExist) return apiResponse.conflictResponse(res, 'phone_num already exist');

        const employee = new EmployeeModel({
            full_name: req.body.full_name,
            email: req.body.email,
            phone_num: req.body.phone_num,
            address: req.body.address,
            position: req.body.position,
            salary: req.body.salary,
        });

        const savedData = await employee.save();
        return apiResponse.createdResponse(res, 'employee created', savedData);
    } catch (error) {
        return apiResponse.errorResponse(res, 'a problem occurred', error);
    }
};

exports.get = async (req, res) => {
    try {
        EmployeeModel.get((err, result) => {
            if (err) return apiResponse.badRequestResponse(res, 'something wrong', err);

            return apiResponse.successResponse(res, '', result);
        });
    } catch (error) {
        return apiResponse.errorResponse(res, 'a problem occurred', error);
    }
};

exports.getDetail = async (req, res) => {
    try {
        EmployeeModel.findById(req.params.id, (err, result) => {
            if (err) {
                return apiResponse.badRequestResponse(res, 'something wrong', err);
            } else if (!result) {
                return apiResponse.notFoundResponse(res, 'data not found');
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
		const employee = new EmployeeModel({
			_id: req.params.id,
			full_name: req.body.full_name,
			email: req.body.email,
			phone_num: req.body.phone_num,
			address: req.body.address,
            position: req.body.position,
            salary: req.body.salary,
            image: req.body.image,
            status: req.body.status,
			created_at: req.body.created_at,
			updated_at: req.body.updated_at
		});

		EmployeeModel.findById(req.params.id, (err, found) => {
			if (!found) {
				return apiResponse.notFoundResponse(res, 'data not found');
			} else {
				EmployeeModel.findByIdAndUpdate(req.params.id, employee, {}, (err) => {
					if (err) {
						return apiResponse.badRequestResponse(res, 'something wrong', err);
					} else {
						return apiResponse.successResponse(res, 'job applicant updated', employee);
					}
				});
			}
		});
	} catch (error) {
		return apiResponse.errorResponse(res, 'a problem occurred', error);
	}
};

exports.delete = async (req, res) => {
	EmployeeModel.findByIdAndRemove(req.params.id)
		.then((found) => {
			if (!found) return apiResponse.notFoundResponse(res, 'data not found');

			apiResponse.successResponse(res, 'success deleted', []);
		}).catch((err) => {
			return apiResponse.errorResponse(res, 'a problem occurred', err);
		});
};