const {Router} = require('express');
const {getProducts, createProduct, updateProduct, getProductsById, deleteProduct} = require('../controllers/productController')
const router = Router ();
const {isAdmin} = require ('../middleware/isAdmin') 
const {protect, retristecTo } = require ("../middleware/auth")

router.route('/')
    .get(getProducts) //sin isAdmin debido a que qwueremos que los usuarios deben ver los productos
    .post(createProduct)
//middleware van antes de hacer uso de los controladores, por ejemplo = .post(middlewareProductVlidation, createProduct)

router.route('/:id')
.put (protect,updateProduct)
.get(protect,getProductsById)
.delete(protect,retristecTo('admin', 'sales'),deleteProduct)

module.exports = router;

// retristecTo('admin', 'sales'),