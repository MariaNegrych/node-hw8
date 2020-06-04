const jwt = require('jsonwebtoken');

const {wordsEnum: {JWT_REFRESH_SECRET, JWT_SECRET}} = require('../constants');


module.exports = () => {
    const access_token = jwt.sign({data: "You are teapot)))"}, JWT_SECRET, {expiresIn: '10m'})
    const refresh_token = jwt.sign({data: "You are teapot too)))"}, JWT_REFRESH_SECRET, {expiresIn: '1d'})

    return {
        access_token,
        refresh_token
    }
}
