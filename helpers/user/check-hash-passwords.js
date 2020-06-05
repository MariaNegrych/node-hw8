const bcrypt = require('bcrypt');

const {ErrorHandler} = require('../../error');
const {errorsEnum: {NOT_FOUND}, responseEnum} = require('../../constants')

module.exports = async (hashedPassword, password) => {
    const isPasswordsEquals = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordsEquals) {
        throw new ErrorHandler(NOT_FOUND.message, responseEnum.UNAUTHORIZED);
    }
}
