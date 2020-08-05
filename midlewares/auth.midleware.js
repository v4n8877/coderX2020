const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }
  const findUser = db
    .get('users')
    .find({id: req.signedCookies.userId})
    .value();

  if(!findUser) {
    res.redirect('/auth/login');
    return;
  }
  res.locals.user = findUser;
  next();
}