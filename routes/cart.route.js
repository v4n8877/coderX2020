const express = require("express");
const router = express.Router();

const controller = require('../controllers/cart.controller');

// params get users
router.get('/add/:bookId', controller.addToCart);

module.exports = router;