const {Router}  = require ('express');
const { getOrders,createOrder,getOrderById,deleteOrder,updateOrder} = require ('../controllers/orderController');
const {protect, retristecTo } = require ("../middleware/auth");


const router = Router();

router.route('/')
.get(getOrders)
// .post(protect,createOrder)
.post(createOrder)



router.route("/:id")
.put(updateOrder)
// .get(protect,getOrderById)
.get(getOrderById)
.delete(deleteOrder)

module.exports = router;