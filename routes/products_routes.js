const express = require('express');
const router = express.Router();
const { testGroupby,getAllProduct, getProductByID, CrateProcut, UpdateProduct, DeleteProduct, getProductByCategoryId } = require('../controllers/productController')
router.get('/' , getAllProduct);
router.post('/', CrateProcut);
router.get('/category/:id', getProductByCategoryId);
router.get('/:id', getProductByID)
router.put('/:id', UpdateProduct);
router.delete('/:id', DeleteProduct);
module.exports = router