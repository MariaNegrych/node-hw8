const {Router} = require('express');

const productRouter = Router();

const {productController} = require('../../controllers');
const {productMiddleware: {productIsExsists, productIdValidation}} = require('../../middlewares')

productRouter.get('/', productController.getAllProducts);
productRouter.post('/', productIdValidation, productController.createProduct);

productRouter.use('/:idOfProduct', productIsExsists);
productRouter.get('/:idOfProduct', productController.getProduct);
productRouter.put('/:idOfProduct', productIdValidation, productController.updateProduct);
productRouter.delete('/:idOfProduct', productController.deleteProduct);

module.exports = productRouter;
