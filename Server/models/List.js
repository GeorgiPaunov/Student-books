const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    studentBooks: [ { type: Schema.Types.ObjectId, ref: "StudentBook", required: true } ]
});

const List = mongoose.model("List", listSchema);

module.exports = List;