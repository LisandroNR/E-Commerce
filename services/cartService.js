// Importamos el servicio de productos porque el carrito necesita buscar info de precios y stock
const productsService = require('./productsService');

const cartService = {
    // 1. Aseguramos que el carrito exista en la sesión
    initializeCart: (session) => {
        if (!session.cart) {
            session.cart = [];
        }
    },

    // 2. Armar la lista de productos y calcular el total para la vista
    getCartDetails: (session) => {
        cartService.initializeCart(session);
        let cartItems = [];
        let total = 0;

        session.cart.forEach(item => {
            const productData = productsService.getById(item.productId); 
            if (productData) {
                const subtotal = productData.price * item.quantity;
                total += subtotal;
                cartItems.push({ ...productData, quantity: item.quantity, subtotal });
            }
        });

        return { cartItems, total };
    },

    // 3. Agregar un producto nuevo (o sumarle 1 si ya estaba)
    addProduct: (session, productId) => {
        cartService.initializeCart(session);
        const productData = productsService.getById(productId);

        // Validación: Si no existe o no tiene stock, rechazamos
        if (!productData || productData.stock === 0) {
            return false; 
        }

        const cart = session.cart;
        const productIndex = cart.findIndex(p => p.productId == productId);

        if (productIndex !== -1) {
            cart[productIndex].quantity += 1; 
        } else {
            cart.push({ productId: productId, quantity: 1 }); 
        }
        
        return true; 
    },

    // 4. Actualizar cantidad (+1 o -1)
    updateProduct: (session, productId, action) => {
        cartService.initializeCart(session);
        const cart = session.cart;
        const productIndex = cart.findIndex(p => p.productId == productId);

        if (productIndex !== -1) {
            if (action === 'increase') {
                cart[productIndex].quantity += 1;
            } else if (action === 'decrease') {
                cart[productIndex].quantity -= 1;
                // Si la cantidad llega a 0, lo borramos del carrito
                if (cart[productIndex].quantity <= 0) {
                    cart.splice(productIndex, 1); 
                }
            }
        }
    },

    // 5. Vaciar el carrito por completo
    emptyCart: (session) => {
        session.cart = [];
    }
};

module.exports = cartService;