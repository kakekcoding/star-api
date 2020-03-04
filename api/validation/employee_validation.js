const { body } = require('express-validator');

// employee validation
const employeeValidation = () => {
    return [
        // full_name validation
        body('full_name').isLength({ min: 3, max: 200 })
            .withMessage('full_name min 3 characters, max 200 characters')
            .notEmpty().withMessage('full_name is required').trim(),

        // email validation
        body('email').isEmail().withMessage('email not valid')
            .notEmpty().withMessage('email is required').trim(),

        // phone_num validation
        body('phone_num').isLength({ min: 9, max: 15 })
            .withMessage('phone_num min 9 characters, max 15 characters')
            .notEmpty().withMessage('phone_num is required').trim(),

        // address validation
        body('address').notEmpty().withMessage('address is required').trim(),

        // position validation
        body('position').notEmpty().withMessage('position is required').trim(),

        // salary validation
        body('salary').isLength({ min: 7, max: 9 })
            .withMessage('salary min 7 characters, max 9 characters')
            .notEmpty().withMessage('salary is required').trim(),
    ];
};

module.exports = { employeeValidation };