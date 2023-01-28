const router = require("express").Router();
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController");



//auth users...
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);

//crud users profile
router.get('/',userController.getUsers)
router.get("/:id", userController.getOneUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.patch('/follow/:id',userController.follow);
router.patch('/unfollow/:id',userController.unFollow)

module.exports = router;



