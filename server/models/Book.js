const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user'
    //   },
    bookISBN: { type: String, required: true },
    title: { type: String, required: true },
    publication: { type: String, required: true },
    authors: { type: [String], required: true }
});

module.exports = mongoose.model('book', bookSchema);