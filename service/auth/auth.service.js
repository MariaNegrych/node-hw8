const db = require('../../database').getInstance();
const {modelNamesEnum:{TOKEN}} = require('../../constants')

module.exports = {
    getTokensByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.findOne({
            where: params
        })
    },

    deleteByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.destroy({
            where: params
        })
    },

    // updateByParams: (params) => {
    //     const TokenModel = db.getModel(TOKEN);
    //
    //     return TokenModel.update({
    //         where: params
    //     })
    // },

    createTokenPair: (tokens) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.create(tokens);
    }
};
