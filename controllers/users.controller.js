
const shortid = require('shortid');
const db = require('../db');

module.exports.index =  (req, res) => {
  res.render('users', {
    users: db.get('users').value()
  });
};

module.exports.toCreate = (req, res) => {
  res.render('createUser');
}

module.exports.createUser = (req, res) => {
  req.body.id = shortid.generate();
  
  db.get('users').push(req.body).write();
  res.redirect('/users');
};

module.exports.idUpdate = (req, res) => {
  const userId = req.params.userId;
  const user = db.get('users').filter((user) => {
    return user.id === userId;
  }).value();
  res.render('updateUser', {
    user: user[0]
  });
};

module.exports.updateUser = (req, res) => {
  db.get('users')
  .find({ id: req.body.id })
  .assign({ name: req.body.name, email: req.body.email})
  .write();
  res.redirect('/users');
};

module.exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  db.get('users').remove({ id: userId }).write();
  res.redirect('/users');
};