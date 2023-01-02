//Relacion entre factura y productos con sus especificaciones.

const { default: mongoose } = require("mongoose");

//en este caso las relaciones no sql la entidad fuerte seria el carrito
const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    cartItems: [
        {
            product: 
        }
    ]
})