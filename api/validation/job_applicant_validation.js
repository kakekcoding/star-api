const { body } = require('express-validator');

// job applicant validation
const jobApplicantValidation = () => {
    return [
        // full_name validation
        body('full_name').isLength({ min: 3, max: 200 })
            .withMessage('full_name min 3 characters, max 200 characters')
            .notEmpty().withMessage('full_name is required').trim(),

        // age validation
        body('age').isNumeric().withMessage('age must be numeric')
            .isLength({ min: 2, max: 3 }).withMessage('age min 2 digit, max 3 digits')
            .notEmpty().withMessage('age is required').trim(),

        // email validation
        body('email').isEmail().withMessage('email not valid')
            .notEmpty().withMessage('email is required').trim(),

        // phone_num validation
        body('phone_num').isLength({ min: 9, max: 15 })
            .withMessage('phone_num min 9 characters, max 15 characters')
            .notEmpty().withMessage('phone_num is required').trim(),

        // address validation
        body('address').notEmpty().withMessage('address is required').trim(),

        // served validation
        body('served').notEmpty().withMessage('served is required').trim(),

        // image validation
        body('image').notEmpty().withMessage('served is required').trim(),
    ];
};

module.exports = { jobApplicantValidation };