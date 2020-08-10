const Users = require('../../models/users.model');

module.exports.loginAPI = async (req, res) => {
  const findUser = await Users.find({email: req.body.email, password: req.body.password});
  const newInfo =  {name: findUser[0].name, email: findUser[0].email };
  res.json(newInfo);
}