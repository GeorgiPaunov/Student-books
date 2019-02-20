const express = require('express');
const app = express();
const port = 3000;

require('./config/database')();
require("./config/passport")();
require("./config/express")(app);
require("./config/routs")(app);

// General error handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
    next();
});

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });