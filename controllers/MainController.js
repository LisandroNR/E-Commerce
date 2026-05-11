const fs = require('fs');
const path = require('path');

// Función para leer el JSON de productos
const getProducts = () => {
    const productsFilePath = path.join(__dirname, '../models/products.json');
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
};

const mainController = {
    // ==========================================
    // USER STORY #6 - HOME (PRODUCTOS SUGERIDOS)
    // ==========================================
    home: (req, res) => { 
        const products = getProducts();
        
        // ==========================================
        // US#7: LOS MÁS PEDIDOS (Flag + Aleatorio)
        // ==========================================
        // 1. Filtramos solo los que tienen el flag "bestseller" en true
        const bestsellers = products.filter(product => product.bestseller === true);
        // 2. Los mezclamos
        const bestsellersShuffled = bestsellers.sort(() => 0.5 - Math.random());
        // 3. Agarramos hasta 10
        const topBestsellers = bestsellersShuffled.slice(0, 10);

        // ==========================================
        // US#6: TE PUEDE INTERESAR
        // ==========================================
        const shuffled = products.sort(() => 0.5 - Math.random());
        const suggestedProducts = shuffled.slice(0, 5);
        
        // Mandamos AMBAS listas a la vista
        res.render('pages/index', { suggestedProducts, bestsellers: topBestsellers }); 
    },

    // ==========================================
    // LÓGICA DEL CARRITO (US#4)
    // ==========================================
    cart: (req, res) => {
        const products = getProducts();
        let cartItems = [];
        let total = 0;

        // Red de seguridad: si no existe el carrito en la sesión, lo creamos vacío
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Cruzamos los IDs de la sesión con los datos reales del JSON
        req.session.cart.forEach(item => {
            // Usamos == en lugar de === por si el ID viene como texto desde el HTML y como número desde el JSON
            const productData = products.find(p => p.id == item.productId); 
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
        
        // Red de seguridad
        if (!req.session.cart) {
            req.session.cart = [];
        }
        
        const cart = req.session.cart;
        const productIndex = cart.findIndex(p => p.productId == productId);

        if (productIndex !== -1) {
            cart[productIndex].quantity += 1; // Si existe, suma 1
        } else {
            cart.push({ productId: productId, quantity: 1 }); // Si no existe, lo agrega
        }
        res.redirect('/cart');
    },

    updateCart: (req, res) => {
        const { productId, action } = req.body;
        const cart = req.session.cart || [];
        const productIndex = cart.findIndex(p => p.productId == productId);

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
    // OTRAS VISTAS ESTÁTICAS Y US#5
    // ==========================================
    product: (req, res) => { res.render('pages/product'); }, // <-- ACÁ ESTÁ LA SOLUCIÓN AL ERROR
    checkout: (req, res) => { res.render('pages/checkout'); },
    login: (req, res) => { res.render('pages/login'); },
    register: (req, res) => { res.render('pages/register'); },
    error: (req, res) => { res.render('pages/error'); }
};

module.exports = mainController;