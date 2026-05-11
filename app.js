// app.js
const express = require('express');
const path = require('path');
const session = require('express-session'); // 1. Importamos express-session
const app = express();

const mainRoutes = require('./routes/mainRoutes');

// 2. Configurar Express para leer datos de formularios (CRUCIAL para los botones del carrito)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 3. Configuración de Sesiones (US#4)
app.use(session({
    secret: 'secreto-camisetas-fc',
    resave: false,
    saveUninitialized: true
}));

// 4. Inicializar el carrito vacío si el usuario recién entra
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// ==========================================
// US#12: MIDDLEWARE PARA EL CONTADOR DEL CARRITO
// ==========================================
// Este código se ejecuta en TODAS las páginas antes de mostrarlas
app.use((req, res, next) => {
    let cartItemCount = 0;
    
    // Si la sesión existe y hay un carrito creado...
    if (req.session && req.session.cart) {
        // Sumamos las cantidades de todos los productos
        cartItemCount = req.session.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Lo guardamos en "res.locals" para que cualquier archivo .ejs lo pueda usar
    res.locals.cartItemCount = cartItemCount;
    next(); // Le decimos a Express que siga su camino
});

// Configuración de EJS y Archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', mainRoutes);

// RED DE CONTENCIÓN: Error 404
app.use((req, res, next) => {
    res.status(404).render('pages/404');
});

// Levantar el Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});