const {Router} = require('express');

const productRouter = Router();

const {productController: {
    getProduct,
    getAllProducts,
    updateProduct,
    createProduct,
    deleteProduct,
    getDiscountByPromoCode}} = require('../../controllers');
const {
    productMiddleware: {productIsExsists, productIdValidation},
    authMiddleware: {checkAccessToken}
} = require('../../middlewares')

productRouter.get('/', getAllProducts);
productRouter.post('/', productIdValidation, checkAccessToken, createProduct);
productRouter.post('/sale', getDiscountByPromoCode);

productRouter.use('/:idOfProduct', productIsExsists);
productRouter.get('/:idOfProduct', getProduct);
productRouter.put('/:idOfProduct', productIdValidation,checkAccessToken, updateProduct);
productRouter.delete('/:idOfProduct', checkAccessToken, deleteProduct);

module.exports = productRouter;
