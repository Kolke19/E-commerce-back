const {Router} = require('express');
const {getProducts, createProduct, updateProduct, getProductsById, deleteProduct} = require('../controllers/productController')
const router = Router ();

router.route('/')
    .get(getProducts)
    .post(createProduct)

router.route('/:id')
.put (updateProduct)
.get(getProductsById)
.delete(deleteProduct)

module.exports = router;