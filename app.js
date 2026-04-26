// app.js
const express = require('express');
const path = require('path');
const app = express();

// 1. Importar Rutas (Arquitectura MVC de la US#1)
const mainRoutes = require('./routes/mainRoutes');

// 2. Configuración de EJS (Vistas)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 3. Archivos estáticos (CSS, Imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// 4. Usar Rutas Principales
app.use('/', mainRoutes);

// 5. RED DE CONTENCIÓN: Error 404 (US#2)
// IMPORTANTE: Esto siempre debe ir al final, después de todas las demás rutas
app.use((req, res, next) => {
    res.status(404).render('pages/404');
});

// 6. Levantar el Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});