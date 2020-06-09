const {emailService, userService} = require('../../service');
const {userHelper: {checkHashPassword, hashPassword}} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    errorsEnum: {NOT_FOUND},
    responseEnum,
    emailActionEnum
} = require('../../constants')

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

            await userService.createUser(user);

            await emailService.sendMail(
                user.email,
                emailActionEnum.USER_REGISTER,
                {userName: user.name}
            )
            res.sendStatus(204)
        } catch (e) {
            res.json(e)
        }
    },

    updateUser: async (req, res) => {
        try {
            const {idOfUser} = req.params;
            const newUser = req.body;

            const user = await userService.getUser(+idOfUser);
            await userService.updateUser(+idOfUser, newUser);

            await emailService.sendMail(
                user.email,
                emailActionEnum.USER_UPDATED,
                {
                    Name: newUser.name,
                    Age: newUser.age
                }
            )

            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {idOfUser} = req.params;
            // const user = req.body;

            const user = await userService.getUser(+idOfUser);
            await userService.deleteUser(+idOfUser);

            await emailService.sendMail(
                user.email,
                emailActionEnum.USER_DELETED,
                {
                    Name: user.name,
                    Age: user.age,
                    Email: user.email,
                    Password: user.password
                }
            )

            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }
    },

    loginUser: async (req, res, next) => {

        const {email, password} = req.body;

        const user = await userService.getUserByParams({email});

        if (!user) {
            return next(new ErrorHandler(NOT_FOUND.message, responseEnum.NOT_FOUND));
        }

        await checkHashPassword(user.password, password);

        res.json(user);
    }
}
