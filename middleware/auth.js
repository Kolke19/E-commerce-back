const User = require("../models/User");
const jwt = require ("jsonwebtoken");
require('dotenv').config();

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ') [1];
        }
        if(!token) {
            return res.status(401).json({ok: false, msg: "no tiene acceso"})
        }
        jwt.verify(token.process.env.SECRET_TOKEN, async (err, data ) => {
            if(err) return res.status(401).json({ok:false, msg:"no tiene acceso"});
            const user = await User.findById(id);
            if(!user) {
                return res.status(401).json({ok:false, msg: "no tiene acceso"})

            }
            if(user.changedPasswordAfter(data.iat)) {
                return res.status(401).json({ok:false, msg:"no tiene acceso"})
            }
            req.user = user;
            next();
        })
        
    } catch (error) {
        return res.status(500).json({ok:false, error})
    }
};