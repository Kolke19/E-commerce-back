const {Schema , model } = require ('mongoose');

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
        unique: true,
        validate:
        {
            validator:function(email)
            {
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
                return emailRegex.test(email);

                
            },
            message: 'El valor {value} no es un email valido'
        }
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
        validate:function(value){
            return value === this.password;
        },
        message: 'Los passwords no coinciden'
    },
    isadmin:{
        type:Boolean,
        default: false
    },
    passwordChangedAt: Date

})

const User = model('User', userSchema);

module.exports = User;