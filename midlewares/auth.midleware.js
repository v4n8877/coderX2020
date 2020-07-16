const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  if(!req.cookies.userId) {
    res.redirect('/auth/login');
    return;
  }
  const findUser = db.get('users').find({id: req.cookies.userId}).value();

  if(!findUser) {
    res.redirect('/auth/login');
    return;
  }

  next();
}