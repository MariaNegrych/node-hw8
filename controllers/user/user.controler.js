const {userService} = require('../../service');
const {userHelper: {checkHashPassword, hashPassword}} = require('../../helpers');
const {ErrorHandler} = require('../../error')

module.exports = {

    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            res.json(e)
        }
    },

    getUser: async (req, res) => {
        try {
            res.json(req.user)

            // const {idOfUser} = req.params;
            // const user = await userService.getUser(+idOfUser);
            //
            // res.json(user);

        } catch (e) {
            res.json(e)
        }
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;

            const hashedPassword = await hashPassword(user.password)

            user.password = hashedPassword;

            const createdUser = await userService.createUser(user);

            res.json(createdUser)
        } catch (e) {
            res.json(e)
        }
    },

    updateUser: async (req, res) => {
        try {
            const {idOfUser} = req.params;
            const user = req.body;

            await userService.updateUser(+idOfUser, user);

            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {idOfUser} = req.params;

            await userService.deleteUser(+idOfUser);

            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }
    },

    loginUser: async (req, res, next) => {

        const {email, password} = req.body;

        const user = await userService.getUserByParams({email});

        if (!user) {
            return next(new ErrorHandler('User is not found', 404, 4041));
        }

        await checkHashPassword(user.password, password);

        res.json(user);
    }
}
