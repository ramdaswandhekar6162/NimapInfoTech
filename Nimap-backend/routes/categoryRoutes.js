const express = require('express');
const router = express.Router();
const {
    getCategories,
    addCategory,
    updateCategory,
    getUpdateCategory,
    deleteCategory,
    test,
    getSingleCategory
} = require('../controllers/categoryController');

// Get all categories
router.get('/', getCategories);

router.get('/category', getSingleCategory);

// Add a new category
router.post('/add', addCategory);

// Update an existing category
router.get('/update', getUpdateCategory);
router.post('/update', updateCategory);

// Delete a category
router.post('/delete', deleteCategory);

router.get('/test/:id', test);

module.exports = router;
