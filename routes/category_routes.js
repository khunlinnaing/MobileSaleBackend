const express = require('express');
const router = express.Router();
const { getAllCategories, GetCategoryByID, CrateCategory, UpdateCategory, DeleteCategory, getCategories} = require('../controllers/categoryController')
router.get('/all', getCategories)
router.get('/' , getAllCategories)
router.get('/:id', GetCategoryByID)
router.post('/', CrateCategory);
router.put('/:id', UpdateCategory);
router.delete('/:id', DeleteCategory);
module.exports = router