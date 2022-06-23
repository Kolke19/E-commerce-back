const User = require ('../models/User');
const jwt = require ('jsonwebtoken')
require ('dotenv').config();
const {signToken} = require('../utils/token')

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create ({
            username: req.body.username,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
        const token = signToken(newUser. _id)
        // console.log(token);
        return res.status(201).json ({
            ok:true,
            token,
            data: {
            user: newUser
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
