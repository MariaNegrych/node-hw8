const bcrypt = require('bcrypt');

module.exports = (promo) => {
    return bcrypt.hash(promo, 10);
};
