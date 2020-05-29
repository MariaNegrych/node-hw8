const {productService} = require('../../service')

module.exports = async (req, res, next) => {
    const {idOfProduct} = req.params;

    if (+idOfProduct < 0) {
        return res.status(400).json({message: 'Wrong ID'})
    }

    const product = await productService.getProduct(idOfProduct);

    if (!product) {
        return res.sendStatus(404)
    }

    req.product = product;

    next();
}
