const {Router}  = require ('express');
const {getUsers , createUser, deleteUser,getUserById,updateUser,updateMe} = require ('../controllers/userController');
const {isAdmin} = require ('../middleware/isAdmin') 
const multer = require('multer');

const upload = multer({
  dest: 'public/img/users'
});

const router = Router();

router.route('/')
.get(isAdmin ,getUsers)
.post(createUser)
router.route("/:id")
.delete(isAdmin, deleteUser)
.put(updateUser)
.put(updateMe , upload.single('photo'))
.get(getUserById)

module.exports = router;

