const jwt = require('jsonwebtoken');
const User = require("mongoose").model("User");

module.exports.isAuthed = (req, res, next) => {
    const authHeaders = req.get('Authorization');

    if (!authHeaders) {
        return res.status(401)
            .json({message: 'Not authenticated.'})
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'somesupersecret')
    } catch (error) {
        return res.status(401)
            .json({message: 'Token is invalid.', error});
    }

    if (!decodedToken) {
        return res.status(401)
            .json({message: 'Not authenticated.'});
    }

    req.userId = decodedToken.userId;
    next();
};

module.exports.isAdmin = (req, res, next) => {
    const authHeaders = req.get('Authorization');

    if (!authHeaders) {
        return res.status(401)
            .json({message: 'Not authenticated.'})
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'somesupersecret')
    } catch (error) {
        return res.status(401)
            .json({message: 'Token is invalid.', error});
    }

    if (!decodedToken) {
        return res.status(401)
            .json({message: 'You are not authenticated.'});
    }

    req.userId = decodedToken.userId;

    User.findById(decodedToken.userId)
        .then((user) => {
            if (user.roles.indexOf("Admin") >= 0) {
                req.isAdmin = true;
                next();
            } else {
                return res.status(401)
                    .json({message: 'Not authorized.'});
            }
        })
        .catch((error) => {
            return res.status(500)
                .json({ message: "Something wrong happened.", error });
        });
};