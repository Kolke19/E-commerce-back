const {Router} = require ('express');
const {signup, login, forgotPassword, resetPassword} = require ('../controllers/authController')


const router = Router();


router.route('/signup').post(signup); 


router.route('/login').post (login);


router.route('/forgotPassword').post(forgotPassword); // crear un token random que sera un token 


router.route('/resetPassword/:token').post(resetPassword); 


module.exports = router; 