const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../db');

module.exports.login =  (req, res) => {
  res.render('auth/login', {
    users: db.get('users').value(),
  });
};

module.exports.postLogin =  (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = db.get('users').find({email: email}).value();

  if(!user) {
    res.render('auth/login', {
      errors: ['User does not exist.'],
      values: {email: req.body.email}
    });
    return;
  }
  const hash = bcrypt.hashSync(password, saltRounds);
  const checkPassword = bcrypt.compareSync(user.password, hash);
  if(!checkPassword) {
    if(user.wrongLoginCount <= 4) {
      const newWrongCount = user.wrongLoginCount++;
      db.get('users').find({email: email}).push({wrongLoginCount: newWrongCount}).write();
      res.render('auth/login', {
        errors: ['Wrong password.'],
        values: {email: req.body.email}
      });
    } else {
      res.render('auth/login', {
        errors: ['Wrong password more than 4 times.'],
        values: {email: req.body.email}
      });
    }
    return;
  }
  res.cookie('userId', user.id);
  res.redirect('/trans');
};