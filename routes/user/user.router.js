const {Router} = require('express');

const userRouter = Router();

const {
    userController: {
        getUser,
        getAllUsers,
        deleteUser,
        createUser,
        updateUser,
        loginUser
    }
} = require('../../controllers');
const {
    userMiddleware: {userIdValidation, userIsExsists, userUpdateIdValidation},
    fileMiddleware: {checkUserPhotoCountMiddleware, fileCheckerMiddleware}
} = require('../../middlewares')

userRouter.get('/', getAllUsers);
userRouter.post('/', userIdValidation, fileCheckerMiddleware, checkUserPhotoCountMiddleware, createUser);
userRouter.post('/auth', loginUser);

userRouter.use('/:idOfUser', userIsExsists);
userRouter.get('/:idOfUser', getUser);
userRouter.put('/:idOfUser', userUpdateIdValidation,fileCheckerMiddleware, checkUserPhotoCountMiddleware, updateUser);
userRouter.delete('/:idOfUser', deleteUser);

module.exports = userRouter;
