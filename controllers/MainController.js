const fs = require('fs');
const path = require('path');

// Función para leer el JSON de productos
const getProducts = () => {
    const productsFilePath = path.join(__dirname, '../models/products.json');
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
};

const mainController = {
    // ==========================================
    // US#6 y US#7 - HOME (Sugeridos y Más Pedidos)
    // ==========================================
    home: (req, res) => { 
        const products = getProducts();
        
        const bestsellers = products.filter(product => product.bestseller === true);
        const bestsellersShuffled = bestsellers.sort(() => 0.5 - Math.random());
        const topBestsellers = bestsellersShuffled.slice(0, 10);

        const shuffled = products.sort(() => 0.5 - Math.random());
        const suggestedProducts = shuffled.slice(0, 5);
        
        res.render('pages/index', { suggestedProducts, bestsellers: topBestsellers }); 
    },

    // ==========================================
    // US#8 y US#9 - DETALLE DE PRODUCTO
    // ==========================================
    product: (req, res) => { 
        const products = getProducts();
        const productId = req.params.id; 
        
        const product = products.find(p => p.id == productId);

        if (!product) {
            return res.render('pages/404');
        }

        let relatedProducts = [];
        if (product.category) {
            const related = products.filter(p => p.category === product.category && p.id != productId);
            const relatedShuffled = related.sort(() => 0.5 - Math.random());
            relatedProducts = relatedShuffled.slice(0, 4);
        }

        res.render('pages/product', { product, relatedProducts }); 
    },

    // ==========================================
    // US#10: VISTA DE CATEGORÍAS (La que tiraba error)
    // ==========================================
    category: (req, res) => {
        const products = getProducts();
        const categoryName = req.params.category; 

        const filteredProducts = products.filter(p => 
            p.category && p.category.toLowerCase() === categoryName.toLowerCase()
        );

        res.render('pages/category', { categoryName, filteredProducts });
    },

    // ==========================================
    // LÓGICA DEL CARRITO (US#4)
    // ==========================================
    cart: (req, res) => {
        const products = getProducts();
        let cartItems = [];
        let total = 0;

        if (!req.session.cart) {
            req.session.cart = [];
        }

        req.session.cart.forEach(item => {
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
        const products = getProducts();
        
        // 1. Buscamos el producto en la base de datos
        const productData = products.find(p => p.id == productId);

        // 2. VALIDACIÓN US#11: Si no existe o tiene stock 0, rechazamos la acción
        if (!productData || productData.stock === 0) {
            return res.redirect('/'); // Lo devolvemos al inicio sin agregar nada
        }

        // Si pasó la validación, sigue el proceso normal del carrito
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
    // OTRAS VISTAS ESTÁTICAS Y US#5
    // ==========================================
    checkout: (req, res) => { res.render('pages/checkout'); },
    login: (req, res) => { res.render('pages/login'); },
    register: (req, res) => { res.render('pages/register'); },
    error: (req, res) => { res.render('pages/error'); }
};

module.exports = mainController;