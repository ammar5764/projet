const router = require("express").Router();
const blogController = require("../controllers/blogController");

//blog
router.get("/", blogController.get_blogs);
router.get("/:id", blogController.get_blog);
router.post("/", blogController.create_blog);
router.delete("/:id", blogController.delete_blog);
router.put("/:id", blogController.update_blog);

module.exports = router;