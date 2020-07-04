const express = require("express");
const router = express.Router();

const shortid = require('shortid');
const bodyParser = require('body-parser');

const db = require('../db');

const controller = require('../controllers/users.controller');

// params get users
router.get('/', controller.index);

// params create user
router.get('/create', controller.toCreate);

router.post('/create', controller.createUser);

// params update user
router.get('/:userId/update', controller.idUpdate);

router.post('/update', controller.updateUser);

// params delete user
router.get('/:userId/delete', controller.deleteUser);

module.exports = router;