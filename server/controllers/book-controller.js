const { validationResult } = require("express-validator/check");
const Book = require("mongoose").model("StudentBook");

module.exports = {
    getBooks: (req, res, next) => {
        Book.find()
            .then((books) => {
                res.status(200)
                    .json({message: "Fetched data successfully!", books});
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            });
    },
    getDetails: (req, res, next) => {
        const id = req.params.id;

        Book.findById(id)
            .then((book) => {
                if (!book) {
                    const error = new Error("Such book doesn't exist!");
                    error.statusCode = 404;
                    throw error;
                }

                res.status(200)
                    .json({message: "Fetched data successfully!", book});
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            });
    },
    create: (req, res, next) => {
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
            const bookObj = req.body;

            Book.create(bookObj)
                .then((book) => {
                    res.status(201)
                        .json({message: "Book created successfully!", book});
                })
                .catch((error) => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                });
        }
    },
    edit: (req, res, next) => {
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
            const id = req.params.id;

            Book.findById(id)
                .then((book) => {
                    if (!book) {
                        const error = new Error("Such book doesn't exist!");
                        error.statusCode = 404;
                        throw error;
                    }

                    const bookObj = req.body;
                    book = Object.assign(book, bookObj);

                    return book.save();
                })
                .then((savedBook) => {
                    res.status(200)
                        .json({message: "Book edited successfully!", book: savedBook});
                })
                .catch((error) => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                });
        }
    },
    delete: (req, res, next) => {
        const id = req.params.id;

        Book.findById(id)
            .then((book) => {
                if (!book) {
                    const error = new Error("Such book doesn't exist!");
                    error.statusCode = 404;
                    throw error;
                }

                return Book.deleteOne({ _id: book._id });
            })
            .then((deletedBook) => {
                res.status(200)
                    .json({ message: "Book deleted successfully!", book: deletedBook });
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            });
    }
};