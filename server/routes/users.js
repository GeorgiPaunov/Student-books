const router = require("express").Router();
const userController = require("../controllers/user-controller");
const auth = require("../middleware/is-auth");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
