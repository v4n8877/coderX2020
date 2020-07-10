const express = require("express");
const router = express.Router();

const controller = require('../controllers/users.controller');
const validateUser = require('../validate/users.validate');

// params get users
router.get('/', controller.index);

// params create user
router.get('/create', controller.toCreate);

router.post('/create', validateUser.createUser, controller.createUser);

// params update user
router.get('/:userId/update', controller.idUpdate);

router.post('/update', controller.updateUser);

// params delete user
router.get('/:userId/delete', controller.deleteUser);

module.exports = router;