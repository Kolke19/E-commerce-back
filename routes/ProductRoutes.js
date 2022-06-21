const {Router} = require('express');
const {getProducts, createProduct, updateProduct, getProductsById, deleteProduct} = require('../controllers/productController')
const router = Router ();
const {isAdmin} = require ('../middleware/isAdmin') 

router.route('/')
    .get(isAdmin,getProducts)
    .post(createProduct)
//middleware van antes de hacer uso de los controladores, por ejemplo = .post(middlewareProductVlidation, createProduct)


router.route('/:id')
.put (updateProduct)
.get(getProductsById)
.delete(deleteProduct)

module.exports = router;