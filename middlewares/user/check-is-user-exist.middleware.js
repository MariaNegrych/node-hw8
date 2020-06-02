const {userService} = require('../../service')
const {ErrorHandler} = require('../../error');


module.exports = async (req, res, next) => {
    const {idOfUser} = req.params;
    if (+idOfUser < 0) {
        // return res.status(400).json({message: 'Wrong ID'})
        return next(new ErrorHandler('Wrong ID', 400));
    }

    const user = await userService.getUser(idOfUser);

    if (!user) {
        // return res.sendStatus(404)
        return next(new ErrorHandler('No user', 400));
    }

    req.user = user;

    next();
}
