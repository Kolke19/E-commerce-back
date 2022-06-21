// exportamos

exports.isAdmin = (req, res, next) => {
    req.body.isAdmin 
   ?  next ()
   : res.status(500).json({message:'Este usuario no posse permisos de administrador'});
    console.log('impresion de request', req)
}