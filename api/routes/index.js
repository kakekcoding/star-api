const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controller/auth_controller');
const jobApplicantController = require('../controller/job_applicant_controller');
const jAStatusController = require('../controller/ja_status_controller');
const employeeController = require('../controller/employee_controller');
const { registerValidation, loginValidation } = require('../validation/auth_validation');
const { jobApplicantValidation } = require('../validation/job_applicant_validation');
const { employeeValidation } = require('../validation/employee_validation');


// index
router.get('/', (req, res) => res.send('Welcome'));

// server status
router.get('/system/status', (req, res) => res.send('Server is up'));

// auth
router.route('/auth/user/register').post(registerValidation(), authController.register);
router.route('/auth/user/authorize').post(loginValidation(), authController.login);

// job applicant
router.route('/job_applicant/create').post(jobApplicantValidation(), jobApplicantController.create);
router.route('/job_applicant').get(auth, jobApplicantController.get);
router.route('/job_applicant/:id').get(auth, jobApplicantController.getDetail);
router.route('/job_applicant/update/:id').put(auth, jobApplicantController.update);
router.route('/job_applicant/delete/:id').delete(auth, jobApplicantController.delete);

// job applicant status
router.route('/ja/status/create').post(auth, jAStatusController.create);
router.route('/ja/status').get(auth, jAStatusController.get);
router.route('/ja/status/update/:id').put(auth, jAStatusController.update);
router.route('/ja/status/delete/:id').delete(auth, jAStatusController.delete);

// employee
router.route('/employee/create').post(employeeValidation(), auth, employeeController.create);
router.route('/employee').get(auth, employeeController.get);
router.route('/employee/:id').get(auth, employeeController.getDetail);
router.route('/employee/update/:id').put(auth, employeeController.update);
router.route('/employee/delete/:id').delete(auth, employeeController.delete);

module.exports = router;