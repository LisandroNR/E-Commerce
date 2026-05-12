// Importamos nuestro nuevo servicio
const productsService = require('../services/productsService');

const mainController = {
    // ==========================================
    // HOME (Sugeridos y Más Pedidos)
    // ==========================================
    home: (req, res) => { 
        const bestsellers = productsService.getBestsellers(10);
        const suggestedProducts = productsService.getSuggested(5);
        
        res.render('pages/index', { suggestedProducts, bestsellers }); 
    },

    // ==========================================
    // DETALLE DE PRODUCTO
    // ==========================================
    product: (req, res) => { 
        const productId = req.params.id; 
        const product = productsService.getById(productId);

        if (!product) {
            return res.render('pages/404');
        }

        const relatedProducts = productsService.getRelated(product.category, productId, 4);
        res.render('pages/product', { product, relatedProducts }); 
    },

    // ==========================================
    // VISTA DE CATEGORÍAS
    // ==========================================
    category: (req, res) => {
        const categoryName = req.params.category; 
        const filteredProducts = productsService.getByCategory(categoryName);

        res.render('pages/category', { categoryName, filteredProducts });
    },

    // ==========================================
    // LÓGICA DEL CARRITO
    // ==========================================
    cart: (req, res) => {
        let cartItems = [];
        let total = 0;

        if (!req.session.cart) {
            req.session.cart = [];
        }

        req.session.cart.forEach(item => {
            const productData = productsService.getById(item.productId); 
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
        const productData = productsService.getById(productId);

        if (!productData || productData.stock === 0) {
            return res.redirect('/'); 
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }
        
        const cart = req.session.cart;
        const productIndex = cart.findIndex(p => p.productId == productId);

        if (productIndex !== -1) {
            cart[productIndex].quantity += 1; 
        } else {
            cart.push({ productId: productId, quantity: 1 }); 
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
                    cart.splice(productIndex, 1); 
                }
            }
        }
        res.redirect('/cart');
    },

    emptyCart: (req, res) => {
        req.session.cart = []; 
        res.redirect('/cart');
    },

    // ==========================================
    // OTRAS VISTAS (Con Layout en false para Auth)
    // ==========================================
    checkout: (req, res) => { res.render('pages/checkout'); },
    login: (req, res) => { res.render('pages/login', { layout: false }); },
    register: (req, res) => { res.render('pages/register', { layout: false }); },
    error: (req, res) => { res.render('pages/error'); }
};

module.exports = mainController;