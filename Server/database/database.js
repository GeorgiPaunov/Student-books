const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/studentBooks', {
        useNewUrlParser: true,
        useCreateIndex: true
    });

    const db = mongoose.connection;

    db.once('open', err => {
        if (err) throw err;

        console.log("Database ready")
    });

    db.on('error', reason => {
        console.log(reason);
    });

    require("../models/User").seedAdminUser();
    require("../models/StudentBook");
    require("../models/List");
};