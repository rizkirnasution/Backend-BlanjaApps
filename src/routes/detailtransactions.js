const express = require('express');
const router = express.Router();
const detailTransactionsController = require('../controller/detailtransactions');
const {protect} = require('../middleware/auth')

router.get('/search/',protect, detailTransactionsController.searchKeywordsDetTrans);
router.get('/pagination',protect, detailTransactionsController.getAllDetTransLimit);
router.get('/', protect, detailTransactionsController.getAllDetTrans);
router.get('/:id', protect, detailTransactionsController.getDetTrans);
router.post('/',protect, detailTransactionsController.insert);
router.put('/:id', protect, detailTransactionsController.update);
router.delete('/:id', protect, detailTransactionsController.delete);

module.exports = router