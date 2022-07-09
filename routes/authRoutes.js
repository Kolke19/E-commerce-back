const {Router} = require ('express');
const {signup, login, forgotPassword, resetPassword, getUser} = require ('../controllers/authController')

const {protect}  = require('../middleware/auth')

const router = Router();


router.route('/signup').post(signup); 


router.route('/login').post (login);


router.route('/forgotPassword').post(forgotPassword); // crear un token random que sera un token 


router.route('/resetPassword/:token').post(resetPassword); 

router.route('/user').get(protect , getUser);

module.exports = router; 