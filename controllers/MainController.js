// Importamos nuestros dos cadetes (servicios)
const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

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
        const productId = req.params.id; 
        const product = productsService.getById(productId);

        if (!product) {
            return res.render('pages/404');
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
    // LÓGICA DEL CARRITO (US#16)
    // ==========================================
    cart: (req, res) => {
        // Le pedimos al servicio que calcule todo pasándole la sesión
        const { cartItems, total } = cartService.getCartDetails(req.session);
        res.render('pages/cart', { cartItems, total });
    },

    addToCart: (req, res) => {
        const productId = req.body.productId;
        const success = cartService.addProduct(req.session, productId);

        // Si falló (ej: no hay stock), lo mandamos al inicio. Si no, al carrito.
        if (!success) {
            return res.redirect('/'); 
        }
        res.redirect('/cart');
    },

    updateCart: (req, res) => {
        const { productId, action } = req.body;
        cartService.updateProduct(req.session, productId, action);
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