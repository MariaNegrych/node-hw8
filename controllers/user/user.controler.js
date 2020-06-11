const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const {emailService, userService} = require('../../service');
const {userHelper: {checkHashPassword, hashPassword}} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    errorsEnum: {NOT_FOUND},
    responseEnum,
    emailActionEnum
} = require('../../constants');

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
            const [avatar] = req.photos;

            const hashedPassword = await hashPassword(user.password)

            user.password = hashedPassword;

             const {id} = await userService.createUser(user);
            console.log(id);

            if (avatar) {
                const photoDir = `users/${id}/photos`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
                await avatar.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
                await userService.updateUser(id, {photo: `/${photoDir}/${photoName}`});
            }

            await emailService.sendMail(
                user.email,
                emailActionEnum.USER_REGISTER,
                {userName: user.name}
            )
            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }
    },

    updateUser: async (req, res) => {
        try {
            const {idOfUser} = req.params;
            const [avatar] = req.photos;
            const newUser = req.body;

            const user = await userService.getUser(+idOfUser);
            await userService.updateUser(+idOfUser, newUser);

            if (avatar) {
                const photoDir = `users/${idOfUser}/photos`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
                await avatar.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
                await userService.updateUser(idOfUser, {photo: `/${photoDir}/${photoName}`}, newUser);
            }

            await emailService.sendMail(
                user.email,
                emailActionEnum.USER_UPDATED,
                {
                    Name: newUser.name,
                    Age: newUser.age,
                    Photo: newUser.photo
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
                    Password: user.password,
                    Photo: user.photo
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
