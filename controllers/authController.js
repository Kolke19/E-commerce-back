const User = require ('../models/User');
// const jwt = require ('jsonwebtoken')
const sendEmail = require('../utils/mail');
const crypto = require ("crypto");//desencriptar y comparar
const {signToken} = require('../utils/token');
require ('dotenv').config();
         

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create ({
            username: req.body.username,
            lastname: req.body.lastname,
            email: req.body.email,
            photo: req.body.photo,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            phoneNumber: req.body.phoneNumber
        });
        const {name, role, id, email, phoneNumber} = newUser
        const token = signToken(newUser. _id)

            return res.status(201).json ({
            ok:true,
            token,
            data: {
            user: {name, role, id, email, phoneNumber}
            }
        });
    } catch (error) {
        console.log(error)
       res.status(500).json ({ok:false, error});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        //chequeando que el email y pssw existen
        if( !email || !password) {
            return res.status(404).json ({ok :false, msg:"bad request"});
        }
        //chequeando que el usuario existe y el psw es correcto
        const user = await User.findOne ({ email }).select('+password'); 
      
        if (!user || !(await user.comparePassword(password, user.password)))
        return res.status(401).json({ok:false, msg:"Credenciales incorrectas"})

        // si todo esta bien enviamos el token al usuario
        const token = signToken(user. _id);
        return res.status(200).json({
            ok:true,
            token,
            data: {
                user
            }
        })
    } catch (error) {
     res.status(500).json ({ok:false, error});
    }
}


exports.forgotPassword = async (req, res ) => { 
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status (400).json({ok: false, msg:"Credenciales incorrectas"});
        }
        const resetToken = user.createPasswordResetToken();
     

        await user.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
        const message = `Olvido su contraseña, ingrese aqui para cambiar su pasword ${resetUrl}`;
        //mensaje para emails
        console.log("llega???")
        await sendEmail ({message, email, subjet:"olvido su contraseña" });
        return res.status(200).json({ok:true, msg: "enviamos un email a la casilla que nos indicó"});
    } catch(err) {
        console.log(err);
        res.status(500).json ({ok:false, err: "error forgot pass"});
    }

}

//usamos para desarrollo mailtrap, produccion sendgrip, para integrar a node js

 exports.resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne( {
            passwordResetToken : hashedToken,
            passwordResetExpires : {$gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({ok:false, msg:"algo salio mal"})
        }
        //seteamos el nuevo pass
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        console.log("data usuario",user)
        const token = signToken(user._id);
        return res.status(200).json({ok:true, token});
    } catch (err) {
        res.status(500).json ({ok:false, err: "error forgot pass"});
    }
 }

 //truta para obtener usuario

 exports.getUser = async (req, res) => {
    try {
        if(req.user) {
            return res.status(200).json({user: req.user})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok: false, error})
    }
 }