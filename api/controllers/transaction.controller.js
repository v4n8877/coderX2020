const Transactions = require('../../models/trans.model');

module.exports.getTransaction = async (req, res) => {
  const getTransaction = await Transactions.find();
  res.json(getTransaction);
}