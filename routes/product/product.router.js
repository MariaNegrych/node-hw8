const {Router} = require('express');

const productRouter = Router();

const {productController} = require('../../controllers');
const  checkProductValidity = require('../../middlewares/product/check-is-product-valid.middleware');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:idOfProduct', productController.getProduct);
productRouter.post('/', checkProductValidity, productController.createProduct);
productRouter.put('/:idOfProduct',checkProductValidity, productController.updateProduct);
productRouter.delete('/:idOfProduct', productController.deleteProduct);

module.exports = productRouter;
