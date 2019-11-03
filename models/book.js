const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Array, required: true },
  synopsis: String,
  thumbnail: String,
  date: { type: Date, default: Date.now },
  saved: { type: Boolean, default: false },
  infoLink: String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
