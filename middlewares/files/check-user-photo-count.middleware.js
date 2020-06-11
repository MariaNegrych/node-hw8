const {ErrorHandler} = require('../../error')
const {
    responseEnum: {BAD_REQUEST},
    errorsEnum: {CHECK_USER_FILE, CHECK_USER_PHOTO_COUNT}
} = require('../../constants')

module.exports = (req, res, next) => {

    if (req.docs.length) {
        return next(new ErrorHandler(CHECK_USER_FILE.message, BAD_REQUEST));
    }

    if (req.photos.length > 1) {
        return next(new ErrorHandler(CHECK_USER_PHOTO_COUNT.message, BAD_REQUEST));
    }

    next();
}
