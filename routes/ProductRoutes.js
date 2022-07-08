const {Router} = require('express');
const {getProducts, createProduct, updateProduct, getProductsById, deleteProduct} = require('../controllers/productController')
const router = Router ();
// const {isAdmin} = require ('../middleware/isAdmin') 
const {protect, retristecTo } = require ("../middleware/auth")

router.route('/')
//BORRE PROTECT AGREGAR!!!!
    .get(getProducts) //sin isAdmin debido a que qwueremos que los usuarios deben ver los productos
    .post(createProduct)
//middleware van antes de hacer uso de los controladores, por ejemplo = .post(middlewareProductVlidation, createProduct)

router.route('/:id')
.put (updateProduct)
.get(getProductsById)
.delete(protect, retristecTo('sales', 'admin'), deleteProduct)//solo los usuarios admin puedan borrar productos

module.exports = router;

// retristecTo('admin', 'sales'), solo estos puede ejecutar el metodo delete a un producto