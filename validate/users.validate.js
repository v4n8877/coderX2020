module.exports.createUser = function(req, res, next) {
  var errors = [];

  if(!req.body.name && !req.body.email) {
    errors.push('Please fill form');
  }else if(!req.body.name || req.body.name.length < 10) {
    errors.push('Name is required or Name is not enough 10 characters');
  }else if(!req.body.name) {
    errors.push('Email is required');
  }

  if(errors.length) {
    res.render('createUser', {
      errors: errors,
      values: req.body
    });
    return;
  }
  next();
}