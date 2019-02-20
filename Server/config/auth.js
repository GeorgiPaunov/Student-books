module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            const error = new Error("Invalid credentials!");
            error.statusCode = 401;
            next(error);
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            const error = new Error("Invalid credentials!");
            error.statusCode = 403;
            next(error);
        }
    },
    isAnonymous: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } else {
            const error = new Error("You are already logged in.");
            error.statusCode = 403;
            next(error);
        }
    }
};