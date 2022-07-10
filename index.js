const express = require ('express');
const dotenv = require ('dotenv');
const connectDb = require('./config/db')
//rutas del usuario
const userRoutes = require('./routes/userRoutes')
//rutas de los productos
const productRoutes = require ('./routes/ProductRoutes')
//rutas de autorizaciones
const authRoutes = require ('./routes/authRoutes')
const bodyParser = require('body-parser');
connectDb(); 
dotenv.config();
const cors = require ('cors');
const app = express();
const mercadopago = require ('mercadopago');

//archivos estaticos 
app.use(express.static(`${__dirname}/public`));

app.use(express.json({limit:'10kb'}));

app.use(cors());
app.use(express.json({limit:'10kb'}));
app.use('/api/v1/users', userRoutes);

app.use('/api/v1/auth',authRoutes );
app.use('/api/v1/products',productRoutes);
app.use(bodyParser.urlencoded({ extended: false }))



// app.use('/api/v1/purchases',);




// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-5254386870000136-070518-8da74cda7e65e23890cd59ed83d82f3d-1153484968'
  });

//routes
app.post('/checkout', (req, res) => {
// Crea un objeto de preferencia

let preference = {
    items: [
      {
        title:req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
  
    res.redirect(response.body.init_point);
   
  }).catch(function(error){
    console.log(error);
  });
});





app.use('/', (req, res ) => res.send('home '));
console.log(process.env.PORT);
const port = process.env.PORT || 4000;
app.listen(port, () =>{
    console.log(`servidor corriendo ${port}`);
})