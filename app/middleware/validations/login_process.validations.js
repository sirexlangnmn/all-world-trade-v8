const { check, validationResult } = require('express-validator');

const validationMiddleware = [
    check('loginEmailAddress').trim().escape().isEmail().normalizeEmail().withMessage('S: Invalid Email Address.'),
    //check('loginEmailAddress').not().isEmpty().withMessage('S: Email Address is required.').trim().escape(),
];

module.exports = validationMiddleware;
