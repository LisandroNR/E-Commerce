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