const jwt = require('jsonwebtoken');

const {
    wordsEnum: {JWT_REFRESH_SECRET},
    requestEnum: {Authorization},
    errorsEnum: {NOT_FOUND, NOT_VALID_TOKEN}
} = require('../../constants');
const {authService} = require('../../service');
const ErrorHandler = require('../../error/ErrorHandler');


module.exports = async (req, res, next) => {
    try {
        const token = req.get(Authorization);

        if (!token) {
            return next(new ErrorHandler(NOT_FOUND.message, NOT_FOUND.code));
        }

        jwt.verify(token, JWT_REFRESH_SECRET, err => {
            if (err) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }
        });

        const tokensFromDB = await authService.getTokensByParams({refresh_token: token})

        if (!tokensFromDB) {
            return next(new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code));
        }

        req.userId = tokensFromDB.userId
        next()
    } catch (e) {
        next(e)
    }
}
