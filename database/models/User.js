const {modelNamesEnum: {USER, users}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(USER, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING
        }
    }, {
        tableName: users,
        timestamps: false
    });
};
