const express = require('express');
const router = express.Router();
const { validateProduct } = require('../middleware/productValidate');
const upload = require('../middleware/upload');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', upload.single('image'), validateProduct, createProduct);
router.put('/:id', upload.single('image'), validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
