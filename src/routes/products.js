const express = require('express');
const router = express.Router();
const productsController = require('../controller/products');
const upload = require('../middleware/upload')
// const {protect} = require('../middleware/auth')
// const {hitCacheProductsDetail, clearCacheProductsDetail} = require('../middleware/redis')
// const {authorisSeller, authorBuyer} = require('../middleware/authorizations')

// router.get('/cari/', productsController.searchKeywordsProducts);
// router.get('/pagination/', productsController.getAllProductsLimit);
// router.get('/', productsController.getAllProducts);
// router.get('/:id', productsController.getProducts);
// router.post('/',upload.single('photo'), productsController.insert);
// router.put('/:id', upload.single('photo'), productsController.update);
// router.delete('/:id', productsController.delete);

router.get('/cari', productsController.searchKeywordsProducts);
router.get('/pagination/', productsController.getAllProductsLimit);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProducts);
router.post('/',upload.single('photo'), productsController.insert);
router.put('/:id', upload.single('photo'), productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router