const db = require('../db');

module.exports.addToCart = (req, res, next) => {
  const bookId = req.params.bookId;
  const sessionId = req.signedCookies.sessionId;
 

  if(!sessionId){
    res.redirect('/books');
    return;
  }

  const count = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + bookId, 0).value();

  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + bookId, count + 1)
    .write();

  const getCart = db
    .get('sessions')
    .find({ id: sessionId }).value();

  const quantityBook = Object.values(getCart.cart).reduce((a, b) => a + b, 0);
  res.cookie("quantityBook", quantityBook, {
    signed: true
  });

  res.redirect('/books');
} 