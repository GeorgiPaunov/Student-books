const booksRoutes = require('../routes/books');
const usersRoutes = require('../routes/users');

module.exports = app => {
    app.use('/books', booksRoutes);
    app.use('/users', usersRoutes);
};