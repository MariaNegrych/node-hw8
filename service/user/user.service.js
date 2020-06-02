const db = require('../../database').getInstance();
const {modelNamesEnum:{USER}} = require('../../constants');

module.exports = {
    getAllUsers() {
        const UserModel = db.getModel(USER);

        return UserModel.findAll({});
    },

    getUser(id) {
        const UserModel = db.getModel(USER);

        return UserModel.findByPk(id);
    },

    getUserByParams: (params) => {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            where: params
        })
    },

    createUser(user) {
        const UserModel = db.getModel(USER);

        return UserModel.create(user);
    },

    updateUser(id, user) {
        const UserModel = db.getModel(USER);

        return UserModel.update(user, {where: {id}});
    },

    deleteUser(id) {
        const UserModel = db.getModel(USER);

        return UserModel.destroy({where: {id}});
    }
}
