const express = require('express');
const BookController = require('../controllers/book.controller');

const router = express.Router();

const bookController = new BookController();
bookController.register(router);

module.exports = router;
