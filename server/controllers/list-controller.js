const { validationResult } = require("express-validator/check");
const List = require("mongoose").model("List");
const Book = require("mongoose").model("StudentBook");

module.exports = {
    getLists: (req, res, next) => {
        List.find({author: req.userId}).populate("studentBooks")
            .then((lists) => {
                res.status(200)
                    .json({ message: "Fetched data successfully!", lists });
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

        List.findById(id).populate("studentBooks")
            .then((list) => {
                if (!list) {
                    const error = new Error("Such list doesn't exist!");
                    error.statusCode = 404;
                    throw error;
                }

                if (list.author.toString() !== req.userId) {
                    const error = new Error("Invalid credentials!");
                    error.statusCode = 401;
                    throw error;
                }

                res.status(200)
                    .json({ message: "Fetched data successfully!", list });
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
            const title = req.body.title;
            const author = req.userId;

            List.create({title, author})
                .then((list) => {
                    res.status(201)
                        .json({message: "List created successfully!", list});
                })
                .catch((error) => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                });
        }
    },
    add: (req, res, next) => {
        const { listId, bookId } = req.body;

        List.findById(listId)
            .then((list) => {
                if (!list) {
                    const error = new Error("There is no such list!");
                    error.statusCode = 404;
                    throw error;
                }

                if (list.author.toString() !== req.userId) {
                    const error = new Error("Invalid credentials!");
                    error.statusCode = 401;
                    throw error;
                }

                Book.findById(bookId)
                    .then((book) => {
                        if (!book) {
                            const error = new Error("There is no such Student book!");
                            error.statusCode = 404;
                            throw error;
                        }

                        if (list.studentBooks.indexOf(book._id) > -1) {
                            const error = new Error("This Student book is already in the list!");
                            error.statusCode = 403;
                            throw error;
                        }

                        list.studentBooks.push(book._id);
                        list.save()
                            .then((savedList) => {
                                res.status(200)
                                    .json({ message: "Item added successfully!", list: savedList });
                            });
                    })
                    .catch((error) => {
                        if (!error.statusCode) {
                            error.statusCode = 500;
                        }
                        next(error);
                    });
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            });
    },
    remove: (req, res, next) => {
        const { listId, bookId } = req.body;

        List.findById(listId)
            .then((list) => {
                if (!list) {
                    const error = new Error("There is no such list!");
                    error.statusCode = 404;
                    throw error;
                }

                if (list.author.toString() !== req.userId) {
                    const error = new Error("Invalid credentials!");
                    error.statusCode = 401;
                    throw error;
                }

                Book.findById(bookId)
                    .then((book) => {
                        if (!book) {
                            const error = new Error("There is no such Student book!");
                            error.statusCode = 404;
                            throw error;
                        }

                        if (list.studentBooks.indexOf(book._id) === -1) {
                            const error = new Error("There is no such Student book in this list!");
                            error.statusCode = 404;
                            throw error;
                        }

                        list.studentBooks.pull(book._id);
                        list.save()
                            .then((savedList) => {
                                res.status(200)
                                    .json({ message: "Item removed successfully!", list: savedList });
                            });
                    })
                    .catch((error) => {
                        if (!error.statusCode) {
                            error.statusCode = 500;
                        }
                        next(error);
                    });
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            });
    },
    delete: (req, res, next) => {
        const id = req.params.id;

        List.findById(id)
            .then((list) => {
                if (!list) {
                    const error = new Error("There is no such list!");
                    error.statusCode = 404;
                    throw error;
                }

                if (list.author.toString() !== req.userId) {
                    const error = new Error("Invalid credentials!");
                    error.statusCode = 401;
                    throw error;
                }

                return List.deleteOne({_id: list._id});
            })
            .then((deletedList) => {
                res.status(200)
                    .json({ message: "List deleted successfully!", list: deletedList });
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            });
    }
};