const express = require('express');
const router = express.Router();
const { createexpenses, getSingleexpenses,getallexpenses,updateexpenses,deleteexpenses } = require('../controllers/expensecontroller');
const{ authenticate} = require('../middleware/auth');


router.get('/get',getallexpenses);

router.use(authenticate);
router.post('/add',createexpenses);
router.get('/:id',getSingleexpenses);
router.put('/:id',updateexpenses);
router.delete('/:id',deleteexpenses);


module.exports = router;
