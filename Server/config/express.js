const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = app => {
    app.use(cookieParser());

    app.use(bodyParser.json());

    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;

            res.locals.isAdmin = req.user.roles.indexOf("Admin") >= 0;
        }
        next();
    });
};