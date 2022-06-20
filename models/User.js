const {Schema , model } = require ('mongoose');
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new Schema ({
    username:{
        type: String,
        minlength :2,
        maxlength: 30,
        required: [true, 'Por favor ingresar un nombre de usuario']
    },
    lastname:{
        type: String,
        minlength :2,
        maxlength: 30,
        required: [true, 'Por favor ingresar un apellido de usuario']
    },
    email:{
        type:String,
        required:[true,'El mail es obligatorio'],
        minlength:4,
        maxlength:30,
        unique: [true,'El mail ya esta en uso'],
        lowercase:true,
        // validate:
        // {
        //     validator:function(email)
        //     {
        //         const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        //         return emailRegex.test(email);

                
        //     },
        //     message: 'El valor {value} no es un email valido'
        // }
        validate:[validator.isEmail,"Por favor, introduzca un mail valido"]
    },
    password: {
        type:String,
        required:[true,'El password es obligatorio'],
        minlength:8,
        maxlength:45
    },
    passwordConfirm:{
        type:String,
        required: [true, 'Por favor confirme su contraseña'],
        // validate:function(value){
        //     return value === this.password;
        // },
        // message: 'Los passwords no coinciden'
        validate:{
            validator: function (value){
                return value === this.password 
            },
            message: "Las contraseñas no hacen match"
        }
    },
    isadmin:{
        type:Boolean,
        default: false
    },
    passwordChangedAt: Date

})

userSchema.pre('save', async function (next){
        if(!this.isModified('password'))return next();
        this.password = await bcrypt.hash(this.password,10);
        this.passwordConfirm= undefined;
        next();
})

const User = model('User', userSchema);

module.exports = User;  