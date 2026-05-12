// Importamos nuestros dos cadetes (servicios)
const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

// ==========================================
// US#17: FUNCIÓN NORMALIZADORA DE IDs
// ==========================================
const normalizeId = (id) => {
    const parsedId = parseInt(id, 10); // Intentamos convertirlo a número entero
    
    // Si el resultado es NaN (Not a Number, o sea, eran letras), devolvemos null
    if (isNaN(parsedId)) {
        return null;
    }
    
    return parsedId; // Si todo está bien, devolvemos el número limpio
};

const mainController = {
    // ==========================================
    // VISTAS DE PRODUCTOS
    // ==========================================
    home: (req, res) => { 
        const bestsellers = productsService.getBestsellers(10);
        const suggestedProducts = productsService.getSuggested(5);
        res.render('pages/index', { suggestedProducts, bestsellers }); 
    },

    product: (req, res) => { 
        const rawId = req.params.id; 
        
        // 1. Pasamos el ID por el patovica
        const productId = normalizeId(rawId);

        // ESCENARIO 1: ID no numérico -> 400 (Bad Request)
        if (productId === null) {
            return res.status(400).send('<h1>Error 400: Petición inválida. El ID del producto debe ser numérico.</h1>');
        }

        const product = productsService.getById(productId);

        // ESCENARIO 2: ID numérico pero inexistente -> 404
        if (!product) {
            return res.status(404).render('pages/404');
        }

        const relatedProducts = productsService.getRelated(product.category, productId, 4);
        res.render('pages/product', { product, relatedProducts }); 
    },

    category: (req, res) => {
        const categoryName = req.params.category; 
        const filteredProducts = productsService.getByCategory(categoryName);
        res.render('pages/category', { categoryName, filteredProducts });
    },

    // ==========================================
    // LÓGICA DEL CARRITO
    // ==========================================
    cart: (req, res) => {
        const { cartItems, total } = cartService.getCartDetails(req.session);
        res.render('pages/cart', { cartItems, total });
    },

    addToCart: (req, res) => {
        const rawId = req.body.productId;
        const productId = normalizeId(rawId);

        // Validación de seguridad para el carrito (400)
        if (productId === null) {
            return res.status(400).send('Error 400: ID inválido.');
        }

        const success = cartService.addProduct(req.session, productId);
        if (!success) {
            return res.redirect('/'); 
        }
        res.redirect('/cart');
    },

    updateCart: (req, res) => {
        const rawId = req.body.productId;
        const action = req.body.action;
        const productId = normalizeId(rawId);

        // Solo actualiza si el ID es un número válido
        if (productId !== null) {
            cartService.updateProduct(req.session, productId, action);
        }
        res.redirect('/cart');
    },

    emptyCart: (req, res) => {
        cartService.emptyCart(req.session);
        res.redirect('/cart');
    },

    // ==========================================
    // OTRAS VISTAS (Auth sin layout)
    // ==========================================
    checkout: (req, res) => { res.render('pages/checkout'); },
    login: (req, res) => { res.render('pages/login', { layout: false }); },
    register: (req, res) => { res.render('pages/register', { layout: false }); },
    error: (req, res) => { res.render('pages/error'); }
};

module.exports = mainController;