const bcrypt = require('bcrypt');

module.exports = async (hashedPromo, promo) => {
    const isPromoEquals = await bcrypt.compare(promo, hashedPromo);
    if (!isPromoEquals) {
        throw new Error('This promo-code is not valid');
    }
}
