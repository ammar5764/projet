const router = require("express").Router();
const projetsController = require("../controllers/projetsController");

//projets
router.get("/", projetsController.get_projets);

module.exports = router;
