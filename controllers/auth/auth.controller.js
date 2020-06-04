const {authService, userService} = require('../../service');
const {tokinizer, userHelper: {checkHashPassword}} = require('../../helpers');
const ErrorHandler = require('../../error/ErrorHandler');
const {Authorization} = require('../../constants/words.enum')

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler('NO USER', 404, 4041));
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

        res.sendStatus(200);
    },

    refreshToken: async (req, res) => {
        const refresh_token = req.get(Authorization);

        await authService.deleteByParams({refresh_token});

        const {email, password} = req.body;
        const user = await userService.getUserByParams({email});

        if (!user) {
            return next(new ErrorHandler('NO USER', 404, 4041));
        }

        await checkHashPassword(user.password, password);
        
        const tokens = tokinizer();

        await authService.createTokenPair({...tokens, userId: user.id});

        res.json(tokens);

    }
};
