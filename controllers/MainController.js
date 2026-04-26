const fs = require('fs');
const path = require('path');

// Función para leer el JSON de productos
const getProducts = () => {
    const productsFilePath = path.join(__dirname, '../models/products.json');
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
};

const mainController = {
    home: (req, res) => { res.render('pages/index'); },
    
    // Vista del producto (Simulada por ahora, agregamos un botón para probar)
    product: (req, res) => { 
        const products = getProducts();
        res.render('pages/product', { products }); // Le pasamos los productos para que pueda agregar
    },
    
    // ==========================================
    // LÓGICA DEL CARRITO (US#4)
    // ==========================================
    cart: (req, res) => {
        const products = getProducts();
        let cartItems = [];
        let total = 0;

        // Cruzamos los IDs de la sesión con los datos reales del JSON
        req.session.cart.forEach(item => {
            const productData = products.find(p => p.id === item.productId);
            if (productData) {
                const subtotal = productData.price * item.quantity;
                total += subtotal;
                cartItems.push({ ...productData, quantity: item.quantity, subtotal });
            }
        });

        res.render('pages/cart', { cartItems, total });
    },

    addToCart: (req, res) => {
        const productId = req.body.productId;
        const cart = req.session.cart;
        const productIndex = cart.findIndex(p => p.productId === productId);

        if (productIndex !== -1) {
            cart[productIndex].quantity += 1; // Si existe, suma 1
        } else {
            cart.push({ productId: productId, quantity: 1 }); // Si no existe, lo agrega
        }
        res.redirect('/cart');
    },

    updateCart: (req, res) => {
        const { productId, action } = req.body;
        const cart = req.session.cart;
        const productIndex = cart.findIndex(p => p.productId === productId);

        if (productIndex !== -1) {
            if (action === 'increase') {
                cart[productIndex].quantity += 1;
            } else if (action === 'decrease') {
                cart[productIndex].quantity -= 1;
                if (cart[productIndex].quantity <= 0) {
                    cart.splice(productIndex, 1); // Lo elimina si llega a 0
                }
            }
        }
        res.redirect('/cart');
    },

    emptyCart: (req, res) => {
        req.session.cart = []; // Reinicia el carrito
        res.redirect('/cart');
    },
    // ==========================================

    checkout: (req, res) => { res.render('pages/checkout'); },
    login: (req, res) => { res.render('pages/login'); },
    register: (req, res) => { res.render('pages/register'); },
    error: (req, res) => { res.render('pages/error'); }
};

module.exports = mainController;