const router = require("express").Router();
const bookController = require("../controllers/book-controller");
const auth = require("../middleware/is-auth");

router.get("/", bookController.getBooks);
router.get("/details/:id", bookController.getDetails);
router.post("/create", auth.isAdmin, bookController.create);
router.post("/edit/:id", auth.isAdmin, bookController.edit);
router.post("/delete/:id", auth.isAdmin, bookController.delete);

module.exports = router;