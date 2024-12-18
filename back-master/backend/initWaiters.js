const mongoose = require('mongoose');
const Categories = require('./models/Categories'); // Importar el modelo Categories
const Waiter = require('./models/Waiter'); // Importar el modelo Waiter
const Client = require('./models/Client'); // Importar el modelo Client
const Dish = require('./models/Dish'); // Importar el modelo Dish (Plato)
const User = require('./models/User'); // Importar el modelo User
const Orders = require('./models/Orders'); // Importar el modelo Orders

const initData = async () => {
    try {
        // Inicializar meseros
        const waiters = await Waiter.find();
        if (waiters.length === 0) {
            const waitersData = [
                { nombre: 'Juan', apellido: 'Perez', edad: 28, dni: '12345678', email: 'juan@example.com', activo: true },
                { nombre: 'Maria', apellido: 'Lopez', edad: 32, dni: '87654321', email: 'maria@example.com', activo: true },
                { nombre: 'Carlos', apellido: 'Gomez', edad: 25, dni: '11223344', email: 'carlos@example.com', activo: true }
            ];

            for (let waiterData of waitersData) {
                const waiter = new Waiter(waiterData);
                await waiter.save();
            }

            console.log('Meseros inicializados correctamente');
        } else {
            console.log('Ya existen meseros en la base de datos');
        }

        // Inicializar categorías
        const categories = await Categories.find();
        if (categories.length === 0) {
            const categoriesData = [
                { nombre: 'Entradas', descripcion: 'Platos ligeros para comenzar la comida.', activo: true },
                { nombre: 'Platos principales', descripcion: 'Platos principales con carne o pollo.', activo: true },
                { nombre: 'Postres', descripcion: 'Deliciosos postres para terminar la comida.', activo: true },
                { nombre: 'Bebidas', descripcion: 'Refrescos y bebidas para acompañar la comida.', activo: true },
                { nombre: 'Sopas', descripcion: 'Platos calientes para iniciar.', activo: true }
            ];

            for (let categoryData of categoriesData) {
                const category = new Categories(categoryData);
                await category.save();
            }

            console.log('Categorías inicializadas correctamente');
        } else {
            console.log('Ya existen categorías en la base de datos');
        }

        // Inicializar clientes
        const clients = await Client.find();
        if (clients.length === 0) {
            const clientsData = [
                { nombre: 'Laura', apellido: 'Martinez', email: 'laura@example.com', telefono: '987654321', dni: '12345678', activo: true },
                { nombre: 'Andres', apellido: 'Garcia', email: 'andres@example.com', telefono: '912345678', dni: '23456789', activo: true },
                { nombre: 'Sofia', apellido: 'Fernandez', email: 'sofia@example.com', telefono: '976543210', dni: '34567890', activo: true }
            ];

            for (let clientData of clientsData) {
                const client = new Client(clientData);
                await client.save();
            }

            console.log('Clientes inicializados correctamente');
        } else {
            console.log('Ya existen clientes en la base de datos');
        }

        // Inicializar platos
        const dishes = await Dish.find();
        if (dishes.length === 0) {
            const dishesData = [
                { nombre: 'Ensalada César', ingredientes: ['Lechuga', 'Pollo', 'Aderezo César', 'Croutons'], precio: 10 },
                { nombre: 'Pasta Alfredo', ingredientes: ['Pasta', 'Crema', 'Queso parmesano', 'Ajo', 'Pechuga de pollo'], precio: 15 },
                { nombre: 'Pizza Margherita', ingredientes: ['Tomate', 'Mozzarella', 'Albahaca', 'Aceite de oliva'], precio: 12 },
                { nombre: 'Sopa de Tomate', ingredientes: ['Tomates', 'Ajo', 'Cebolla', 'Caldo de verduras'], precio: 8 },
                { nombre: 'Tacos al Pastor', ingredientes: ['Tortillas de maíz', 'Carne al pastor', 'Piña', 'Cebolla', 'Cilantro'], precio: 9 }
            ];

            for (let dishData of dishesData) {
                const dish = new Dish(dishData);
                await dish.save();
            }

            console.log('Platos inicializados correctamente');
        } else {
            console.log('Ya existen platos en la base de datos');
        }

        // Inicializar usuarios
        const users = await User.find();
        if (users.length === 0) {
            const usersData = [
                { username: 'tupac', email: 'manco.capac@example.com', password: 'arbol1' },
                { username: 'ocllo', email: 'mama.ocllo@example.com', password: 'arbol2' },
                { username: 'yupanqui', email: 'tupac.yupanqui@example.com', password: 'arbol3' }
            ];

            for (let userData of usersData) {
                const user = new User({
                    username: userData.username,
                    email: userData.email,
                    password: await User.prototype.encryptPassword(userData.password)
                });
                await user.save();
            }

            console.log('Usuarios inicializados correctamente');
        } else {
            console.log('Ya existen usuarios en la base de datos');
        }

        // Inicializar órdenes
        const orders = await Orders.find();
        if (orders.length === 0) {
            const ordersData = [
                { platos: [{ nombre: 'Ensalada César', cantidad: 2 }, { nombre: 'Pasta Alfredo', cantidad: 1 }], estado: 'pendiente' },
                { platos: [{ nombre: 'Pizza Margherita', cantidad: 1 }, { nombre: 'Tacos al Pastor', cantidad: 3 }], estado: 'entregado' },
                { platos: [{ nombre: 'Sopa de Tomate', cantidad: 2 }, { nombre: 'Pasta Alfredo', cantidad: 1 }], estado: 'cancelado' }
            ];

            for (let orderData of ordersData) {
                const order = new Orders(orderData);
                await order.save();
            }

            console.log('Órdenes inicializadas correctamente');
        } else {
            console.log('Ya existen órdenes en la base de datos');
        }
    } catch (error) {
        console.error('Error al inicializar los datos: ', error.message);
    }
};

module.exports = initData;
