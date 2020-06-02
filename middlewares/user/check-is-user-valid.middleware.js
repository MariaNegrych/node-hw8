// module.exports = (req, res, next) => {
//     try {
//         const {id, name, age, email, password} = req.body;
//
//         if (!id || !name || !age || !email || !password) {
//             throw new Error('Product is not valid!');
//         }
//         if(name.length < 3){
//             throw new Error('Name is not valid!');
//         }
//
//         if(age < 0){
//             throw new Error('Age is not valid!');
//         }
//
//         if(password.length < 5){
//             throw new Error('Wrong password');
//         }
//
//         next();
//
//     } catch (e) {
//         res.end(e.message);
//     }
// };

const Joi = require('joi');

const UserValidationSchema = require('../../validators/user/new-user.validator');
const {ErrorHandler} = require('../../error');

module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, UserValidationSchema)

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();

    } catch (e) {
        res.end(e.message)
    }
}
