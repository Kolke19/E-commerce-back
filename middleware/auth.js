const User = require ("../models/User");
const jwt = require ("jsonwebtoken");
require('dotenv').config();



exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ') [1];
            console.log("hola kolke")
        }
        if(!token) {
            return res.status(401).json({ok: false, msg: "no tiene acceso"})// si no existe tirame un comentario con el status 401
        }
        //validar el token con JWT
        console.log("existe el token");
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, data ) => {
            console.log("estamos en data ===>",data)
            if(err) return res.status(401).json({ok:false, msg:"no tiene acceso"});
            const user = await User.findById(data.id);
            console.log('hola estamos en user', user)
            if(!user) {
                return res.status(401).json({ok:false, msg: "no tiene acceso"})

            }
            if(user.changedPasswordAfter(data.iat)) { //issues at : generado hace..
                return res.status(401).json({ok:false, msg:"no tiene acceso"})
            }
            req.user = user;
            next();
        })
        
    } catch (error) {
        return res.status(500).json({ok:false, error})
    }
};

exports.retristecTo = (...roles) => {//...cantidad indefinida de parametros
    return (req, res, next) => {
        console.log("javi se la ", req.user)
        if(!roles.includes(req.user.role)) {
            return res.status(403).json ({ok: false, msg:'no tiene permisos para realizar esta accion'});//403 forbidden, sin permisos para esto
        }
        next();
    }
}