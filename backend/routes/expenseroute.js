const express = require('express');
const router = express.Router();
const { createexpenses, getexpenses } = require('../controllers/expensecontroller');
const{ authenticate} = require('../middleware/auth');



router.use(authenticate);
router.post('/add',createexpenses);
router.get('/get',getexpenses);
router.put('/expenses/update');
router.delete('/expenses/delete');


module.exports = router;
