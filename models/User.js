const {Schema , model } = require ('mongoose');
const bcrypt = require("bcryptjs");
const validator = require("validator");

const crypto = require('crypto');

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
    photo:String,
    email:{
        type:String,
        required:[true,'El mail es obligatorio'],
        minlength:4,
        maxlength:30,
        unique: [true,'El mail ya esta en uso'],
        lowercase:true,
        validate:[validator.isEmail,"Por favor, introduzca un mail valido"]
    },
    password: {
        type:String,
        required:[true,'El password es obligatorio'],
        minlength:8,
        maxlength:45,
        select: false
    },
    passwordConfirm:{
        type:String,
        required: [true, 'Por favor confirme su contraseña'],
        validate:{
            validator: function (value){
                return value === this.password 
            },
            message: "Las contraseñas no hacen match"
        }
    },
    phoneNumber:{
        type:Number,
        required: true["succes"]
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user','sales','admin'],
        default: "admin"
    },
    passwordChangedAt: Date,
    passwordResetToken:String,
    passwordResetExpires: Date
})

userSchema.pre('save', async function (next){
        if(!this.isModified('password'))return next();
        this.password = await bcrypt.hash(this.password,10);
        this.passwordConfirm= undefined;
        next();
});

userSchema.pre("save", function (next) {
    if(!this.isModified('password' ) || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
        return await bcrypt.compare (candidatePassword, userPassword);
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex') 
    this.passwordResetExpires = Date.now() + 60 * 5 * 1000;
    return resetToken;
}




userSchema.methods.changedPasswordAfter = function (JWTTime) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() /1000);
        return JWTTime < changedTimestamp; //el token siempre debe de ser menor que el changedtimeStam
    }
    return false;
}



const User = model('User', userSchema);

module.exports = User;  