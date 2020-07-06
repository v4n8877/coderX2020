const shortid = require('shortid');
const db = require('../db');

module.exports.index = (req, res) => {
  res.render('transactions', {
    trans: db.get('trans').value()
  });
};

module.exports.createTrans = (req, res) => {
  res.render('createTrans', {
    users: db.get('users').value(),
    books: db.get('books').value(),
  });
};

module.exports.transCreated = (req, res) => {
  req.body.id = shortid.generate();
  db.get('trans').push(req.body).write();
  res.redirect('/trans');
};

module.exports.idUpdate = (req, res) => {
  const transId = req.params.transId;

  res.render('updateTrans', {
    users: db.get('users').value(),
    books: db.get('books').value(),
    transId: transId
  });
};

module.exports.transUpdated = (req, res) => {
  db.get('trans')
  .find({ id: req.body.id })
  .assign({ userId: req.body.userId, bookId: req.body.bookId})
  .write();
  
  res.redirect('/trans');
};

module.exports.completeTrans = (req, res) => {
  const transId = req.params.transId;
  db.get('trans')
  .find({ id: transId })
  .assign({ isComplete: true})
  .write();
  res.redirect('/trans');
};

module.exports.deleteTrans = (req, res) => {
  const transId = req.params.transId;
  db.get('trans').remove({ id: transId }).write();
  res.redirect('/trans');
};