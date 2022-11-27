const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');
const {protect} = require('../middleware/auth')
// const {authorisSeller, authorBuyer} = require('../middleware/authorizations')

router.get('/search/', categoryController.searchKeywordsCategory);
router.get('/pagination', categoryController.getAllCategoryLimit);
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategory);
router.post('/', categoryController.insert);
router.put('/:id', categoryController.update);
router.delete('/:id',categoryController.delete);

module.exports = router