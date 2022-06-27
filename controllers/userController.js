const User = require ('../models/User');
const { findById } = require("../models/User");


exports.getUsers  = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo saliooooooo mal" });
  }
};
exports.getUserById = async (req, res) => {
    const {id} = req.params
    try {
        const userById = await User.findById(id)
        return res.status(200).json({ok:true, userById  })
    } catch (error) {
        console.log(error);
        res.status(500).json( {message: 'El servidor ha fallado'} )
    }
}

exports.updateUser = async (req, res) => {
    const {id} = req.params;
    try 
    {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(200).json({ok: true, user: updateUser})
    } catch (error) {
        console.log(error);
        res.status(500).json( {message: 'El servidor ha fallado'} )
    }
}

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

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deleteUser = await User.findById(id)
        await User.findByIdAndDelete(id)//
        return res.status(200).json ({ok:true, message:`el user ${id} fue eliminado con exitos`,
         deleteUser:deleteUser})
    } catch{

        return res.status(500).json ({ok:false, message:"no se encontro ningun user con esa id" })
        
    }
}

exports.updateMe = async (req,res )=>{
    try{
        console.log('Req FILE ===>', req.file);
        if(req.body.password || req.body.passwordConfirm || req.body.role){
            return res.status(400).json({message: 'Bad request', ok: false}); 
        }
        const filteredBody = { name : req.body.name, email: req.body.email};
        const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody,{
            new: true,
            runValidators:true
        });
        return res.status(200).json ({
            ok:false, 
            data:{
                user: updatedUser
            }    
        })
        
    } catch (error){

        return res.status(500).json ({ message:"algo salio mal",ok:false })
        
    }
}