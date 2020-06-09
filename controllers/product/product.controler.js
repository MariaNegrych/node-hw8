const {productService, userService, emailService} = require('../../service');
const {productHelper: {hashPromo, checkHashPromo}} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {errorsEnum: {NOT_FOUND},  responseEnum: {CREATED}, emailActionEnum} = require('../../constants')

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
            const idOfUser = req.userId;
            const user = await userService.getUser(idOfUser);

            const hashedPromo = await hashPromo(product.promo)

            product.promo = hashedPromo;

            const createdProduct = await productService.createProduct(product);

            await emailService.sendMail(
                user.email,
                emailActionEnum.PRODUCT_CREATED,
                {
                    userName: user.name,
                    userEmail: user.email,
                    Name: product.name,
                    Power: product.power,
                    Price: product.price,
                    Year: product.year
                }
            )

            res.json(createdProduct);
        } catch (e) {
            res.json(e)
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;
            const product = req.body;
            const userId = req.userId;
            const user = await userService.getUser(userId);

            const hashedPromo = await hashPromo(product.promo)

            product.promo = hashedPromo;

            await productService.updateProduct(+idOfProduct, product);


            await emailService.sendMail(
                user.email,
                emailActionEnum.PRODUCT_UPDATED,
                {
                    userName: user.name,
                    userEmail: user.email,
                    Name: product.name,
                    Power: product.power,
                    Price: product.price,
                    Year: product.year
                }
            )

            res.sendStatus(CREATED);
        } catch (e) {
            res.json(e)
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;
            const idOfUser = req.userId;
            const user = await userService.getUser(idOfUser);

            const product = await productService.getProduct(idOfProduct);
            await productService.deleteProduct(+idOfProduct);

            await emailService.sendMail(
                user.email,
                emailActionEnum.PRODUCT_DELETED,
                {
                    userName: user.name,
                    userEmail: user.email,
                    Name: product.name,
                    Power: product.power,
                    Price: product.price,
                    Year: product.year
                }
            )

            res.sendStatus(CREATED);
        } catch (e) {
            res.json(e)
        }
    },

    getDiscountByPromoCode: async (req, res, next) => {

        const {id, promo} = req.body;

        const product = await productService.getProductByParams({id});


        if (!product){
            return next(new ErrorHandler(NOT_FOUND.message, responseEnum.NOT_FOUND))
        }

        const checkCode = await checkHashPromo(product.promo, promo);

        if (!checkCode){
            return next(new ErrorHandler(NOT_FOUND.message, responseEnum.NOT_FOUND))
        }

        res.json(product);
    },

};
