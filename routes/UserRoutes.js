// const {Router}  = require ('express');
// const {getUsers , createUser, deleteUser,getUserById,updateUser} = require ('../controllers/userController');
// const {isAdmin} = require ('../middleware/isAdmin') 
// const {updateMe}= require ('../controllers/userController');
// const {protect} = require ('../middleware/auth');
// const {uploadUserPhoto} = require('../middleware/photos');
// const {resizeUserPhoto} = require('../middleware/resize');  

// const router = Router();

// router.route('/')
// .get(isAdmin ,getUsers)
// .post(createUser)
// .put(protect,uploadUserPhoto,resizeUserPhoto,updateMe, updateUser);
// router.route("/:id")
// .delete(isAdmin, deleteUser)

//  //.put(protect,updateMe , upload.single('photo'))
// .get(getUserById )

// module.exports = router;

const {Router}  = require ('express');
const {getUsers , createUser, deleteUser,getUserById,updateUser} = require ('../controllers/userController');
const {isAdmin} = require ('../middleware/isAdmin') 
const {updateMe , changePassword}= require ('../controllers/userController');
 const {protect} = require ('../middleware/auth'); 
const {uploadUserPhoto} = require('../middleware/photos');
const {resizeUserPhoto} = require('../middleware/resize');  

const router = Router();

router.route('/')
.get(getUsers)
.post(createUser)

router.route('/changePassword')
    .put(protect , changePassword)

router.route("/:id")
.delete(isAdmin, deleteUser)
.put(protect,updateUser)
 //.put(protect,updateMe , upload.single('photo'))
.get(getUserById)

module.exports = router;