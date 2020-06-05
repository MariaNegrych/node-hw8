const {userService} = require('../../service')
const {ErrorHandler} = require('../../error');
const {errorsEnum: {NOT_FOUND}, responseEnum} = require('../../constants')


module.exports = async (req, res, next) => {
    const {idOfUser} = req.params;
    if (+idOfUser < 0) {
        // return res.status(400).json({message: 'Wrong ID'})
        return next(new ErrorHandler(NOT_FOUND.message, responseEnum.BAD_REQUEST));
    }

    const user = await userService.getUser(idOfUser);

    if (!user) {
        // return res.sendStatus(404)
        return next(new ErrorHandler(NOT_FOUND.message, responseEnum.NOT_FOUND));
    }

    req.user = user;

    next();
}
