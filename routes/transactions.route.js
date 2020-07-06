const express = require("express");
const router = express.Router();

const controller = require('../controllers/transactions.controller');

// params get trans
router.get('/', controller.index);

// params create trans
router.get('/create', controller.createTrans);

router.post('/create', controller.transCreated);

// params update trans
router.get('/:transId/update', controller.idUpdate);

router.post('/update', controller.transUpdated);

// params trans complete
router.get('/:transId/complete', controller.completeTrans);

// params delete trans
router.get('/:transId/delete', controller.deleteTrans);

module.exports = router;