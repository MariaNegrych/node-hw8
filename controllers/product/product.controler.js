const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const {productService, userService, emailService} = require('../../service');
const {productHelper: {hashPromo, checkHashPromo}} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {errorsEnum: {NOT_FOUND},  responseEnum, emailActionEnum} = require('../../constants')

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
            const [avatar] = req.photos;
            const [file] = req.docs;
            const idOfUser = req.userId;
            const user = await userService.getUser(idOfUser);

            const hashedPromo = await hashPromo(product.promo)

            product.promo = hashedPromo;

            const {id} = await productService.createProduct(product);

            if (avatar) {
                const photoDir = `products/${id}/photos`;
                const fileExt = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExt}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
                await avatar.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
                await productService.updateProduct(id, {photo: `/${photoDir}/${photoName}`})
            }

            if (file) {
                const fileDir = `products/${id}/files`;
                const fileExt = file.name.split('.').pop();
                const fileName = `${uuid}.${fileExt}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', fileDir), {recursive: true});
                await file.mv(path.resolve(process.cwd(), 'public', fileDir, fileName));
                await productService.updateProduct(id, {file: `/${fileDir}/${fileName}`})
            }

            await emailService.sendMail(
                user.email,
                emailActionEnum.PRODUCT_CREATED,
                {
                    userName: user.name,
                    userEmail: user.email,
                    Name: product.name,
                    Power: product.power,
                    Price: product.price,
                    Year: product.year,
                    Photo: product.photo,
                    File: product.files
                }
            )

            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;
            const product = req.body;
            const [avatar] = req.photos;
            const [file] = req.docs;
            const userId = req.userId;
            const user = await userService.getUser(userId);

            const hashedPromo = await hashPromo(product.promo)

            product.promo = hashedPromo;

            await productService.updateProduct(+idOfProduct, product);

             // await productService.getProduct(idOfProduct);

            if (avatar) {
                const photoDir = `products/${idOfProduct}/photos`;
                const fileExt = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExt}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
                await avatar.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
                await productService.updateProduct(idOfProduct, {photo: `/${photoDir}/${photoName}`}, product)
            }
            if (file) {
                const fileDir = `products/${idOfProduct}/files`;
                const fileExt = file.name.split('.').pop();
                const fileName = `${uuid}.${fileExt}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', fileDir), {recursive: true});
                await file.mv(path.resolve(process.cwd(), 'public', fileDir, fileName));
                await productService.updateProduct(idOfProduct, {file: `/${fileDir}/${fileName}`})
            }

            await emailService.sendMail(
                user.email,
                emailActionEnum.PRODUCT_UPDATED,
                {
                    userName: user.name,
                    userEmail: user.email,
                    Name: product.name,
                    Power: product.power,
                    Price: product.price,
                    Year: product.year,
                    Photo: product.photo,
                    File: product.files
                }
            )

            res.sendStatus(responseEnum.CREATED);
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
                    Year: product.year,
                    Photo: product.photo
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
