const fs = require('fs-extra').promises;
const path = require('path');

const {userService, productService} = require('../service')

module.exports = async () => {
    let usersNumber = await userService.getAllUsers();
    let productNumber = await productService.getAllProducts();

    console.log(usersNumber.length, productNumber.length);

    await fs.mkdir(path.resolve(process.cwd(), 'statistic'), {recursive: true});

    fs.writeFile(path.join(process.cwd(), 'statistic', 'users.txt'), `${usersNumber.length}`);

    fs.writeFile(path.join(process.cwd(), 'statistic', 'products.txt'), `${productNumber.length}`);
}
