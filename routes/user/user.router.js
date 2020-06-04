const {Router} = require('express');

const userRouter = Router();

const {userController: {
    getUser,
    getAllUsers,
    deleteUser,
    createUser,
    updateUser,
    loginUser}} = require('../../controllers');
const {userMiddleware: {userIdValidation, userIsExsists}} = require('../../middlewares')

userRouter.get('/', getAllUsers);
userRouter.post('/', userIdValidation, createUser);
userRouter.post('/auth', loginUser);

userRouter.use('/:idOfUser', userIsExsists);
userRouter.get('/:idOfUser', getUser);
userRouter.put('/:idOfUser', userIdValidation, updateUser);
userRouter.delete('/:idOfUser', deleteUser);

module.exports = userRouter;
