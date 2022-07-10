const mongoose = require ('mongoose')

//const {Schema, model} = require ('mongoose');

//const orderSchema = new Schema ({
const orderSchema = new mongoose.Schema ({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
   items:[
    {
        name: {type: String, required: true},
        stock: {type: Number , required: true},
        price: {type:Number , required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }
   ] ,
   totalPrice:{
    type: Number,
    required: true,
    default: 0.0
   },
   isPaid: {
    type: Boolean,
    required: true,
    default: false
   }
},{
    timestamps:true
});

//const Order = model('Order', orderSchema);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

