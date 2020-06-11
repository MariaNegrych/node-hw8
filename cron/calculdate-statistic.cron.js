const {userService} = require('../service')

module.exports = async () => {
    let newVar = await userService.getAllUsers();

    console.log(newVar.length)
}
