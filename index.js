const express = require ('express');
const dotenv = require ('dotenv');
const connectDb = require('./config/db')
const userRouter = require('./routes/userRoutes')
const productRoutes = require ('./routes/ProductRoutes')

connectDb(); 
dotenv.config();

const app = express();

app.use(express.json({limit:'10kb'}));
app.use('/api/v1/users', userRouter);

 app.use('/api/v1/products',productRoutes);
// app.use('/api/v1/purchases',);

app.use('/', (req, res ) => res.send('home '));
console.log(process.env.PORT);
const port = process.env.PORT || 4500;
app.listen(port, () =>{
    console.log(`servidor corriendo ${port}`);
})