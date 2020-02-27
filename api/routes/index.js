const express = require('express');
const router = express.Router();
const authController = require('../controller/auth_controller');
const jobApplicantController = require('../controller/job_applicant_controller');
const { registerValidation, loginValidation } = require('../validation/auth_validation');
const { jobApplicantValidation } = require('../validation/job_applicant_validation');
const auth = require('../middleware/auth');

// index
router.get('/', (req, res) => res.send('Welcome'));

// server status
router.get('/status', (req, res) => res.send('Server is up'));

// auth
router.route('/auth/user/register').post(registerValidation(), authController.register);
router.route('/auth/user/authorize').post(loginValidation(), authController.login);

// job applicant
router.route('/job_applicant/create').post(jobApplicantValidation(), jobApplicantController.create);
router.route('/job_applicant').get(auth, jobApplicantController.get);
router.route('/job_applicant/:_id').get(auth, jobApplicantController.getDetail);
router.route('/job_applicant/update/:id').put(auth, jobApplicantController.update);
router.route('/job_applicant/delete/:id').delete(auth, jobApplicantController.delete);

module.exports = router;