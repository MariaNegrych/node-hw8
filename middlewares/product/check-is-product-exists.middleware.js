const {productService} = require('../../service')
const {ErrorHandler} = require('../../error');
const {errorsEnum: {NOT_FOUND}, responseEnum} = require('../../constants')

module.exports = async (req, res, next) => {
    const {idOfProduct} = req.params;

    if (+idOfProduct < 0) {
        // return res.status(400).json({message: 'Wrong ID'})
        return next(new ErrorHandler(NOT_FOUND.message, responseEnum.BAD_REQUEST));
    }

    const product = await productService.getProduct(idOfProduct);

    if (!product) {
        // return res.sendStatus(404)
        return next(new ErrorHandler(NOT_FOUND.message, responseEnum.NOT_FOUND));
    }

    req.product = product;

    next();
}
