const router = require("express").Router();
const listController = require("../controllers/list-controller");
const auth = require("../middleware/is-auth");

router.get("/myLists", auth.isAuthed, listController.getLists);
router.get("/details/:id", auth.isAuthed, listController.getDetails);
router.post("/create", auth.isAuthed, listController.create);
router.post("/add", auth.isAuthed, listController.add);
router.post("/remove", auth.isAuthed, listController.remove);
router.post("/delete/:id", auth.isAuthed, listController.delete);

module.exports = router;