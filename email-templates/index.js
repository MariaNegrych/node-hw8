const {emailActionEnum} = require('../constants')

module.exports = {
    [emailActionEnum.USER_REGISTER]: {
        subject: '[NODE SHOP] Welcome',
        templateFileName: 'createUser'
    },
    [emailActionEnum.USER_UPDATED]: {
        subject: '[NODE SHOP] Update User',
        templateFileName: 'updateUser'
    },
    [emailActionEnum.USER_DELETED]: {
        subject: '[NODE SHOP] Delete User',
        templateFileName: 'deleteUser'
    },

    [emailActionEnum.PRODUCT_CREATED]: {
        subject: '[NODE SHOP] Create product',
        templateFileName: 'createProduct'
    },
    [emailActionEnum.PRODUCT_UPDATED]: {
        subject: '[NODE SHOP] Update product',
        templateFileName: 'updateProduct'
    },
    [emailActionEnum.PRODUCT_DELETED]: {
        subject: '[NODE SHOP] Delete product',
        templateFileName: 'deleteProduct'
    },
}
