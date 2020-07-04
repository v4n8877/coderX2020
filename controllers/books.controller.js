const shortid = require('shortid');
const db = require('../db');

module.exports.index = (req, res) => {
  res.render('books', {
    books: db.get('books').value()
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