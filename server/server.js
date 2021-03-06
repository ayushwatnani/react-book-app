const express = require("express");
const app = express();
const cors = require("cors");
const path=require('path');
const connectDB = require('./config/db');

const User = require("./models/User");
const Book = require("./models/Book");

app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/books', require('./routes/api/books'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT}`);
});
