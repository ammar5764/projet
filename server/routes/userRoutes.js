const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.post("/register", userController.signUp);
router.post("/login", userController.signIn);
router.get('/logout',userController.logOut)

module.exports = router;
