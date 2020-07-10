const express = require("express");
const router = express.Router();

const controller = require('../controllers/users.controller');
const validateUser = require('../validate/users.validate');
const cookiesCount = require('../validate/count.cookies');

// params get users
router.get('/', cookiesCount.countCookies, controller.index);

// params create user
router.get('/create', cookiesCount.countCookies, controller.toCreate);

router.post('/create', cookiesCount.countCookies, validateUser.createUser, controller.createUser);

// params update user
router.get('/:userId/update', cookiesCount.countCookies, controller.idUpdate);

router.post('/update', cookiesCount.countCookies, controller.updateUser);

// params delete user
router.get('/:userId/delete', controller.deleteUser);

module.exports = router;