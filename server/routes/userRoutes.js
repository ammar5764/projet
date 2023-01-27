const router = require("express").Router();
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authControllers");



//users...
router.post("/register", userController.signUp);
router.post("/login", userController.signIn);
router.get("/logout", userController.logOut);
router.get("/:id", authController.getOneUser);

module.exports = router;



