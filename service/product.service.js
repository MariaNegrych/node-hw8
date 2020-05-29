const db = require('../database').getInstance();

// let {cars} = require('../database');

module.exports = {

    // createProduct(id, name, power, price, year) {
    //     cars.push({id, name, power, price, year});
    // }
    //
    // getProduct(id) {
    //     return cars.filter(car => car.id === id);
    // }
    //
    // getAllProducts(){
    //     return cars;
    // }
    //
    // updateProduct(currentId, updatedId, name, power, price, year) {
    //     const carId = cars.findIndex(car => car.id === currentId);
    //
    //     if(carId === -1)
    //         return;
    //
    //     cars[carId] = {...cars[carId], id: updatedId, name, power, price, year};
    // }
    //
    // deleteProduct(id) {
    //     cars = cars.filter(car => car.id !== id);
    // }

    getAllProducts() {
        const ProductModel = db.getModel('Product');

        return ProductModel.findAll({});
    },

    getProduct(id) {
        const ProductModel = db.getModel('Product');

        return ProductModel.findByPk(id);
    },

    createProduct(product) {
        const ProductModel = db.getModel('Product');

        return ProductModel.create(product);
    },

    updateProduct(id, product) {
        const ProductModel = db.getModel('Product');

        return ProductModel.update(product, {where: {id}});
    },

    deleteProduct(id) {
        const ProductModel = db.getModel('Product');

        return ProductModel.destroy({where: {id}});
    }

}

