const router = require("express").Router();
const { body } = require("express-validator/check");
const User = require("mongoose").model("User");
const userController = require("../controllers/user-controller");

const validator = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Enter a valid email!")
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
                    return Promise.reject("A user with this email already exists!");
                }
            })
        }),
    body("username")
        .trim()
        .not().isEmpty()
        .withMessage("Enter a valid username!")
        .isLength({min: 3})
        .withMessage("The username should be at least 3 symbols long!")
        .isLength({max: 20})
        .withMessage("The username should be at most 20 symbols long!"),
    body("password")
        .trim()
        .not().isEmpty()
        .withMessage("Enter a valid password!")
        .isLength({min: 5})
        .withMessage("The password should be at least 5 symbols long!")
];

router.post("/register", validator, userController.register);
router.post("/login", userController.login);

module.exports = router;
