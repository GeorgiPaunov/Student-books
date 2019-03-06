const router = require("express").Router();
const { body } = require("express-validator/check");
const auth = require("../middleware/is-auth");
const bookController = require("../controllers/book-controller");

const validator = [
    body("title")
        .trim()
        .not().isEmpty()
        .withMessage("Enter a valid title!"),
    body("grade")
        .not().isEmpty()
        .withMessage("Enter a valid grade!")
        .isInt({min: 1, max: 12, allow_leading_zeroes: false})
        .withMessage("The grade must be between 1 and 12!"),
    body("subject")
        .trim()
        .not().isEmpty()
        .withMessage("Enter a valid subject!"),
    body("description")
        .trim()
        .isLength({max: 300})
        .withMessage("The description must be at most 300 symbols!"),
    body("imageUrl")
        .trim()
        .not().isEmpty()
        .withMessage("Enter a valid image location!"),
    body("price")
        .not().isEmpty()
        .withMessage("Enter a valid price!")
        .isFloat({gt: 0})
        .withMessage("Enter a valid price!")
];

router.get("/", bookController.getBooks);
router.get("/details/:id", bookController.getDetails);
router.post("/create", auth.isAdmin, validator, bookController.create);
router.post("/edit/:id", auth.isAdmin, bookController.edit);
router.post("/delete/:id", auth.isAdmin, bookController.delete);

module.exports = router;