// 1. REQUIRES (Todas las herramientas que necesitamos)
const express = require('express');
const db = require('./db/database');
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const apiCategoriesRouter = require('./routes/apiCategoriesRouter');

// Enrutadores
const apiProductsRouter = require('./routes/apiProductsRouter');
const apiStatsRouter = require('./routes/apiStatsRouter'); // <--- AGREGADO: Enrutador de estadísticas
const mainRoutes = require('./routes/mainRoutes');

// 2. INICIALIZAR EXPRESS (¡Una sola vez!)
const app = express();

// 3. MIDDLEWARES GLOBALES (Las reglas de lectura y permisos)
app.use(cors()); // Da permiso al Dashboard de React para conectarse
app.use(express.json()); // CRUCIAL: Para que la API entienda los JSON que manda React
app.use(express.urlencoded({ extended: false })); // Para leer los formularios de EJS
app.use(express.static(path.join(__dirname, 'public'))); // Para cargar las imágenes y CSS

// 4. CONFIGURACIÓN DE VISTAS (EJS y Layouts - US#14)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// 5. CONFIGURACIÓN DE SESIONES Y CARRITO (US#4)
app.use(session({
    secret: 'secreto-camisetas-fc',
    resave: false,
    saveUninitialized: true
}));

// Inicializar el carrito vacío si el usuario recién entra
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Middleware para el contador del carrito (US#12)
app.use((req, res, next) => {
    let cartItemCount = 0;
    if (req.session && req.session.cart) {
        cartItemCount = req.session.cart.reduce((total, item) => total + item.quantity, 0);
    }
    res.locals.cartItemCount = cartItemCount;
    next();
});

// 6. RUTAS (Nuestros caminos)
// Rutas de la API (Para el Dashboard de React)
app.use('/api/products', apiProductsRouter);
app.use('/api/categories', apiCategoriesRouter);
app.use('/api/stats', apiStatsRouter); // <--- AGREGADO: Ruta para US#4 (Sprint 4)

// Rutas de la tienda tradicional (Para los clientes con EJS)
app.use('/', mainRoutes);

// 7. RED DE CONTENCIÓN (Manejo de Errores)
// Error 404 (Si no encuentra la ruta)
app.use((req, res, next) => {
    res.status(404).render('pages/404');
});

// Error 500 (US#13: Si falla el código interno)
app.use((err, req, res, next) => {
    console.error("🔥 ERROR INTERNO:");
    console.error(err.stack);
    res.status(500).render('pages/500');
});

// 8. LEVANTAR EL SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});