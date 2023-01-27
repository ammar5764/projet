const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const projetRoutes = require("./projetRoutes");

router.use("/users", userRoutes);
router.use("/blog", blogRoutes);
router.use("/projets", projetRoutes);

module.exports = router;
