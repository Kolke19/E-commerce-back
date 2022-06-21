const {Router}  = require ('express');
const {getUsers , createUser, deleteUser,getUserById,updateUser} = require ('../controllers/userController');
const {isAdmin} = require ('../middleware/isAdmin') 

const router = Router();

router.route('/')
.get(isAdmin ,getUsers)
.post(createUser)
router.route("/:id")
.delete(isAdmin, deleteUser)
.put(updateUser)
.get(getUserById)

module.exports = router;

