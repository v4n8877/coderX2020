const express = require("express");
const router = express.Router();

const shortid = require('shortid');
const bodyParser = require('body-parser');

const controller = require('../controllers/books.controller');

// get books
router.get('/', controller.index);

// create a book
router.get('/create', controller.toCreate);

router.post('/create', controller.createBook);

// delete book
router.get('/:bookId/delete', controller.deleteBook);

// update title
router.get('/:bookId/update', controller.updateTitle);

router.post('/update', controller.titleUpdated);

module.exports = router;