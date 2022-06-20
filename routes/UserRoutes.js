const {Router}  = require ('express');
const {getUsers , createUser, deleteUser,getUserById,updateUser} = require ('../controllers/userController');


const router = Router();

router.route('/')
.get(getUsers)
.post(createUser)
router.route("/:id")
.delete(deleteUser)
.put(updateUser)
.get(getUserById)

module.exports = router;

