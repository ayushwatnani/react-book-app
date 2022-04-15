const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");
const { check, validationResult } = require("express-validator");
const Book = require("../../models/Book");
const auth = require('../../middleware/auth');

// @route    POST api/books
// @desc     Add a Book
// @access   Private
router.post(
  "/",
  check("bookISBN", "ISBN is required").notEmpty(),
  check("title", "Book Name include a valid email").notEmpty(),
  check("publication", " Enter the name of Publication").notEmpty(),
  check("authors", " Enter the name of Author").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookISBN, title, publication, authors } = req.body;

    try {
      let book = await Book.findOne({ bookISBN });

      if (book) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Book already exists" }] });
      }

      book = new Book({
        bookISBN,
        title,
        publication,
        authors,
      });

      await book.save();
      res.status(200).send("Book Added");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    GET api/books
// @desc     Get all books
// @access   Public
router.get('/',  async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route    GET api/books/:title
  // @desc     Get book by Title
  // @access   Private
  router.get('/:title', async (req, res) => {
    try {
      const book = await Book.find({title: {$regex : new RegExp(req.params.title, 'i')}} );
  
      if (!book) {
        return res.status(404).json({ msg: 'Book not found' });
      }
      console.log(book);
      res.json(book);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });
  
  // @route    GET api/books/:id
  // @desc     Get book by id
  // @access   Private
  router.get('/bookbyid/:id', async (req, res) => {
    try {
        id = req.params.id;
        console.log('id' + id);
      const book = await Book.findById(id);
  
      if (!book) {
        return res.status(404).json({ msg: 'Book not found' });
      }
      console.log(book)
      res.json(book);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

  // @route    DELETE api/books/:isbn
  // @desc     Delete a post
  // @access   Private
  router.delete('/:isbn',  async (req, res) => {
    try {
      const book = await Book.find({bookISBN:req.params.isbn});
  
      if (!book) {
        return res.status(404).json({ msg: 'Book not found' });
      }
  
      // Check user
    //   if (book.user.toString() !== req.user.id) {
    //     return res.status(401).json({ msg: 'User not authorized' });
    //   }
      console.log(book);
      await Book.find({bookISBN:req.params.isbn}).remove();
  
      res.json({ msg: 'Book removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });


module.exports = router;
