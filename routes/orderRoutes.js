const {Router}  = require ('express');
const { getOrder,createOrder,getOrderById,deleteOrder,updateOrder} = require ('../controllers/orderController');
const {protect, retristecTo } = require ("../middleware/auth")


const router = Router();

router.route('/')
.get(getOrder)
.post(protect,createOrder)



router.route("/:id")
.put(updateOrder)
.get(protect,getOrderById)
.delete(deleteOrder)

module.exports = router;