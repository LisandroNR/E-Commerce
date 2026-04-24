// app.js
const express = require('express');
const path = require('path');
const app = express();

// 1. Importar Rutas
const mainRoutes = require('./routes/mainRoutes');

// 2. Configuración de EJS (Vistas)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 3. Archivos estáticos (CSS, Imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// 4. Usar Rutas
app.use('/', mainRoutes);

// 5. Levantar el Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});