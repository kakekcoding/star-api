const { validationResult } = require('express-validator');
const httpStatus = require('http-status');
const JobApplicantModel = require('../model/job_applicant_model');
const apiResponse = require('../helper/api_response');

exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.unprocessableResponse(res, 'unprocessed', errors.array());
        }

        const emailExist = await JobApplicantModel.findOne({ email: req.body.email });
        if (emailExist) return apiResponse.conflictResponse(res, 'email already registered');

        const phoneExist = await JobApplicantModel.findOne({ phone_num: req.body.phone_num });
        if (phoneExist) return apiResponse.conflictResponse(res, 'phone_num already registered');

        const jobApplicant = new JobApplicantModel({
            full_name: req.body.full_name,
            age: req.body.age,
            email: req.body.email,
            phone_num: req.body.phone_num,
            address: req.body.address,
            served: req.body.served,
            image: req.body.image
        });

        const savedData = await jobApplicant.save();
        return apiResponse.createdResponse(res, 'job applicant created', savedData);
    } catch (error) {
        return apiResponse.errorResponse(res, 'a problem occurred', error);
    }
};

exports.get = async (req, res) => {
    try {
        JobApplicantModel.get((err, result) => {
            if (err) return apiResponse.badRequestResponse(res, 'something wrong', err);

            return apiResponse.successResponse(res, '', result);
        });
    } catch (error) {
        return apiResponse.errorResponse(res, 'a problem occurred', error);
    }
};

exports.getDetail = async (req, res) => {
    try {
        JobApplicantModel.findById(req.params.id, (err, result) => {
            if (err) {
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
        const jobApplicant = new JobApplicantModel({
            _id: req.params.id,
            full_name: req.body.full_name,
            age: req.body.email,
            email: req.body.email,
            phone_num: req.body.phone_num,
            address: req.body.address,
            served: req.body.served,
            image: req.body.image,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at
        });

        JobApplicantModel.findById(req.params.id, (err, found) => {
            if (found === null) {
                return apiResponse.notFoundResponse(res, 'data not found')
            } else {
                JobApplicantModel.findByIdAndUpdate(req.params.id, jobApplicant, {}, (err) => {
                    if (err) {
                        return apiResponse.badRequestResponse(res, 'something wrong', err);
                    } else {
                        return apiResponse.successResponse(res, 'job applicant updated', jobApplicant);
                    }
                });
            }
        });
    } catch (error) {
        return apiResponse.errorResponse(res, 'a problem occurred', error);
    }
};

exports.delete = async (req, res) => {
    JobApplicantModel.findByIdAndRemove(req.params.id)
        .then((found) => {
            if (!found) return apiResponse.notFoundResponse(res, 'data not found');

            apiResponse.successResponse(res, 'success deleted', []);
        }).catch((err) => {
            return apiResponse.errorResponse(res, 'a problem occurred', err);
        });
};