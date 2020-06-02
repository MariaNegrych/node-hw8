// module.exports = (req, res, next) => {
//     try {
//         const {id, name, power, price, year} = req.body;
//
//         if (!id || !name || !power || !price || !year) {
//             throw new Error('Product is not valid!');
//         }
//         if(name.length < 3){
//             throw new Error('Name is not valid!');
//         }
//
//         if(power < 0){
//             throw new Error('Power is not valid!');
//         }
//
//         if(price < 0){
//             throw new Error('Price is not valid!');
//         }
//         if(year < 2000){
//             throw new Error('Car is so old!');
//         }
//
//         next();
//
//     } catch (e) {
//         res.end(e.message);
//     }
// };

const Joi = require('joi');

const ProductValidationSchema = require('../../validators/product/new-product.validator');
const {ErrorHandler} = require('../../error')

module.exports = (req, res, next) => {
    try {
        const product = req.body;

        const {error} = Joi.validate(product, ProductValidationSchema)

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();

    } catch (e) {
        res.end(e.message)
    }
}
