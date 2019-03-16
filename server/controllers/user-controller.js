const {validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    register: (req, res, next) => {
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return msg;
        };

        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            res.status(422).json({
                message: 'Validation failed, entered data is incorrect',
                errors: errors.mapped()
            });
        } else {
            const {username, password, email} = req.body;
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);

            User.create({
                email,
                hashedPassword,
                username,
                salt
            }).then((user) => {
                res.status(201)
                    .json({message: 'User created!', userId: user._id, username: user.username});
            }).catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            });
        }
    },
    login: (req, res, next) => {
        const {username, password} = req.body;

        User.findOne({username})
            .then((user) => {
                if (!user) {
                    const error = new Error('A user with this username could not be found');
                    error.statusCode = 401;
                    throw error;
                }

                if (!user.authenticate(password)) {
                    const error = new Error('Incorrect password');
                    error.statusCode = 401;
                    throw error;
                }

                const token = jwt.sign({
                        username: user.username,
                        userId: user._id.toString()
                    }
                    , 'somesupersecret'
                    , {expiresIn: '1h'});

                res.status(200).json(
                    {
                        message: `Welcome, ${username}!`,
                        token,
                        userId: user._id.toString(),
                        username: user.username,
                        isAdmin: user.roles.indexOf('Admin') !== -1
                    }
                );
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            });
    }
};