const {Router}  = require ('express');
const {getUsers , createUser, deleteUser,getUserById,updateUser} = require ('../controllers/userController');
const {isAdmin} = require ('../middleware/isAdmin') 
const {updateMe}= require ('../controllers/userController');
const {protect} = require ('../middleware/auth');
const {uploadUserPhoto} = require('../middleware/photos');
const {resizeUserPhoto} = require('../middleware/resize');  

const router = Router();

router.route('/')
.get(isAdmin ,getUsers)
.post(createUser)
.put(protect,uploadUserPhoto,resizeUserPhoto,updateMe);
router.route("/:id")
.delete(isAdmin, deleteUser)

 //.put(protect,updateMe , upload.single('photo'))
.get(getUserById)

module.exports = router;

