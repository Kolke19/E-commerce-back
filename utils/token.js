//funcion reutilizable de token

const jwt = require ('jsonwebtoken');
require ('dotenv'). config();



exports.signToken = (id) => {
    return jwt.sign (
        { id },
        process.env.SECRET_TOKEN,
        {expiresIn : process.env.JWT_EXPIRES_IN}
    )
}