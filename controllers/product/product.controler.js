const {productService} = require('../../service');
const {productHelper: {hashPromo, checkHashPromo}} = require('../../helpers');
const {ErrorHandler} = require('../../error')

module.exports = {

    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();

            res.json(products);
        } catch (e) {
            res.json(e)
        }
    },

    getProduct: async (req, res) => {
        try {
            res.json(req.product);
        } catch (e) {
            res.json(e)
        }
    },

    createProduct: async (req, res) => {
        try {
            const product = req.body;

            const hashedPromo = await hashPromo(product.promo)

            product.promo = hashedPromo;

            const createdProduct = await productService.createProduct(product);

            res.json(createdProduct);
        } catch (e) {
            res.json(e)
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;
            const product = req.body;

            const hashedPromo = await hashPromo(product.promo)

            product.promo = hashedPromo;

            await productService.updateProduct(+idOfProduct, product);

            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;

            await productService.deleteProduct(+idOfProduct);

            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }
    },

    getDiscountByPromoCode: async (req, res, next) => {

        const {id, promo} = req.body;

        const product = await productService.getProductByParams({id});


        if (!product){
            return next(new ErrorHandler('Product not exist', 404, 4041))
        }

        const checkCode = await checkHashPromo(product.promo, promo);

        if (!checkCode){
            return next(new ErrorHandler('Promo code is not valid', 404, 4041))
        }

        res.json(product);
    },

};
