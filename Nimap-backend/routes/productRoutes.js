// const express = require('express');
// const router = express.Router();
// const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// router.get("/",getProducts);

// router.post("/add",addProduct);

// router.post("/update/:id",updateProduct);

// router.post("/delete/:id",deleteProduct);

// module.exports = router;

const express = require('express');

const router = express.Router();

const {
    getProducts,
    getOneProduct,
    addProduct,
    editProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);

router.get('/product', getOneProduct);

router.post('/add', addProduct);

router.get('/edit', editProduct);
router.post('/edit', updateProduct);

router.post('/edit', updateProduct);

router.post('/delete', deleteProduct);

module.exports = router;
