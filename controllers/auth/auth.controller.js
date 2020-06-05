const {authService, userService} = require('../../service');
const {
    tokinizer,
    userHelper: {checkHashPassword}
} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    requestEnum: {Authorization},
    errorsEnum: {NOT_FOUND},
    responseEnum
} = require('../../constants');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler(NOT_FOUND.message, responseEnum.NOT_FOUND));
            }

            await checkHashPassword(user.password, password);

            const tokens = tokinizer();

            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    },

    logoutUser: async (req, res) => {
        const access_token = req.get(Authorization);

        await authService.deleteByParams({access_token});

        res.sendStatus(responseEnum.CREATED);
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(Authorization);

            const {userId} = await authService.getTokensByParams({refresh_token});

            if (!userId) {
                return next(new ErrorHandler(NOT_FOUND.message, responseEnum.NOT_FOUND));
            }
            await authService.deleteByParams({refresh_token});

            const tokens = tokinizer();

            await authService.createTokenPair({userId, ...tokens});

            res.json(tokens);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    }

};
