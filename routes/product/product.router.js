const {Router} = require('express');

const productRouter = Router();

const {productController: {
    getProduct,
    getAllProducts,
    updateProduct,
    createProduct,
    deleteProduct,
    getDiscountByPromoCode}} = require('../../controllers');
const {productMiddleware: {productIsExsists, productIdValidation}} = require('../../middlewares')

productRouter.get('/', getAllProducts);
productRouter.post('/', productIdValidation, createProduct);
productRouter.post('/sale', getDiscountByPromoCode);

productRouter.use('/:idOfProduct', productIsExsists);
productRouter.get('/:idOfProduct', getProduct);
productRouter.put('/:idOfProduct', productIdValidation, updateProduct);
productRouter.delete('/:idOfProduct', deleteProduct);

module.exports = productRouter;
