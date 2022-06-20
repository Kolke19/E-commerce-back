const User = require ('../models/User');

exports.getUsers = (req , res ) => res.status(200).json({message:'Hola mundo'})

exports.createUser = async (req, res )=>{
    try{
        
        const user = new User({...req.body});
        const savedUser = await user.save();
        return res.status(201).json({message: 'El usuario se creo existosamente', user: savedUser});

    }catch(error){
        console.log(error);
        res.status(500).json({message:'El servidor ha fallado'});
    }
}