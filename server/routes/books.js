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
    body("publisher")
        .trim()
        .not().isEmpty()
        .withMessage("Enter a valid publisher!"),
    body("description")
        .trim()
        .isLength({max: 1000})
        .withMessage("The description must be at most 1000 symbols!"),
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
router.get("/details/:id", auth.isAuthed, bookController.getDetails);
router.post("/create", auth.isAdmin, validator, bookController.create);
router.put("/edit/:id", auth.isAdmin, validator, bookController.edit);
router.delete("/delete/:id", auth.isAdmin, bookController.delete);

module.exports = router;