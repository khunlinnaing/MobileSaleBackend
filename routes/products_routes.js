const express = require('express');
const router = express.Router();
const { HomePageProduct,getAllProduct, getProductByID, CrateProcut, UpdateProduct, DeleteProduct, getProductByCategoryId } = require('../controllers/productController')

router.get('/home', HomePageProduct);
router.get('/' , getAllProduct);
router.post('/', CrateProcut);
router.get('/category/:id', getProductByCategoryId);
router.get('/:id', getProductByID)
router.put('/:id', UpdateProduct);
router.delete('/:id', DeleteProduct);
module.exports = router