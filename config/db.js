const moongose = require('mongoose');
// require('dotenv').config({path:'../config.env'});
const dotenv = require('dotenv');
dotenv.config();



const connectDb = async () => {
    try{
        
        const connection = await moongose.connect(process.env.MONGO_URL);
        console.log(`Mongo conexion ${connection.connection.host}`);
    } catch (error){
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDb