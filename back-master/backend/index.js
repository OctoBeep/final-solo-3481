const express = require('express');
const conectarDB = require('./config/db');
const config = require('./config/global');
const cors = require('cors');
const app = express();

const initWaiters = require('./initWaiters');

conectarDB();

initWaiters();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/meseros', require('./routers/camarero')); // Rutas para meseros
app.use('/api/categorias', require('./routers/categorias')); // Rutas para categorías
app.use('/api/clientes', require('./routers/clientes')); // Rutas para clientes
app.use('/api/platos', require('./routers/platos'));  // Nueva ruta para platos
app.use('/api/ordenes', require('./routers/ordenes'));  // Nueva ruta para platos
app.use('/api/create-user', require('./routers/usuario'));
app.use('/api/login', require('./routers/usuario'));



app.listen(config.port, () => {
    console.log("Servidor Corriendo en el puerto", config.port);
});
