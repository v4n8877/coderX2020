const shortid = require('shortid');
const db = require('../db');
const makePagination = require('../midlewares/pagination.midleware');

module.exports.index = (req, res) => {
  const userId = req.cookies.userId;
  const getUser = db.get('users').find({id: userId}).value();

  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const startPage = (page - 1) * 10;
  const endPage = page * perPage;
  const pageCount = Math.ceil(db.get('books').value().length / perPage);
  const newPagination = makePagination.customPagination(page, pageCount);
  const quantity = req.signedCookies.quantityBook;

  res.render('books', {
    books: db.get('books').value().slice(startPage, endPage),
    pageCount: newPagination,
    currentPage: page,
    users: getUser,
    quantity: quantity || 0,
  });
};

module.exports.toCreate = (req, res) => {
  res.render('create');
};

module.exports.createBook = (req, res) => {
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
};

module.exports.deleteBook = (req, res) => {
  const bookId = req.params.bookId;
  db.get('books').remove({ id: bookId }).write();
  res.redirect('/books');
}

module.exports.updateTitle = (req, res) => {
  const bookId = req.params.bookId;
  const book = db.get('books').filter((book) => {
    return book.id === bookId;
  }).value();
  res.render('update', {
    book: book[0]
  });
};

module.exports.titleUpdated = (req, res) => {
  db.get('books')
  .find({ id: req.body.id })
  .assign({ title: req.body.title })
  .write();
  
  res.redirect('/books');
};