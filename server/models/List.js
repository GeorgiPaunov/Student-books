const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: { type: Schema.Types.String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    studentBooks: [ { type: Schema.Types.ObjectId, ref: "StudentBook" } ]
});

const List = mongoose.model("List", listSchema);

module.exports = List;