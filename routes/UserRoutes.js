const {Router}  = require ('express');
const {getUsers , createUser, deleteUser} = require ('../controllers/userController');


const router = Router();

router.route('/')
.get(getUsers)
.post(createUser)
router.route("/:id")
.delete(deleteUser)

module.exports = router;

