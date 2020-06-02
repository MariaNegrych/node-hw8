const {Router} = require('express');

const userRouter = Router();

const {userController} = require('../../controllers');
const {userMiddleware: {userIdValidation, userIsExsists}} = require('../../middlewares')

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userIdValidation, userController.createUser);
userRouter.post('/auth', userController.loginUser);

userRouter.use('/:idOfUser', userIsExsists);
userRouter.get('/:idOfUser', userController.getUser);
userRouter.put('/:idOfUser', userIdValidation, userController.updateUser);
userRouter.delete('/:idOfUser', userController.deleteUser);

module.exports = userRouter;
