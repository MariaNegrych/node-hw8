const {productService} = require('../../service');

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
            const {idOfProduct} = req.params;
            const product = await productService.getProduct(+idOfProduct);

            res.json(product);
        } catch (e) {
            res.json(e)
        }
    },

    createProduct: async (req, res) => {
        try {
              const {name, power, price, year} = req.body;

            const createdProduct = await productService.createProduct(name, power, price, year);

            res.json(createdProduct);
        } catch (e) {
            res.json(e)
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;
            const {name, power, price, year} = req.body;

            const updatedProduct = await productService.updateProduct(+idOfProduct, name, power, price, year);

            res.json(updatedProduct);
        } catch (e) {
            res.json(e)
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;

           const deletedProduct = await productService.deleteProduct(+idOfProduct);

            res.json(deletedProduct);
        } catch (e) {
            res.json(e)
        }
    }

};
