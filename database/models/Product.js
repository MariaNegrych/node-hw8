const {modelNamesEnum: {PRODUCT, products}} = require('../../constants')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(PRODUCT, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        power: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: products,
        timestamps: false
    });
};
