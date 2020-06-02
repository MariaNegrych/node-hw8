const {productService} = require('../../service')
const {ErrorHandler} = require('../../error');

module.exports = async (req, res, next) => {
    const {idOfProduct} = req.params;

    if (+idOfProduct < 0) {
        // return res.status(400).json({message: 'Wrong ID'})
        return next(new ErrorHandler('Id can not be less than 1', 400));
    }

    const product = await productService.getProduct(idOfProduct);

    if (!product) {
        // return res.sendStatus(404)
        return next(new ErrorHandler('Product is not exist', 400));
    }

    req.product = product;

    next();
}
