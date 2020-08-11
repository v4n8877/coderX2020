const Books  = require('../models/books.model');
const Users = require('../models/users.model');
const makePagination = require('../midlewares/pagination.midleware');

module.exports.index = async (req, res) => {
  
  try {
    const userId = req.cookies.userId;
    const getUser = await Users.findById(userId).exec();
    var a;
    a.b();
    Books.find().then((books)=> {
      const page = parseInt(req.query.page) || 1;
      const perPage = 10;
      const startPage = (page - 1) * 10;
      const endPage = page * perPage;
      const pageCount = Math.ceil(books.length / perPage);
      const newPagination = makePagination.customPagination(page, pageCount);
      const quantity = req.signedCookies.quantityBook;
      res.render('books', {
        books: books.slice(startPage, endPage),
        pageCount: newPagination,
        currentPage: page,
        users: getUser,
        quantity: quantity || 0,
      })
    })
  } catch (err) {
    res.render('msgErr')
  }

};

module.exports.toCreate = (req, res) => {
  res.render('create');
};

module.exports.createBook = (req, res) => {
  // Books.create(req.body, function (err, book) {
  //   if (err) {
  //     return err;
  //   } else {
  //     res.redirect('/books');
  //   }
    
  // });
  
};

module.exports.deleteBook = (req, res) => {
  const bookId = req.params.bookId;
  Books.findOneAndRemove({ _id: bookId });
  res.redirect('/books');
}

module.exports.updateTitle = (req, res) => {
  // const bookId = req.params.bookId;
  // const book = db.get('books').filter((book) => {
  //   return book.id === bookId;
  // }).value();
  // res.render('update', {
  //   book: book[0]
  // });
};

module.exports.titleUpdated = (req, res) => {
  // db.get('books')
  // .find({ id: req.body.id })
  // .assign({ title: req.body.title })
  // .write();
  
  // res.redirect('/books');
};