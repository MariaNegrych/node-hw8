const {Router} = require('express');

const authRouter = Router();

const {authController: {loginUser,logoutUser, refreshToken}} = require('../../controllers')
const {authMiddleware: {checkAccessToken, checkRefreshToken}} = require('../../middlewares')

authRouter.post('/', loginUser);
authRouter.post('/logout', checkAccessToken, logoutUser);
authRouter.post('/refresh', checkRefreshToken, refreshToken); // TODO

module.exports = authRouter;
