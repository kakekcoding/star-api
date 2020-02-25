const { body } = require('express-validator');

// register validation
const registerValidation = () => {
    return [
        // full_name validation
        body('full_name').isLength({ min: 3, max: 200 })
            .withMessage('full_name min 3 characters, max 200 characters')
            .notEmpty().withMessage('full_name is required').trim(),

        // username validation
        body('username').isLowercase().isLength({ min: 3, max: 15 })
            .withMessage('username min 3 characters, max 15 characters')
            .notEmpty().withMessage('username is required').trim(),

        // email validation
        body('email').isEmail().withMessage('email not valid')
            .notEmpty().withMessage('email is required').trim(),

        // phone_num validation
        body('phone_num').isLength({ min: 9, max: 15 })
            .withMessage('phone_num min 9 characters, max 15 characters')
            .notEmpty().withMessage('phone_num is required').trim(),

        // password validation
        body('password').isLength({ min: 8, max: 200 })
            .withMessage('password min 8 characters, max 200 characters')
            .notEmpty().withMessage('password is required').trim()
    ];
}

const loginValidation = () => {
    return [
        // username validation
        body('username').isLowercase().isLength({ min: 3, max: 15 })
            .withMessage('username min 3 characters, max 15 characters')
            .notEmpty().withMessage('username is required').trim(),

        // password validation
        body('password').isLength({ min: 8, max: 200 })
            .withMessage('password min 8 characters, max 200 characters')
            .notEmpty().withMessage('password is required').trim()
    ];
}

module.exports = { registerValidation, loginValidation };