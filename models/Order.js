const mongoose = require ('mongoose')

const ordeSchema = new mongoose.Schema ({
    user:{
        tpye: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
   items:[
    {
        name: {type: String, required: true},
        quantity: {type: Number , required: true},
        image:{ type:String , required:true},
        price: {tpye:Number , required: true},
        product: {
            tpye: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }
   ] ,
   totalPrice:{
    tpye: Number,
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;