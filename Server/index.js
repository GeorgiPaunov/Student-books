const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database/database')();
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const listRoutes = require('./routes/lists');
const port = 9999;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/lists', listRoutes);

// General error handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
    next();
});

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });