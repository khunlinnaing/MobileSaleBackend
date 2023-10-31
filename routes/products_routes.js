const express = require('express');
const router = express.Router();
const { getAllProduct, CrateProcut, UpdateProduct, DeleteProduct } = require('../controllers/productController')
router.get('/' , (getAllProduct));
router.post('/', CrateProcut);
router.patch('/:id', UpdateProduct);
router.delete('/:id', DeleteProduct);
module.exports = router