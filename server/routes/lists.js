const router = require("express").Router();
const { body } = require("express-validator/check");
const auth = require("../middleware/is-auth");
const listController = require("../controllers/list-controller");

const validator = [
    body("title")
        .trim()
        .not().isEmpty()
        .withMessage("Enter a valid title!")
        .isLength({max: 30})
        .withMessage("The title must be at most 30 symbols!")
];

router.get("/myLists", auth.isAuthed, listController.getLists);
router.get("/details/:id", auth.isAuthed, listController.getDetails);
router.post("/create", auth.isAuthed, validator, listController.create);
router.put("/add", auth.isAuthed, listController.add);
router.put("/remove", auth.isAuthed, listController.remove);
router.delete("/delete/:id", auth.isAuthed, listController.delete);

module.exports = router;