const router = require('express').Router();
const userController = require('../controllers/user');
const auth = require("../config/auth");

router.post('/register', auth.isAnonymous, userController.register);
router.post('/login', auth.isAnonymous ,userController.login);
router.post('/logout', auth.isAuthed, userController.logout);

module.exports = router;