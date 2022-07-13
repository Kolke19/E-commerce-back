const Product = require('../models/Product');

//controlador para traer todos los productos 
exports.getProducts = async (req, res) => {  
  try {
    // console.log('current user ===>', req.user)//usuario logueado actualmente con el cual validamos para poder acce
    const products = await Product.find({});
    return res.status(200).json({ ok: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo salio mal" });
  }
};

//controlador para traer un producto por id
exports.getProductsById = async (req, res) => {
    const {id} = req.params
    try {
        const productById = await Product.findById(id)
        return res.status(200).json({ok:true, productById  })
    } catch (error) {
        console.log(error);
        res.status(500).json( {message: 'El servidor ha fallado'} )
    }
}



//Controlador para crear producto
exports.createProduct = async (req, res) => {
    try {
        const product = new Product ({...req.body});
        const savedProduct = await product.save(); 
        return res.status(201).json({message:"el producto fue guardado exitosamente", product:savedProduct});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"el servidor ha fallado"})
    }
};


//controlador para actualizar productos
exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {//"!"entra a la condicion si es null 0 o undefined
            return res.status(404).json({ok:false, message: 'No se encontro ningun producto con esa id'});
        }
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(200).json({ok: true, product: updateProduct})
    } catch (error) {
        console.log(error);
        res.status(500).json( {message: 'El servidor ha fallado'} )
    }
}

// Controlador para eliminar un producto por id


exports.deleteProduct = async (req, res) => {
    const {id} = req.params;
    console.log("d2",req.params)
    try {
        const productDeleted = await Product.findById(id)//busca y encontra el id del product y alamac en la const
        await Product.findByIdAndDelete(id)//
        return res.status(200).json ({ok:true, message:`el producto ${id} fue eliminado con exito`,
         productDeleted:productDeleted})
    } catch{

        return res.status(500).json ({ok:false, message:"no se encontro ningun producto con esa id" })
        
    }
}

