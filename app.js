const express = require('express');
const path = require('path');
const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, Imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTAS DEL SPRINT 1 (Navegación US#8) ---

// 1. Home
app.get('/', (req, res) => {
    res.render('pages/index');
});

// 2. Detalle de Producto
app.get('/product', (req, res) => {
    res.render('pages/product');
});

// 3. Carrito
app.get('/cart', (req, res) => {
    res.render('pages/cart');
});

// 4. Checkout (Página temporal)
app.get('/checkout', (req, res) => {
    res.send(`
        <div style="font-family: 'Montserrat', sans-serif; text-align: center; padding: 100px;">
            <h1>Página de Checkout en construcción 🚧</h1>
            <p>Acá irá la pasarela de pago en el próximo Sprint.</p>
            <br>
            <a href="/cart" style="padding: 10px 20px; background: #00ceb0; color: #1a1a1a; text-decoration: none; border-radius: 5px; font-weight: bold;">Volver al Carrito</a>
        </div>
    `);
});

// 5. Login
app.get('/login', (req, res) => {
    res.render('pages/login');
});

// 6. Registro
app.get('/register', (req, res) => {
    res.render('pages/register');
});

// Bonus: Error de Producto
app.get('/product/error', (req, res) => {
    res.render('pages/error');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});