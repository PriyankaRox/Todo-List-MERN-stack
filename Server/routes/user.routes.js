const usercontroller = require("../controllers/user.controllers")

module.exports = function(app){
    app.post('/api/register', usercontroller.createUserController );

    app.post('/api/login', usercontroller.loginController);
}