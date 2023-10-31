const express = require('express');
const router = express.Router();
const { getAllCategories, CrateCategory, UpdateCategory, DeleteCategory} = require('../controllers/categoryController')
router.get('/' , getAllCategories);

router.post('/', CrateCategory);
router.patch('/:id', UpdateCategory);
router.delete('/:id', DeleteCategory);
module.exports = router