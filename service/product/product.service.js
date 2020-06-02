const db = require('../../database').getInstance();
const {modelNamesEnum: {PRODUCT}} = require('../../constants')

module.exports = {

    getAllProducts() {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findAll({});
    },

    getProduct(id) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findByPk(id);
    },

    getProductByParams: (params) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findOne({
            where: params
        })
    },

    createProduct(product) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.create(product);
    },

    updateProduct(id, product) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.update(product, {where: {id}});
    },

    deleteProduct(id) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.destroy({where: {id}});
    }

}

