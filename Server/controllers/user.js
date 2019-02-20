const { validationResult } = require('express-validator/check');
const User = require("mongoose").model("User");
const encryption = require('../util/encryption');

function validateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        });

        return false;
    }

    return true;
}

module.exports = {
    register: (req, res, next) => {
        if (validateUser(req, res)) {
            const { email, password, username } = req.body;
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);

            User.create({
                email,
                hashedPassword,
                username,
                salt,
                roles: []
            }).then((user) => {
                req.logIn(user, (err, user) => {
                    if (err) {
                        const error = new Error("Something went wrong.");
                        error.statusCode = 500;
                        throw error;
                    } else {
                        res.status(201)
                            .json({ message: 'User created!' });
                    }
                });
            }).catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            });
        }
    },
    login: (req, res, next) => {
        const { email, password } = req.body;

        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    const error = new Error('Invalid email');
                    error.statusCode = 401;
                    throw error;
                }

                if(!user.authenticate(password)) {
                    const error = new Error('Invalid password');
                    error.statusCode = 401;
                    throw error;
                }

                req.logIn(user, (err, user) => {
                    if (err) {
                        const error = new Error("Something went wrong.");
                        error.statusCode = 500;
                        throw error;
                    } else {
                        res.status(200)
                            .json({ message: 'Successfully logged in!' });
                    }
                });
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            });
    },
    logout: (req, res) => {
        req.logout();
        res.status(200)
            .json({ message: 'Successfully logged out!' });
    }
};