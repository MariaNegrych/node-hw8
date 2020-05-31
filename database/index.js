
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




