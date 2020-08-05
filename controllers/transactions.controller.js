const shortid = require('shortid');
const db = require('../db');

module.exports.index = (req, res) => {
  const userId = req.cookies.userId;
  const getTrans = db.get('trans').find({userId: userId}).value();
  res.render('transactions', {
    trans: getTrans ? [getTrans] : [],
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
  req.body.isComplete = false;
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
  var errors = [];
  var checkId = db.get('trans').find({ id: transId }).value();
  if(!checkId) {
    errors.push(`${transId} does not exist`);
    res.render('transactions', {
      trans: db.get('trans').value(),
      errors: errors
    });
  } else {
    db.get('trans')
    .find({ id: transId })
    .assign({ isComplete: true})
    .write();
    res.redirect('/trans');
  }
};

module.exports.deleteTrans = (req, res) => {
  const transId = req.params.transId;
  db.get('trans').remove({ id: transId }).write();
  res.redirect('/trans');
};