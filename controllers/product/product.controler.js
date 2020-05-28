const {productService} = require('../../service');

module.exports = {

    getAllProducts: async (req, res) => {
        try {
            const cars = await productService.getAllProducts();

            res.json(cars);
        } catch (e) {
            res.json(e)
        }
    },

    getProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;
            const car = await productService.getProduct(+idOfProduct);

            res.json(car);
        } catch (e) {
            res.json(e)
        }
    },

    createProduct: async (req, res) => {
        try {
            const {name, power, price, year} = req.body;

            const createdCar = await productService.createProduct(name, power, price, year);

            res.json(createdCar);
        } catch (e) {
            res.json(e)
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;
            const {name, power, price, year} = req.body;

            const updatedCar = await productService.updateProduct(+idOfProduct, name, power, price, year);

            res.json(updatedCar);
        } catch (e) {
            res.json(e)
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const {idOfProduct} = req.params;

           const deletedCar = await productService.deleteProduct(+idOfProduct);

            res.json(deletedCar);
        } catch (e) {
            res.json(e)
        }
    }

};
