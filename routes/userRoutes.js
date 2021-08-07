const app = require("express");
const router = app.Router();
const {register, 
    registerValidations, 
    login, 
    adminlogin,
    loginValidations
} = require("../controllers/userController");

router.post("/register", registerValidations, register );

router.post("/login", loginValidations, login);

router.post("/adminlogin", loginValidations, adminlogin);
module.exports = router;