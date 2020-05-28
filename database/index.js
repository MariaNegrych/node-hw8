// const cars = [
//     {id: 1, name: "Audi", power: 40, price: 10000, year: 2018},
//     {id: 2, name: "BMW", power: 40, price: 10000, year: 2018},
//     {id: 3, name: "Subaru", power: 40, price: 10000, year: 2018},
//     {id: 4, name: "Tesla", power: 40, price: 10000, year: 2018},
//     {id: 5, name: "Volvo", power: 40, price: 10000, year: 2018},
//     {id: 6, name: "Mercedes", power: 40, price: 10000, year: 2018},
//     {id: 7, name: "Porsche", power: 40, price: 10000, year: 2018},
//     {id: 8, name: "Mazda", power: 40, price: 10000, year: 2018},
//     {id: 9, name: "Subaru", power: 40, price: 10000, year: 2018},
//     {id: 10, name: "Suzuki", power: 40, price: 10000, year: 2018},
// ];

// module.exports = {
//     cars
// };

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = (() => {
    let instance;

    function newConnection() {
        const sequelize = new Sequelize('shop', 'root', 'Mn23081995', {
            host: 'localhost',
            dialect: 'mysql'
        });

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), 'database', 'models'), ((err, files) => {
                if (err) {
                    throw new Error(err.message);
                }

                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = sequelize.import(path.join(process.cwd(), 'database', 'models', modelName));
                });
            }))
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = newConnection();
            }

            return instance;
        }
    }
})();




