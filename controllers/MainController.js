// Importamos nuestros dos cadetes (servicios)
const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

// ==========================================
// US#5: FUNCIÓN NORMALIZADORA DE IDs (RECARGADA)
// ==========================================
// Ahora recibe la respuesta (res) para poder mandar los errores directamente
const normalizeId = (id, res) => {
    const parsedId = parseInt(id, 10); 
    
    // 1. Validar que es numérico (si no, tira 400)
    if (isNaN(parsedId)) {
        res.status(400).send('<h1>Error 400: Petición inválida. El ID del producto debe ser numérico.</h1>');
        return null;
    }
    
    // 2. Validar que el producto existe en SQLite (si no, tira 404)
    const product = productsService.getById(parsedId);
    if (!product) {
        res.status(404).render('pages/404');
        return null;
    }
    
    // Si sobrevive a las dos validaciones, devolvemos el número limpio
    return parsedId; 
};

const mainController = {
    // ==========================================
    // VISTAS DE PRODUCTOS
    // ==========================================
  home: (req, res) => { 
        // Cambiamos el 10 por un 5 aquí mismo
        const bestsellers = productsService.getBestsellers(5);
        const suggestedProducts = productsService.getSuggested(5);
        res.render('pages/index', { suggestedProducts, bestsellers }); 
    },
productsList: (req, res) => {
    const sortOrder = req.query.sort;
    const category = req.query.category; // ← AGREGAR ESTO
    let products;

    if (category) {
        products = productsService.getByCategory(category); // ← filtrar por categoría
    } else if (sortOrder === 'asc' || sortOrder === 'desc') {
        products = productsService.getSorted(sortOrder);
    } else {
        products = productsService.getAll();
    }

    res.render('pages/products', { products, sortOrder: sortOrder || null, category: category || null });
},

    search: (req, res) => {
        const searchQuery = req.query.query; 
        let searchResults = [];

        if (searchQuery) {
            searchResults = productsService.search(searchQuery);
        }

        res.render('pages/search', { searchResults, searchQuery });
    },

 product: (req, res) => { 
        const rawId = req.params.id; 
        
        // El patovica ahora hace el chequeo completo. Si falla, corta acá.
        const productId = normalizeId(rawId, res);
        if (!productId) return; 

        // Si pasó el control, ya sabemos que es número y que existe.
        const product = productsService.getById(productId);
        
        // --- AQUÍ ESTÁ EL FILTRO PARA LIMPIAR LOS RELACIONADOS ---
        let relatedProducts = productsService.getRelated(product.category, productId, 4);
        
       relatedProducts = relatedProducts.filter(p => 
            !p.name.includes('Racing') && 
            !p.name.includes('Barcelona')
        );
        // ---------------------------------------------------------
        
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
        
        // Validación unificada
        const productId = normalizeId(rawId, res);
        if (!productId) return; 

        const success = cartService.addProduct(req.session, productId);
        if (!success) {
            return res.redirect('/'); 
        }
        res.redirect('/cart');
    },

    updateCart: (req, res) => {
        const rawId = req.body.productId;
        const action = req.body.action;
        
        // Validación unificada
        const productId = normalizeId(rawId, res);
        if (!productId) return;

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