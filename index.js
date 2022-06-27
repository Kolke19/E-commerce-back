const express = require ('express');
const dotenv = require ('dotenv');
const connectDb = require('./config/db')
//rutas del usuario
const userRoutes = require('./routes/userRoutes')
//rutas de los productos
const productRoutes = require ('./routes/ProductRoutes')
//rutas de autorizaciones
const authRoutes = require ('./routes/authRoutes')
connectDb(); 
dotenv.config();
const cors = require ('cors');
const app = express();


app.use(cors());
app.use(express.json({limit:'10kb'}));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth',authRoutes );
app.use('/api/v1/products',productRoutes);


// app.use('/api/v1/purchases',);

app.use('/', (req, res ) => res.send('home '));
console.log(process.env.PORT);
const port = process.env.PORT || 4000;
app.listen(port, () =>{
    console.log(`servidor corriendo ${port}`);
})