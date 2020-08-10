const express = require("express");
const router = express.Router();

const controller = require('../controllers/transaction.controller');

router.get('/', controller.getTransaction);

module.exports = router;