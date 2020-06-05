const bcrypt = require('bcrypt');
const {ErrorHandler} = require('../../error');
const {errorsEnum: {NOT_VALID_TOKEN}, responseEnum} = require('../../constants/')

module.exports = async (hashedPromo, promo) => {
    const isPromoEquals = await bcrypt.compare(promo, hashedPromo);
    if (!isPromoEquals) {
        throw new ErrorHandler(NOT_VALID_TOKEN.message, responseEnum.NOT_FOUND);
    }
}
